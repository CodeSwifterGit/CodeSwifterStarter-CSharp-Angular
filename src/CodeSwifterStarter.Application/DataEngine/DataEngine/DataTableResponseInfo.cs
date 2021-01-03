namespace CodeSwifterStarter.Application.DataEngine.DataEngine
{
    public class DataTableResponseInfo<T> where T : class
    {
        public PagingInfo PagingInfo { get; set; }
        public T SummaryInfo { get; set; }

        public static DataTableResponseInfo<T> FromDataTableInfo(DataTableInfo<T> dataTableInfo)
        {
            return new DataTableResponseInfo<T>
            {
                PagingInfo = dataTableInfo.PagingInfo,
                SummaryInfo = dataTableInfo.SummaryInfo
            };
        }
    }
}