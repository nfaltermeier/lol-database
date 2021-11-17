using System.Data.SqlClient;

namespace Backend.Model {
    public record KillAssistant(int KillID, int AssisterPlayerID) {
        public static KillAssistant CreateKillAssistant(SqlDataReader dataReader) {
            return new KillAssistant(dataReader.GetInt32(0),    // KillID
                                     dataReader.GetInt32(1));   // AssisterPlayerID
        }
    }
}