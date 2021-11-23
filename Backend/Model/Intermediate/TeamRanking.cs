using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Model
{
    public record TeamRanking(long Rank, string Name, int Wins, int Losses, float WinLossRatio)
    {
        public static TeamRanking CreateTeamRanking(SqlDataReader dataReader)
        {
            return new TeamRanking(dataReader.GetInt64(0), dataReader.GetString(1), dataReader.GetInt32(2), dataReader.GetInt32(3), (float)dataReader.GetDecimal(4));
        }
    }
}
