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

        [HttpPost]
        public void Post([FromForm] PlayerGameStats pgs)
        {
            DatabaseConnector.RunQuery("INSERT INTO LoLDB.PlayerGameStats(ChampionID, GameID, PlayerID, CreepScore, VisionScore, TenMinuteGold, FifteenMinuteGold, EndGold) VALUES (@ChampionID, @GameID, @PlayerID, @CreepScore, @VisionScore, @TenMinuteGold, @FifteenMinuteGold, @EndGold)",
                new SqlParameter[] {
                    new SqlParameter("@ChampionID", pgs.ChampionID),
                    new SqlParameter("@GameID", pgs.GameID),
                    new SqlParameter("@PlayerID", pgs.PlayerID),
                    new SqlParameter("@CreepScore", pgs.CreepScore),
                    new SqlParameter("@VisionScore", pgs.VisionScore),
                    new SqlParameter("@TenMinuteGold", (object)pgs.TenMinuteGold ?? DBNull.Value),
                    new SqlParameter("@FifteenMinuteGold", (object)pgs.FifteenMinuteGold ?? DBNull.Value),
                    new SqlParameter("@EndGold", pgs.EndGold)
                }
            ).Close();
        }
    }
}
