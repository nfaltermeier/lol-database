using Backend.Util;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Backend.Model
{
    public record PlayerGameStats(int ID, int ChampionID, int GameID, int PlayerID, int CreepScore, int VisionScore, int? TenMinuteGold, int? FifteenMinuteGold, int EndGold, int KeystoneRuneID, int SecondaryRunePathID)
    {
        public static PlayerGameStats CreatePlayerGameStats(SqlDataReader dataReader)
        {
            return new PlayerGameStats(
                dataReader.GetInt32(0),     // ID
                dataReader.GetInt32(1),     // ChampionID
                dataReader.GetInt32(2),     // GameID
                dataReader.GetInt32(3),     // PlayerID
                dataReader.GetInt32(4),     // CreepScore
                dataReader.GetInt32(5),     // VisionScore
                dataReader.IsDBNull(6) ? null : dataReader.GetInt32(6),     // TenMinuteGold
                dataReader.IsDBNull(7) ? null : dataReader.GetInt32(7),     // FifteenMinuteGold
                dataReader.GetInt32(8),     // EndGold
                dataReader.GetInt32(9),     // KeystoneRuneID
                dataReader.GetInt32(10)     // SecondaryRunePathID
            );
        }
    }
}
