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
    public class PlayersController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Player> Get()
        {
            using var reader = DatabaseConnector.RunCommand("SELECT PlayerID, Name, PositionID, TeamID FROM LoLDB.Player");
            List<Player> results = new();
            while (reader.Read())
                results.Add(Player.CreatePlayer(reader));
            return results;
        }

        [HttpPost]
        public void Post([FromForm] Player player)
        {
            DatabaseConnector.RunCommand("INSERT INTO LoLDB.Player(Name, PositionID, TeamID) VALUES (@Name, @PositionID, @TeamID)",
                new SqlParameter[] {
                    new SqlParameter("@Name", player.Name),
                    new SqlParameter("@PositionID", player.PositionID),
                    new SqlParameter("@TeamID", player.TeamID)
                }
            ).Close();
        }
    }
}
