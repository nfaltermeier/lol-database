using Backend.Util;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Backend.Model
{
    public record Game(int ID, DateTimeOffset StartDateTime, [property: JsonConverter(typeof(TimeSpanJsonConverter))] TimeSpan Duration)
    {
        public static Game CreateGame(SqlDataReader dataReader)
        {
            return new Game(dataReader.GetInt32(0),             // ID
                            dataReader.GetDateTimeOffset(1),    // StartDateTime
                            dataReader.GetTimeSpan(2));         // Duration
        }
    }
}
