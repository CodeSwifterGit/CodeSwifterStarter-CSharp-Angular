using CodeSwifterStarter.Application.DataEngine.DataEngine;

namespace CodeSwifterStarter.Application.Interfaces
{
    public interface IDataTableInfo<T> where T : class
    {
        DataTableInfo<T> DataTable { get; set; }
    }
}