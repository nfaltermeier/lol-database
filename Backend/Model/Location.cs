using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Model {
    public record Location(string Name, int ID) {
        public static Location CreateLocation(SqlDataReader dataReader) {
            return new Location(dataReader.GetString(1), dataReader.GetInt32(0));
        }
    }
}
