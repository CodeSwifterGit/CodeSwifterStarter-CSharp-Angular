using CodeSwifterStarter.Application.Models;
using System.Threading.Tasks;

namespace CodeSwifterStarter.Application.Interfaces
{
    public interface ICrudWarningService
    {
        Task SendAsync(CrudWarningMessage message);
    }
}