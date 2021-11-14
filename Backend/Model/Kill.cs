using Backend.Util;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace Backend.Model {
    public record Kill(int ID, int GameID, int KillerID, int VictimID, [property: JsonConverter(typeof(TimeSpanJsonConverter))] TimeSpan Time, int LocationID) {
        public static Kill CreateKill(SqlDataReader dataReader) {
            return new Kill(dataReader.GetInt32(0), // ID
                            dataReader.GetInt32(1), // GameID
                            dataReader.GetInt32(2), // KillerPlayerID
                            dataReader.GetInt32(3), // VictimPlayerID
                            dataReader.GetTimeSpan(4), // Time
                            dataReader.GetInt32(5) // LocationID
                            );
        }
    }
}
