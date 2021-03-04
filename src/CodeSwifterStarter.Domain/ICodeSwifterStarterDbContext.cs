using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace CodeSwifterStarter.Domain
{
    public interface ICodeSwifterStarterDbContext
    {
        #region Supporting Methods
        DatabaseFacade Database { get; }
        ChangeTracker ChangeTracker { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
        Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken);
        int SaveChanges();
        int SaveChanges(bool saveChanges);
        EntityEntry Attach(object entity);
        EntityEntry Update(object entity);
        EntityEntry Remove(object entity);
        void AddRange(params object[] entities);
        Task AddRangeAsync(params object[] entities);
        void AttachRange(params object[] entities);
        void UpdateRange(params object[] entities);
        void RemoveRange(params object[] entities);
        void AddRange(IEnumerable<object> entities);
        Task AddRangeAsync(IEnumerable<object> entities, CancellationToken cancellationToken);
        void AttachRange(IEnumerable<object> entities);
        EntityEntry<TEntity> Entry<TEntity>([NotNull] TEntity entity) where TEntity : class;
        EntityEntry Entry([NotNull] object entity);
        void UpdateRange(IEnumerable<object> entities);
        void RemoveRange(IEnumerable<object> entities);
        DbSet<TEntity> Set<TEntity>() where TEntity : class;
        void SetAutoDetectChanges(bool enabled);

        #endregion
		
		#region Upgrade Database
        void UpgradeDatabase();
        #endregion		
    }
}