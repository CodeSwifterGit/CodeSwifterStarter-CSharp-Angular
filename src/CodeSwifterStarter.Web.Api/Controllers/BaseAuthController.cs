using Microsoft.AspNetCore.Mvc;

namespace CodeSwifterStarter.Web.Api.Controllers
{
    [ApiController]
    [Route("auth/[controller]")]
    public abstract class BaseAuthController : ControllerBase
    {
    }
}