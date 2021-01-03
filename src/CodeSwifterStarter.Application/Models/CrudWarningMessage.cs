using CodeSwifterStarter.Application.Enums;
using CodeSwifterStarter.Application.Interfaces;
using CodeSwifterStarter.BaseDomain.Interfaces;

namespace CodeSwifterStarter.Application.Models
{
    public class CrudWarningMessage
    {
        public CrudActionEnum CrudAction { get; set; }
        public string Schema { get; set; }
        public string Table { get; set; }
        public IAuthenticatedUserService User { get; set; }
        public IBaseEntity Entity { get; set; }
    }
}