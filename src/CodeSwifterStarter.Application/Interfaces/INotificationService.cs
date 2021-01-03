using CodeSwifterStarter.Application.Models;
using System.Threading.Tasks;

namespace CodeSwifterStarter.Application.Interfaces
{
    public interface INotificationService
    {
        Task SendAsync(EmailMessage message);
    }
}