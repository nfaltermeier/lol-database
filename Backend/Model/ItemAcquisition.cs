using Backend.Util;
using System;
using System.Data.SqlClient;
using System.Text.Json.Serialization;

namespace Backend.Model {
    public record ItemAcquisition(int PlayerID, int GameID, int ItemID, [property: JsonConverter(typeof(TimeSpanJsonConverter))] TimeSpan TimeOfAcquisition) {
        public static ItemAcquisition CreateItemAcquisition(SqlDataReader dataReader) {
            return new ItemAcquisition(dataReader.GetInt32(0),      // PlayerID
                                       dataReader.GetInt32(1),      // GameID
                                       dataReader.GetInt32(2),      // ItemID
                                       dataReader.GetTimeSpan(3));  // TimeOfAcquisition
        }
    }
}