using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Model
{
    public record Team(int ID, string Name, int RegionID, string LogoLink, string NameAbbreviation)
    {
        public static Team CreateTeam(SqlDataReader dataReader)
        {
            return new Team(dataReader.GetInt32(0), dataReader.GetString(1), dataReader.GetInt32(2), dataReader.GetString(3), dataReader.GetString(4));
        }
    }
}
