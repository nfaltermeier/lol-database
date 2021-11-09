using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Model
{
    public record Position(int ID, string Name, string LogoLink)
    {
        public static Position CreatePosition(SqlDataReader dataReader)
        {
            return new Position(dataReader.GetInt32(0), dataReader.GetString(1), dataReader.GetString(2));
        }
    }
}
