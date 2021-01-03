using System.Collections.Generic;
using NJsonSchema.Validation;

namespace CodeSwifterStarter.Common.Models
{
    public class SchemaValidationResult
    {
        public IList<ValidationError> Errors { get; set; }
    }
}
