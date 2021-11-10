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
    public class GamesController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Game> Get()
        {
            using var reader = DatabaseConnector.RunQuery("SELECT GameID, StartDateTime, Duration FROM LoLDB.Game");
            List<Game> results = new();
            while (reader.Read())
                results.Add(Game.CreateGame(reader));
            return results;
        }

        [Route("named")]
        [HttpGet]
        public IEnumerable<NamedGame> GetNamed()
        {
            using var reader = DatabaseConnector.RunStoredProcedure("LoLDB.GetNamedTeams");
            List<NamedGame> results = new();
            while (reader.Read())
                results.Add(NamedGame.CreateNamedGame(reader));
            return results;
        }

        [HttpPost]
        public void Post([FromForm] POSTGame game)
        {
            DatabaseConnector.RunStoredProcedure("LoLDB.InsertGameAndTeams",
                new SqlParameter[] {
                    new SqlParameter("@StartDateTime", game.StartDateTime),
                    new SqlParameter("@Duration", game.Duration),
                    new SqlParameter("@WinningTeamID", game.WinningTeamID),
                    new SqlParameter("@LosingTeamID", game.LosingTeamID)
                }
            ).Close();
        }
    }
}
