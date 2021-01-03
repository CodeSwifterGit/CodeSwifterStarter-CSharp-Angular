using CodeSwifterStarter.Application.Interfaces;
using CodeSwifterStarter.Application.Models;
using System.Threading.Tasks;

namespace CodeSwifterStarter.Infrastructure.Services
{
    public class NotificationService : INotificationService
    {
        public Task SendAsync(EmailMessage message)
        {
            return Task.CompletedTask;
        }
    }
}
