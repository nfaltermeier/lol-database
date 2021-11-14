using System.Data.SqlClient;

namespace Backend.Model {
    public record ItemQuality(int ID, string Name) {
        public static ItemQuality CreateItemQuality(SqlDataReader dataReader) {
            return new ItemQuality(dataReader.GetInt32(0),      // ID
                                   dataReader.GetString(1));    // Name
        }
    }
}