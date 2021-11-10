using Backend.Database;
using Backend.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegionsController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Region> Get()
        {
            using var reader = DatabaseConnector.RunQuery("SELECT RegionId, Name FROM LoLDB.Region");
            List<Region> results = new();
            while (reader.Read())
                results.Add(Region.CreateRegion(reader));
            return results;
        }
    }
}
