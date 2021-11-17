using Backend.Util;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace Backend.Model {
    public record KillPerGamePlayer(int KillID, int LocationID, string Name) {
        public static KillPerGamePlayer CreateKillPerGamePlayer(SqlDataReader dataReader) {
            return new KillPerGamePlayer(dataReader.GetInt32(0),        // KillID
                                         dataReader.GetInt32(1),        // LocationID
                                         dataReader.GetString(2));      // Name
        }
    }
}
