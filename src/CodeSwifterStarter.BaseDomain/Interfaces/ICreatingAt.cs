using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace CodeSwifterStarter.BaseDomain.Interfaces
{
    public interface ICreatingAt
    {
        [Column(TypeName = "datetime2")]
        DateTime CreatedAt { get; set; }
    }
}
