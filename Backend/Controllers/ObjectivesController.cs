using Backend.Database;
using Backend.Model;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Backend.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class ObjectivesController : ControllerBase {
        [HttpGet]
        public IEnumerable<Objective> Get() {
            using var reader = DatabaseConnector.RunQuery("SELECT ObjectiveId, [Name], LogoLink FROM LoLDB.Objective");
            List<Objective> results = new();
            while (reader.Read())
                results.Add(Objective.CreateObjective(reader));
            return results;
        }
    }
}