using Newtonsoft.Json;
using System;
using System.Net;

namespace CodeSwifterStarter.Common.Models
{
    public class ApiException : Exception
    {
        public HttpStatusCode Status { get; private set; }

        public ApiException(HttpStatusCode status, string message) : base(message)
        {
            Status = status;
        }

        public ApiException()
        {
            
        }
    }
}
