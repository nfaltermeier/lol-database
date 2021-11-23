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

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TeamRankingsController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get(DateTimeOffset StartDate, DateTimeOffset EndDate, long? Limit)
        {
            if (!HttpContext.Request.Query.ContainsKey("StartDate"))
            {
                return BadRequest("Query parameter 'StartDate' must be present");
            }
            else if (!HttpContext.Request.Query.ContainsKey("EndDate"))
            {
                return BadRequest("Query parameter 'EndDate' must be present");
            }

            List<SqlParameter> parameters = new()
            {
                new SqlParameter("@StartDate", StartDate),
                new SqlParameter("@EndDate", EndDate)
            };
            if (Limit is long l)
                parameters.Add(new SqlParameter("@Limit", l));
            using var reader = DatabaseConnector.RunStoredProcedure("LoLDB.GetTeamRankings", parameters.ToArray());
            List<TeamRanking> results = new();
            while (reader.Read())
                results.Add(TeamRanking.CreateTeamRanking(reader));
            return new ObjectResult(results);
        }
    }
}
