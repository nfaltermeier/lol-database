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
    public class GamesController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Game> Get()
        {
            using var reader = DatabaseConnector.RunCommand("SELECT GameID, StartDateTime, Duration FROM LoLDB.Game");
            List<Game> results = new();
            while (reader.Read())
                results.Add(Game.CreateGame(reader));
            return results;
        }

        [HttpPost]
        public void Post([FromForm] Game game)
        {
            DatabaseConnector.RunCommand("INSERT INTO LoLDB.Game(StartDateTime, Duration) VALUES (@StartDateTime, @Duration)",
                new SqlParameter[] {
                    new SqlParameter("@StartDateTime", game.StartDateTime),
                    new SqlParameter("@Duration", game.Duration)
                }
            ).Close();
        }
    }
}
