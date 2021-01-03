using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace CodeSwifterStarter.Application.Interfaces
{
    public interface IFileStorageService
    {
        Task<Stream> GetFileStreamAsync(string relativeFilePath, string fileSystemTypeName, CancellationToken cancellationToken);
        Task<byte[]> GetFileBytesAsync(string relativeFilePath, string fileSystemTypeName, CancellationToken cancellationToken);
        Task<bool> CreateFileAsync(string relativeFilePath, string fileContent, string fileSystemTypeName, CancellationToken cancellationToken);
        Task<bool> CreateFileAsync(string relativeFilePath, byte[] fileContent, string fileSystemTypeName, CancellationToken cancellationToken);
        Task RemoveFileAsync(string relativeFilePath, string fileSystemTypeName, CancellationToken cancellationToken);
    }
}
