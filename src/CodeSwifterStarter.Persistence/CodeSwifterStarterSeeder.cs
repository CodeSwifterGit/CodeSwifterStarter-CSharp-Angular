using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using CodeSwifterStarter.Common.Models;
using CodeSwifterStarter.Domain;
using CodeSwifterStarter.Persistence.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace CodeSwifterStarter.Persistence
{
    public class CodeSwifterStarterSeeder
    {
        private readonly ICodeSwifterStarterDbContext _context;
        private readonly ServerConfiguration _serverConfiguration;
        private readonly ILogger<CodeSwifterStarterSeeder> _loger;
        
        public CodeSwifterStarterSeeder(ICodeSwifterStarterDbContext context, 
            ServerConfiguration serverConfiguration, ILogger<CodeSwifterStarterSeeder> loger)
        {
            _context = context;
            _serverConfiguration = serverConfiguration;
            _loger = loger;
        }

        public virtual void Seed(SeedType seedType)
        {
            _context.Database.EnsureCreated();

            // Enter seed code here
        }
    }
}