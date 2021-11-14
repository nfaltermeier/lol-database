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
    public class PlayerGameStatsAndRunesController : ControllerBase
    {
        [HttpPost]
        public ActionResult Post([FromForm] PlayerGameStatsAndRunes pgs)
        {
            int[] SecondaryRunePathRunesID = { -1, -1 };
            int i = 0;

            if (pgs.SecondaryRunePathRuneSlot1ID is int n1)
                SecondaryRunePathRunesID[i++] = n1;
            if (pgs.SecondaryRunePathRuneSlot2ID is int n2)
                SecondaryRunePathRunesID[i++] = n2;
            if (pgs.SecondaryRunePathRuneSlot3ID is int n3)
            {
                if (i >= 2)
                {
                    return BadRequest("Must specify exactly 2 SecondaryRunePathRuneSlotIDs, 3 were specified");
                }
                SecondaryRunePathRunesID[i++] = n3;
            }

            if (i < 2)
                return BadRequest($"Must specify exactly 2 SecondaryRunePathRuneSlotIDs, {(i == 1 ? "1 was" : "0 were")} specified");

            KeystoneRune kr = StaticRuneDataController.GetKeystoneByID(pgs.KeystoneRuneID);
            if (kr.RunePathID == pgs.SecondaryRunePathID)
                return BadRequest($"Keystone Rune has the same Rune Path as the Secondary Path");

            DatabaseConnector.RunStoredProcedure("LoLDB.InsertPlayerGameStatsAndRunes",
                new SqlParameter[] {
                    new SqlParameter("@ChampionID", pgs.ChampionID),
                    new SqlParameter("@GameID", pgs.GameID),
                    new SqlParameter("@PlayerID", pgs.PlayerID),
                    new SqlParameter("@CreepScore", pgs.CreepScore),
                    new SqlParameter("@VisionScore", pgs.VisionScore),
                    new SqlParameter("@TenMinuteGold", (object)pgs.TenMinuteGold ?? DBNull.Value),
                    new SqlParameter("@FifteenMinuteGold", (object)pgs.FifteenMinuteGold ?? DBNull.Value),
                    new SqlParameter("@EndGold", pgs.EndGold),
                    new SqlParameter("@KeystoneRuneID", pgs.KeystoneRuneID),
                    new SqlParameter("@PrimaryRunePathRune1ID", pgs.PrimaryRunePathRune1ID),
                    new SqlParameter("@PrimaryRunePathRune2ID", pgs.PrimaryRunePathRune2ID),
                    new SqlParameter("@PrimaryRunePathRune3ID", pgs.PrimaryRunePathRune3ID),
                    new SqlParameter("@SecondaryRunePathID", pgs.SecondaryRunePathID),
                    new SqlParameter("@SecondaryRunePathRune1ID", SecondaryRunePathRunesID[0]),
                    new SqlParameter("@SecondaryRunePathRune2ID", SecondaryRunePathRunesID[1]),
                    new SqlParameter("@ShardRune1ID", pgs.ShardRune1ID),
                    new SqlParameter("@ShardRune2ID", pgs.ShardRune2ID),
                    new SqlParameter("@ShardRune3ID", pgs.ShardRune3ID)
                }
            ).Close();

            return new OkResult();
        }
    }
}
