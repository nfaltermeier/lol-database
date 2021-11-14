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
    public class PlayerGameStatsController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<PlayerGameStats> Get()
        {
            using var reader = DatabaseConnector.RunQuery("SELECT ID, ChampionID, GameID, PlayerID, CreepScore, VisionScore, TenMinuteGold, FifteenMinuteGold, EndGold FROM LoLDB.PlayerGameStats");
            List<PlayerGameStats> results = new();
            while (reader.Read())
                results.Add(PlayerGameStats.CreatePlayerGameStats(reader));
            return results;
        }
    }
}
