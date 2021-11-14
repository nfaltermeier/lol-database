using Backend.Database;
using Backend.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class LocationsController : ControllerBase {
        [HttpGet]
        public IEnumerable<Location> Get() {
            using var reader = DatabaseConnector.RunQuery("SELECT LocationId, Name FROM LoLDB.Location");
            List<Location> results = new();
            while (reader.Read())
                results.Add(Location.CreateLocation(reader));
            return results;
        }
    }
}
