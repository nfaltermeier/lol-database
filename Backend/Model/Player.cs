using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Model
{
    public record Player(int ID, string Name, int PositionID, int TeamID)
    {
        public static Player CreatePlayer(SqlDataReader dataReader)
        {
            return new Player(dataReader.GetInt32(0),   // ID
                              dataReader.GetString(1),  // Name
                              dataReader.GetInt32(2),   // PositionID
                              dataReader.GetInt32(3));  // TeamID
        }
    }
}
