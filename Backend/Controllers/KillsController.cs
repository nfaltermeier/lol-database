using Backend.Database;
using Backend.Model;
using Backend.Model.Intermediate;
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
    public class KillsController : ControllerBase {
        [HttpGet]
        public IEnumerable<Kill> Get() {
            using var reader = DatabaseConnector.RunQuery("SELECT KillID, GameID, KillerID, VictimID, Time, LocationID FROM LoLDB.[Kill]");
            List<Kill> results = new();
            while (reader.Read())
                results.Add(Kill.CreateKill(reader));
            return results;
        }

        [HttpPost]
        public void Post([FromForm] Kill kill) {
            DatabaseConnector.RunQuery("INSERT INTO LoLDB.[Kill](GameID, KillerID, VictimID, Time, LocationID) VALUES (@GameID, @KillerID, @VictimID, @Time, @LocationID)",
                new SqlParameter[] {
                    new SqlParameter("@GameID", kill.GameID),
                    new SqlParameter("@KillerID", kill.KillerID),
                    new SqlParameter("@VictimID", kill.VictimID),
                    new SqlParameter("@Time", kill.Time),
                    new SqlParameter("@LocationID", kill.LocationID)
                }
            ).Close();
        }
    }
}
