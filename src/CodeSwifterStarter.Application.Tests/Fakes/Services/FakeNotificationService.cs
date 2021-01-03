using System.Threading.Tasks;
using CodeSwifterStarter.Application.Interfaces;
using CodeSwifterStarter.Application.Models;

namespace CodeSwifterStarter.Application.Tests.Fakes.Services
{
    public class FakeNotificationService : INotificationService
    {
        public Task SendAsync(EmailMessage message)
        {
            return Task.FromResult(true);
        }
    }
}