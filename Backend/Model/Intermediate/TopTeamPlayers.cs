using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Model {
    public record TopTeamPlayers(string PlayerName, string PlayerTeam, int KillCount, int? MostPlayedChampionID) {
        public static TopTeamPlayers CreateTopTeamPlayers(SqlDataReader dataReader) {
            return new TopTeamPlayers(dataReader.GetString(0),
                                      dataReader.GetString(1),
                                      dataReader.GetInt32(2),
                                      dataReader.IsDBNull(3) ? null : dataReader.GetInt32(3));
        }
    }
}
