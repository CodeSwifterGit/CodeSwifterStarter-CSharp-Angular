using System.ComponentModel.DataAnnotations;

namespace CodeSwifterStarter.BaseDomain.Interfaces
{
    public interface ICaching
    {
        [Timestamp]
        byte[] RowVersion { get; set; }

        byte?[] CashedRowVersion { get; set; }
    }
}
