using System;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using Azure.Storage;
using Azure.Storage.Files.DataLake;
using Azure.Storage.Files.DataLake.Models;
using CodeSwifterStarter.Application.Interfaces;
using CodeSwifterStarter.Common.Enums;
using CodeSwifterStarter.Common.Models;
using Microsoft.Extensions.Logging;

namespace CodeSwifterStarter.Infrastructure.Services
{
    public class FileStorageService : IFileStorageService
    {
        private readonly IAuthenticatedUserService _authenticatedUserService;
        private readonly IEnvironmentInformationProvider _environment;
        private readonly ILogger<FileStorageService> _logger;
        private readonly DataLakeServiceClient _serviceClient;

        // Make StorageSharedKeyCredential to pass to the serviceClient
        public FileStorageService(ServerConfiguration configuration, IAuthenticatedUserService authenticatedUserService, IEnvironmentInformationProvider environment, ILogger<FileStorageService> logger)
        {
            _authenticatedUserService = authenticatedUserService;
            _environment = environment;
            _logger = logger;
            _serviceClient = new DataLakeServiceClient(
                new Uri(configuration.BlobAccount.Endpoint),
                new StorageSharedKeyCredential(configuration.BlobAccount.Name, configuration.BlobAccount.Key));
        }

        private string GetFileSystem()
        {
            if (!_authenticatedUserService.IsAuthenticated)
                return "testing";

            if (_environment.EnvironmentName == "Production")
                return "production";

            return "dev-" + Environment.MachineName.ToLower().Replace("_", "-");
        }

        private async Task<DataLakeFileSystemClient> GetFileSystemAsync(string fileSystemName, PublicAccessType publicAccessType, CancellationToken cancellationToken)
        {
            var runningFileSystemName = GetFileSystem();
            DataLakeFileSystemClient filesystem = _serviceClient.GetFileSystemClient($"{runningFileSystemName}-{fileSystemName}");
            try
            {
                await filesystem.CreateIfNotExistsAsync(publicAccessType, null, cancellationToken);
                if (cancellationToken.IsCancellationRequested) return null;

            }
            catch (Exception)
            {
                _logger.LogWarning("Cannot create file system on file server.", new { FileSystemName = fileSystemName });
            }

            return filesystem;
        }

        public async Task<Stream> GetFileStreamAsync(string relativeFilePath, string fileSystemTypeName, CancellationToken cancellationToken)
        {
            DataLakeFileSystemClient fileSystem = await GetFileSystemAsync(fileSystemTypeName, PublicAccessType.FileSystem, cancellationToken);
            if (cancellationToken.IsCancellationRequested) return null;

            DataLakeFileClient file = fileSystem.GetFileClient(relativeFilePath);

            if (await file.ExistsAsync(cancellationToken))
            {
                var downloadedFileInfo = await file.ReadAsync(cancellationToken);
                if (cancellationToken.IsCancellationRequested) return null;

                return downloadedFileInfo.Value.Content;
            }
            return null;
        }

        public async Task<byte[]> GetFileBytesAsync(string relativeFilePath, string fileSystemTypeName, CancellationToken cancellationToken)
        {
            Stream fileStream = await GetFileStreamAsync(relativeFilePath, fileSystemTypeName, cancellationToken);
            if (fileStream != null)
            {
                await using (var memoryStream = new MemoryStream())
                {
                    await fileStream.CopyToAsync(memoryStream, cancellationToken);
                    return cancellationToken.IsCancellationRequested ? null : memoryStream.ToArray();
                }
            }
            
            return null;
        }

        public async Task<bool> CreateFileAsync(string relativeFilePath, byte[] fileContent, string fileSystemTypeName, CancellationToken cancellationToken)
        {
            DataLakeFileSystemClient fileSystem = await GetFileSystemAsync(fileSystemTypeName, PublicAccessType.FileSystem, cancellationToken);
            if (cancellationToken.IsCancellationRequested) return false;

            DataLakeFileClient file = fileSystem.GetFileClient(relativeFilePath);
            var stream = new MemoryStream(fileContent);

            await file.UploadAsync(stream, true, cancellationToken);
            if (cancellationToken.IsCancellationRequested) return false;
            
            return true;
        }

        public async Task<bool> CreateFileAsync(string relativeFilePath, string fileContent, string fileSystemTypeName, CancellationToken cancellationToken)
        {
            var byteArray = Encoding.UTF8.GetBytes(fileContent);
            return await CreateFileAsync(relativeFilePath, byteArray, fileSystemTypeName, cancellationToken);
        }

        public async Task RemoveFileAsync(string relativeFilePath, string fileSystemTypeName, CancellationToken cancellationToken)
        {
            DataLakeFileSystemClient fileSystem = await GetFileSystemAsync(fileSystemTypeName, PublicAccessType.FileSystem, cancellationToken);
            if (cancellationToken.IsCancellationRequested) return;

            await fileSystem.DeleteFileAsync(relativeFilePath, null, cancellationToken);
        }
    }
}
