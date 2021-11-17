using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Model
{
    public record MostPlayedChampion(long Rank, string Name, int Count)
    {
        public static MostPlayedChampion CreateMostPlayedChampion(SqlDataReader dataReader)
        {
            return new MostPlayedChampion(dataReader.GetInt64(0), dataReader.GetString(1), dataReader.GetInt32(2));
        }
    }
}
