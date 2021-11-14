using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Model
{
    public record Region(string Name, int ID)
    {
        public static Region CreateRegion(SqlDataReader dataReader)
        {
            return new Region(dataReader.GetString(1),  // Name
                              dataReader.GetInt32(0));  // ID
        }
    }
}
