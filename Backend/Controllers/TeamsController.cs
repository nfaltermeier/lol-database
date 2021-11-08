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
            var (command, reader) = DatabaseConnector.RunCommand("SELECT TeamID, Name, RegionID, LogoLink, NameAbbreviation FROM LoLDB.Team");
            using (command)
            {
                using (reader)
                {
                    List<Team> results = new();
                    while (reader.Read())
                        results.Add(Team.CreateTeam(reader));
                    return results;
                }
            }
        }

        [HttpPost]
        public void Post([FromForm] Team team)
        {
            var (command, reader) = DatabaseConnector.RunCommand($"INSERT INTO LoLDB.Team(Name, RegionID, LogoLink, NameAbbreviation) VALUES ('{team.Name}', '{team.RegionID}', '{team.LogoLink}', '{team.NameAbbreviation}')");
            using (command)
            {
                using (reader)
                {
                    
                }
            }
        }
    }
}
