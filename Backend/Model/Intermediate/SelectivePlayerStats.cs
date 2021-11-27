using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Model {
    public record SelectivePlayerStats(int? MostPlayedChampionID,
                                       int? MaxCreepScore,
                                       float? AverageCreepScore,
                                       int? MaxVisionScore,
                                       float? AverageVisionScore,
                                       int? Max10MinGold,
                                       float? Average10MinGold,
                                       int? Max15MinGold,
                                       float? Average15MinGold,
                                       int? MaxEndGold,
                                       float? AverageEndGold,
                                       int? MostChosenRuneKeystone,
                                       int? MostChosenShard1,
                                       int? MostChosenShard2,
                                       int? MostChosenShard3) {

        public static SelectivePlayerStats CreateSelectivePlayerStats(SqlDataReader dataReader) {
            return new SelectivePlayerStats(dataReader.IsDBNull(0) ? null : dataReader.GetInt32(0),                         // MostPlayedChampionID
                                            dataReader.IsDBNull(1) ? null : dataReader.GetInt32(1),                         // MaxCreepScore
                                            dataReader.IsDBNull(2) ? null : Convert.ToSingle(dataReader.GetDouble(2)),      // AverageCreepScore
                                            dataReader.IsDBNull(3) ? null : dataReader.GetInt32(3),                         // MaxVisionScore
                                            dataReader.IsDBNull(4) ? null : Convert.ToSingle(dataReader.GetDouble(4)),      // AverageVisionScore
                                            dataReader.IsDBNull(5) ? null : dataReader.GetInt32(5),                         // Max10MinGold
                                            dataReader.IsDBNull(6) ? null : Convert.ToSingle(dataReader.GetDouble(6)),      // Average10MinGold
                                            dataReader.IsDBNull(7) ? null : dataReader.GetInt32(7),                         // Max15MinGold
                                            dataReader.IsDBNull(8) ? null : Convert.ToSingle(dataReader.GetDouble(8)),      // Average15MinGold
                                            dataReader.IsDBNull(9) ? null : dataReader.GetInt32(9),                         // MaxEndGold
                                            dataReader.IsDBNull(10) ? null : Convert.ToSingle(dataReader.GetDouble(10)),    // AverageEndGold
                                            dataReader.IsDBNull(11) ? null : dataReader.GetInt32(11),                       // MostChosenRuneKeystone
                                            dataReader.IsDBNull(12) ? null : dataReader.GetInt32(12),                       // MostChosenShard1
                                            dataReader.IsDBNull(13) ? null : dataReader.GetInt32(13),                       // MostChosenShard2
                                            dataReader.IsDBNull(14) ? null : dataReader.GetInt32(14)                        // MostChosenShard3
                                            );
        }
    }
}
