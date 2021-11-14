using System.Data.SqlClient;

namespace Backend.Model {
    public record Item(int ID, string Name, int ItemQualityID, string LogoLink) {
        public static Item CreateItem(SqlDataReader dataReader) {
            return new Item(dataReader.GetInt32(0),     // ID
                            dataReader.GetString(1),    // Name
                            dataReader.GetInt32(2),     // ItemQualityID
                            dataReader.GetString(3));   // LogoLink
        }
    }
}