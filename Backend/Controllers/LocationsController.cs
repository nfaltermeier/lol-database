using Backend.Database;
using Backend.Model;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Backend.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class LocationsController : ControllerBase {
        [HttpGet]
        public IEnumerable<Location> Get() {
            using var reader = DatabaseConnector.RunQuery("SELECT LocationID, Name FROM LoLDB.Location");
            List<Location> results = new();
            while (reader.Read())
                results.Add(Location.CreateLocation(reader));
            return results;
        }
    }
}