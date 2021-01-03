using Microsoft.EntityFrameworkCore;
using CodeSwifterStarter.Domain;

namespace CodeSwifterStarter.Persistence
{
    public class CodeSwifterStarterDbContext : DbContext, ICodeSwifterStarterDbContext
    {
        public CodeSwifterStarterDbContext(DbContextOptions<CodeSwifterStarterDbContext> options) 
            :base(options)
        {
        }

        #region Entity Definitions
        #endregion

        #region OnModelCreating
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(CodeSwifterStarterDbContext).Assembly);
        }
        #endregion

        #region Upgrade Database
        public void UpgradeDatabase()
        {
            Database.Migrate();
            Database.EnsureCreated();
        }

        public void InitialiseDesignTime()
        {
            var modelBuilder = new ModelBuilder(new Microsoft.EntityFrameworkCore.Metadata.Conventions.ConventionSet());

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(CodeSwifterStarterDbContext).Assembly);
        }
        #endregion

        #region Detect Changes
        public void SetAutoDetectChanges(bool enabled)
        {
            ChangeTracker.AutoDetectChangesEnabled = enabled;
        }
        #endregion
    }
}
