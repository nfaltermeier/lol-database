using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Model
{
    public record MinimalPlayer(int ID, string Name)
    {
        public static MinimalPlayer CreateMinimalPlayer(SqlDataReader dataReader)
        {
            return new MinimalPlayer(dataReader.GetInt32(0), dataReader.GetString(1));
        }
    }
}
