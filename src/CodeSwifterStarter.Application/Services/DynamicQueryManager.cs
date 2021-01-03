using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using CodeSwifterStarter.Application.DataEngine.DataEngine;
using CodeSwifterStarter.Domain;

namespace CodeSwifterStarter.Application.Services
{
    public abstract class DynamicQueryManager<TEntity, TEntityLookupModel, TEntitySummary, TUpdateCommand>
        where TEntity : class where TEntityLookupModel : class where TEntitySummary : class where TUpdateCommand : class
    {
        internal readonly ICodeSwifterStarterDbContext Context;
        internal readonly IMapper Mapper;

        protected DynamicQueryManager(ICodeSwifterStarterDbContext context, IMapper mapper)
        {
            Context = context;
            Mapper = mapper;
        }

        public IQueryable<TEntity> GetQuery()
        {
            return GetQueryWithIncludes(Context.Set<TEntity>().AsQueryable()).AsNoTracking();
        }

        public virtual IQueryable<TEntity> GetQueryWithIncludes(IQueryable<TEntity> querable)
        {
            return querable;
        }

        public abstract Task<List<TEntityLookupModel>> RequestData(
            IQueryable<TEntity> query,
            DataTableInfo<TEntitySummary> dataTable,
            CancellationToken cancellationToken);

        protected IQueryable<TEntity> FilterData(IQueryable<TEntity> query, DataTableInfo<TEntitySummary> dataTable)
        {
            if (string.IsNullOrEmpty(dataTable.FilteringInfo.Query))
                return query;

            return query.Where(dataTable.FilteringInfo.Query, dataTable.FilteringInfo.Parameters.ToArray());
        }

        protected IQueryable<TEntity> SortData(IQueryable<TEntity> query, DataTableInfo<TEntitySummary> dataTable)
        {
            if (string.IsNullOrEmpty(dataTable.SortByExpression))
                return query;


            return query.OrderBy(dataTable.SortByExpression);
        }

        protected async Task<List<TEntityLookupModel>> GetResult(IQueryable<TEntity> query,
            DataTableInfo<TEntitySummary> dataTable, CancellationToken cancellationToken)
        {
            if (dataTable.PagingInfo.PagingEnabled)
            {
                query = query
                    .Skip((dataTable.PagingInfo.PageIndex - 1) * dataTable.PagingInfo.PageSize)
                    .Take(dataTable.PagingInfo.PageSize);
            }

            var list = await query
                .ProjectTo<TEntityLookupModel>(Mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            dataTable.PagingInfo.TotalItems = list.Count();

            return list;
        }

        public virtual Task<bool> RemoveDependentRows(TEntity parent, CancellationToken cancellationToken)
        {
            return Task.FromResult(false);
        }
        
        public class UpdatedEntityAfterDependentRowsUpdate
        {
            public TEntity Entity { get; }
            public bool IsEntityReplaced { get; }


            public UpdatedEntityAfterDependentRowsUpdate(TEntity entity, bool isEntityReplaced)
            {
                Entity = entity;
                IsEntityReplaced = isEntityReplaced;
            }
        }

        public virtual async Task<UpdatedEntityAfterDependentRowsUpdate> UpdateEntityAndDependentRows(
            TEntity parent, TUpdateCommand request, CancellationToken cancellationToken)
        {
            return await Task.FromResult(new UpdatedEntityAfterDependentRowsUpdate(parent, false));
        }

        internal virtual Task ReloadEntityDataAsync(TEntity entity, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }

        internal virtual Task PostUpdateActionAsync(TEntity entity, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }

        internal virtual Task PostCreateActionAsync(TEntity entity, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }

        internal virtual Task PreDeleteActionAsync(TEntity entity, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}