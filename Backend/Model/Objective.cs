using System.Data.SqlClient;

namespace Backend.Model {
    public record Objective(int ID, string Name, string LogoLink) {
        public static Objective CreateObjective(SqlDataReader dataReader) {
            return new Objective(dataReader.GetInt32(0),    // ID
                                 dataReader.GetString(1),   // Name
                                 dataReader.GetString(2));  // LogoLink
        }
    }
}