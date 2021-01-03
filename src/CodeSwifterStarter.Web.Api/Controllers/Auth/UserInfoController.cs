using System.Collections.Generic;
using System.Net;
using CodeSwifterStarter.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CodeSwifterStarter.Web.Api.Controllers.Auth
{
    public class UserInfoController : BaseAuthController
    {
        private readonly IAuthenticatedUserService _authenticatedUserService;

        public UserInfoController(IAuthenticatedUserService authenticatedUserService)
        {
            _authenticatedUserService = authenticatedUserService;
        }

        [Authorize()]
        [HttpGet("[action]")]
        [ProducesResponseType(typeof(List<string>), (int) HttpStatusCode.OK)]
        public ActionResult<List<string>> GetScopes()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(_authenticatedUserService.Scopes);
        }
    }
}