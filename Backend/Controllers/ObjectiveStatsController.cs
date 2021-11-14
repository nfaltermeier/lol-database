using Backend.Database;
using Backend.Model;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Backend.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class ObjectiveStatsController : ControllerBase {
        [HttpGet]
        public IEnumerable<ObjectiveStat> Get() {
            using var reader = DatabaseConnector.RunQuery("SELECT ObjectiveID, GameID, TeamID, TimeOfCapture FROM LoLDB.ObjectiveStat");
            List<ObjectiveStat> results = new();
            while (reader.Read())
                results.Add(ObjectiveStat.CreateObjectiveStat(reader));
            return results;
        }

        [HttpPost]
        public void Post([FromForm] ObjectiveStat objectiveStat) {
            DatabaseConnector.RunQuery("INSERT INTO LoLDB.ObjectiveStat(ObjectiveID, GameID, TeamID, TimeOfCapture) VALUES (@ObjectiveID, @GameID, @TeamID, @TimeOfCapture)",
                new SqlParameter[] {
                    new SqlParameter("@ObjectiveID", objectiveStat.ObjectiveID),
                    new SqlParameter("@GameID", objectiveStat.GameID),
                    new SqlParameter("@TeamID", objectiveStat.TeamID),
                    new SqlParameter("@TimeOfCapture", objectiveStat.TimeOfCapture)
                }
            ).Close();
        }
    }
}