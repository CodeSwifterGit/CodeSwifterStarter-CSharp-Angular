using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CodeSwifterStarter.BaseDomain.Interfaces
{
    public interface ICreating
    {
        [Required]
        [StringLength(100)]
        string CreatedBy { get; set; }
        
        [Column(TypeName = "datetime2")]
        DateTime CreatedAt { get; set; }
    }
}
