using System.Threading.Tasks;
using CodeSwifterStarter.Domain;
using CodeSwifterStarter.Application.Models;
using CodeSwifterStarter.Application.Interfaces;

namespace CodeSwifterStarter.Infrastructure.Services
{
    public class CrudWarningService : ICrudWarningService
    {
        private readonly INotificationService _notificationService;
        private readonly ICodeSwifterStarterDbContext _ctx;

        public CrudWarningService(INotificationService notificationService, ICodeSwifterStarterDbContext ctx)
        {
            _notificationService = notificationService;
            _ctx = ctx;
        }

        public Task SendAsync(CrudWarningMessage message)
        {
            // Here, we need to decide, who will receive warnings about CRUD updates

            return Task.FromResult(true);
        }
    }
}
