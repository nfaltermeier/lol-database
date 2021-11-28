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
    public class TopTeamPlayersController : ControllerBase {
        [HttpGet]
        public ActionResult Get(DateTimeOffset StartDateTime, DateTimeOffset EndDateTime) {
            if (!HttpContext.Request.Query.ContainsKey("StartDateTime")) {
                return BadRequest("Query parameter 'StartDateTime' must be present");
            } else if (!HttpContext.Request.Query.ContainsKey("EndDateTime")) {
                return BadRequest("Query parameter 'EndDateTime' must be present");
            }

            List<SqlParameter> parameters = new()
            {
                new SqlParameter("@StartDateTime", StartDateTime),
                new SqlParameter("@EndDateTime", EndDateTime)
            };

            using var reader = DatabaseConnector.RunStoredProcedure("LoLDB.[TopTeamPlayers]", parameters.ToArray());
            List<TopTeamPlayers> results = new();
            while (reader.Read())
                results.Add(TopTeamPlayers.CreateTopTeamPlayers(reader));
            return new ObjectResult(results);
        }
    }
}
