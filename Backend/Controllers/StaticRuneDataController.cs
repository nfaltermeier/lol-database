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

            using (var reader = DatabaseConnector.RunQuery("SELECT RunePathID, Name, LogoLink FROM LoLDB.RunePath"))
            {
                while (reader.Read())
                    paths.Add(RunePath.CreateRunePath(reader));
            }

            using (var reader = DatabaseConnector.RunQuery("SELECT KeystoneRuneID, Name, LogoLink, RunePathID FROM LoLDB.KeystoneRune"))
            {
                while (reader.Read())
                    keystones.Add(KeystoneRune.CreateKeystoneRune(reader));
            }

            using (var reader = DatabaseConnector.RunQuery("SELECT SecondaryRuneID, Name, LogoLink, Slot, RunePathID FROM LoLDB.SecondaryRune"))
            {
                while (reader.Read())
                    secondaries.Add(SecondaryRune.CreateSecondaryRune(reader));
            }

            using (var reader = DatabaseConnector.RunQuery("SELECT ShardRuneID, Name, LogoLink, Slot FROM LoLDB.ShardRune"))
            {
                while (reader.Read())
                    shards.Add(ShardRune.CreateShardRune(reader));
            }

            return new StaticRuneData(paths, keystones, secondaries, shards);
        }

        public static KeystoneRune GetKeystoneByID(int id)
        {
            using var reader = DatabaseConnector.RunQuery(
                "SELECT KeystoneRuneID, Name, LogoLink, RunePathID FROM LoLDB.KeystoneRune WHERE KeystoneRuneID = @KeystoneRuneID",
                new SqlParameter[] { new SqlParameter("@KeystoneRuneID", id) }
            );

            if (!reader.Read())
                throw new Exception("Unknown KeystoneRuneID passed to GetKeystoneByID");

            return KeystoneRune.CreateKeystoneRune(reader);
        }
    }
}
