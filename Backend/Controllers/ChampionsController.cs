using Backend.Database;
using Backend.Model;
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
    public class ChampionsController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Champion> Get()
        {
            using var reader = DatabaseConnector.RunQuery("SELECT ChampionId, Name FROM LoLDB.Champion");
            List<Champion> results = new();
            while (reader.Read())
                results.Add(Champion.CreateChampion(reader));
            return results;
        }
    }
}
