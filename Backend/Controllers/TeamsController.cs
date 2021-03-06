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
    public class TeamsController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Team> Get()
        {
            using var reader = DatabaseConnector.RunQuery("SELECT TeamID, Name, RegionID, LogoLink, NameAbbreviation FROM LoLDB.Team");
            List<Team> results = new();
            while (reader.Read())
                results.Add(Team.CreateTeam(reader));
            return results;
        }

        [Route("game/{gameID}")]
        [HttpGet]
        public IEnumerable<Team> GetTeamsFromGame(int gameID) {
            using var reader = DatabaseConnector.RunStoredProcedure("LoLDB.GetTeamsFromGame",
                new SqlParameter[] { new SqlParameter("@GameID", gameID) }
            );
            List<Team> results = new();
            while (reader.Read())
                results.Add(Team.CreateTeam(reader));
            return results;
        }

        [HttpPost]
        public void Post([FromForm] Team team)
        {
            DatabaseConnector.RunQuery("INSERT INTO LoLDB.Team(Name, RegionID, LogoLink, NameAbbreviation) VALUES (@Name, @RegionID, @LogoLink, @NameAbbreviation)",
                new SqlParameter[] {
                    new SqlParameter("@Name", team.Name),
                    new SqlParameter("@RegionID", team.RegionID),
                    new SqlParameter("@LogoLink", team.LogoLink),
                    new SqlParameter("@NameAbbreviation", team.NameAbbreviation)
                }
            ).Close();
        }
    }
}
