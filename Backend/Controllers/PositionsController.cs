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
    public class PositionsController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Position> Get()
        {
            using var reader = DatabaseConnector.RunCommand("SELECT PositionID, Name, LogoLink FROM LoLDB.Position");
            List<Position> results = new();
            while (reader.Read())
                results.Add(Position.CreatePosition(reader));
            return results;
        }
    }
}
