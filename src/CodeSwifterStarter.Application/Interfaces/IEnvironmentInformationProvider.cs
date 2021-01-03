namespace CodeSwifterStarter.Application.Interfaces
{
    public interface IEnvironmentInformationProvider
    {
        /// <summary>
        /// Gets or sets the name of the environment. The host automatically sets this property to the value of the
        /// of the "environment" key as specified in configuration.
        /// </summary>
        string EnvironmentName { get; }

        /// <summary>
        /// Gets or sets the name of the application. This property is automatically set by the host to the assembly containing
        /// the application entry point.
        /// </summary>
        string ApplicationName { get; }

        /// <summary>
        /// Gets or sets the absolute path to the directory that contains the application content files.
        /// </summary>
        string ContentRootPath { get; }

        /// <summary>
        /// Gets or sets the absolute path to the directory that contains the web-servable application content files.
        /// </summary>
        string WebRootPath { get; }
    }
}
