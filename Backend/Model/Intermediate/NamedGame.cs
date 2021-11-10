using Backend.Util;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Backend.Model.Intermediate
{
    public record NamedGame(int ID, string Name)
    {
        public static NamedGame CreateNamedGame(SqlDataReader dataReader)
        {
            return new NamedGame(dataReader.GetInt32(0), dataReader.GetString(1));
        }
    }
}
