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
            return new Team(dataReader.GetInt32(0),         // ID
                            dataReader.GetString(1),        // Name
                            dataReader.GetInt32(2),         // RegionID
                            dataReader.GetString(3),        // LogoLink
                            dataReader.GetString(4));       // NameAbbreviation
        }
    }
}
