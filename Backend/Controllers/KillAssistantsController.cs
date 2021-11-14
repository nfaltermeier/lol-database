using Backend.Database;
using Backend.Model;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Backend.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class KillAssistantsController : ControllerBase {
        [HttpGet]
        public IEnumerable<KillAssistant> Get() {
            using var reader = DatabaseConnector.RunQuery("SELECT KillID, PlayerID FROM LoLDB.KillAssistant");
            List<KillAssistant> results = new();
            while (reader.Read())
                results.Add(KillAssistant.CreateKillAssistant(reader));
            return results;
        }

        [HttpPost]
        public void Post([FromForm] KillAssistant killAssistant) {
            DatabaseConnector.RunQuery("INSERT INTO LoLDB.KillAssistant(KillID, PlayerID) VALUES (@KillID, @PlayerID)",
                new SqlParameter[] {
                    new SqlParameter("@KillID", killAssistant.KillID),
                    new SqlParameter("@PlayerID", killAssistant.PlayerID)
                }
            ).Close();
        }
    }
}