using Backend.Util;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Backend.Model
{
    public record Champion(int ID, string Name)
    {
        public static Champion CreateChampion(SqlDataReader dataReader)
        {
            return new Champion(dataReader.GetInt32(0),     // ID
                                dataReader.GetString(1));   // Name
        }
    }
}
