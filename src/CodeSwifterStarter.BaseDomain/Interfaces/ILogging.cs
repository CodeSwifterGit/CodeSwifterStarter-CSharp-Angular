using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CodeSwifterStarter.BaseDomain.Interfaces
{
    public interface ILogging
    {
        [Required]
        [StringLength(200)]
        string ModifiedBy { get; set; }

        [Column(TypeName = "datetime2")]
        DateTime ModifiedAt { get; set; }
    }
}
