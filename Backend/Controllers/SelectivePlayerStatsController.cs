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
    public class SelectivePlayerStatsController : ControllerBase {
        [HttpGet]
        public ActionResult Get(int PlayerID, DateTimeOffset StartDateTime, DateTimeOffset EndDateTime) {
            if (!HttpContext.Request.Query.ContainsKey("PlayerID")) {
                return BadRequest("Query parameter 'PlayerID' must be present");
            } else if (!HttpContext.Request.Query.ContainsKey("StartDateTime")) {
                return BadRequest("Query parameter 'StartDateTime' must be present");
            } else if (!HttpContext.Request.Query.ContainsKey("EndDateTime")) {
                return BadRequest("Query parameter 'EndDateTime' must be present");
            }

            if(PlayerID == -1) return new ObjectResult(null);

            List<SqlParameter> parameters = new()
            {
                new SqlParameter("@PlayerID", PlayerID),
                new SqlParameter("@StartDateTime", StartDateTime),
                new SqlParameter("@EndDateTime", EndDateTime)
            };

            using var reader = DatabaseConnector.RunStoredProcedure("LoLDB.[SelectivePlayerStatistics]", parameters.ToArray());
            List<SelectivePlayerStats> results = new();
            while (reader.Read())
                results.Add(SelectivePlayerStats.CreateSelectivePlayerStats(reader));
            return new ObjectResult(results);
        }
    }
}
