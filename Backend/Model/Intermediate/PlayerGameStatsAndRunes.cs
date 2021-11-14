using Backend.Util;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Backend.Model
{
    public record PlayerGameStatsAndRunes(int ID, int ChampionID, int GameID, int PlayerID, int CreepScore, int VisionScore,
        int? TenMinuteGold, int? FifteenMinuteGold, int EndGold,
        int KeystoneRuneID, int PrimaryRunePathRune1ID, int PrimaryRunePathRune2ID, int PrimaryRunePathRune3ID,
        int SecondaryRunePathID, int? SecondaryRunePathRuneSlot1ID, int? SecondaryRunePathRuneSlot2ID, int? SecondaryRunePathRuneSlot3ID,
        int ShardRune1ID, int ShardRune2ID, int ShardRune3ID);
}
