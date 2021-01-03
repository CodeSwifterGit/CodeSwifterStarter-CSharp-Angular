using CodeSwifterStarter.Application.Interfaces;
using System.Threading.Tasks;
using CodeSwifterStarter.Application.Models;

namespace CodeSwifterStarter.Application.Tests.Fakes.Services
{
    public class FakeCrudWarningService : ICrudWarningService
    {
        public Task SendAsync(CrudWarningMessage message)
        {
            return Task.FromResult(true);
        }
    }
}