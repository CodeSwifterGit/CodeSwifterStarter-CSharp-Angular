using Microsoft.EntityFrameworkCore;
using CodeSwifterStarter.Persistence.Infrastructure;

namespace CodeSwifterStarter.Persistence
{
    public class CodeSwifterStarterContextFactory : DesignTimeDbContextFactoryBase<CodeSwifterStarterDbContext>
    {
        protected override CodeSwifterStarterDbContext CreateNewInstance(DbContextOptions<CodeSwifterStarterDbContext> options)
        {
            
            return new CodeSwifterStarterDbContext(options);
        }
    }
}