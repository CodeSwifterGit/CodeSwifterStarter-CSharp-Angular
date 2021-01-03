namespace CodeSwifterStarter.Application.DataEngine.DataEngine
{
    public class PagingInfo
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int TotalItems { get; set; }
        public bool PagingEnabled { get; set; }
    }
}