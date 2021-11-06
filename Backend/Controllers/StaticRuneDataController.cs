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
    public class StaticRuneDataController : ControllerBase
    {
        [HttpGet]
        public StaticRuneData Get()
        {
            List<RunePath> paths = new();
            List<KeystoneRune> keystones = new();
            List<SecondaryRune> secondaries = new();
            List<ShardRune> shards = new();

            var (command, reader) = DatabaseConnector.RunCommand("SELECT RunePathID, Name, LogoLink FROM LoLDB.RunePath");
            using (command)
            {
                using (reader)
                {
                    while (reader.Read())
                        paths.Add(RunePath.CreateRunePath(reader));
                }
            }

            (command, reader) = DatabaseConnector.RunCommand("SELECT KeystoneRuneID, Name, LogoLink, RunePathID FROM LoLDB.KeystoneRune");
            using (command)
            {
                using (reader)
                {
                    while (reader.Read())
                        keystones.Add(KeystoneRune.CreateKeystoneRune(reader));
                }
            }

            (command, reader) = DatabaseConnector.RunCommand("SELECT SecondaryRuneID, Name, LogoLink, Slot, RunePathID FROM LoLDB.SecondaryRune");
            using (command)
            {
                using (reader)
                {
                    while (reader.Read())
                        secondaries.Add(SecondaryRune.CreateSecondaryRune(reader));
                }
            }

            (command, reader) = DatabaseConnector.RunCommand("SELECT ShardRuneID, Name, LogoLink, Slot FROM LoLDB.ShardRune");
            using (command)
            {
                using (reader)
                {
                    while (reader.Read())
                        shards.Add(ShardRune.CreateShardRune(reader));
                }
            }

            return new StaticRuneData(paths, keystones, secondaries, shards);
        }
    }
}
