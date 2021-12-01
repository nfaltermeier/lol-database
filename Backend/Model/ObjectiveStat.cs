using Backend.Util;
using System;
using System.Data.SqlClient;
using System.Text.Json.Serialization;

namespace Backend.Model {
    public record ObjectiveStat(int ObjectiveStatID, int ObjectiveID, int GameID, int TeamID, [property: JsonConverter(typeof(TimeSpanJsonConverter))] TimeSpan TimeOfCapture) {
        public static ObjectiveStat CreateObjectiveStat(SqlDataReader dataReader) {
            return new ObjectiveStat(dataReader.GetInt32(0),      // ObjectiveStatID
                                     dataReader.GetInt32(1),      // ObjectiveID
                                     dataReader.GetInt32(2),      // GameID
                                     dataReader.GetInt32(3),      // TeamID
                                     dataReader.GetTimeSpan(4));  // TimeOfCapture
        }
    }
}