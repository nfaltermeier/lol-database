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
    public class MostPlayedChampionsController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<MostPlayedChampion> Get(DateTimeOffset StartDate, DateTimeOffset EndDate, long? Limit)
        {
            List<SqlParameter> parameters = new()
            {
                new SqlParameter("@StartDate", StartDate),
                new SqlParameter("@EndDate", EndDate)
            };
            if (Limit is long l)
                parameters.Add(new SqlParameter("@Limit", l));
            using var reader = DatabaseConnector.RunStoredProcedure("LoLDB.GetMostPlayedChampions", parameters.ToArray());
            List<MostPlayedChampion> results = new();
            while (reader.Read())
                results.Add(MostPlayedChampion.CreateMostPlayedChampion(reader));
            return results;
        }
    }
}
