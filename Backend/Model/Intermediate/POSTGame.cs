using Backend.Util;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Backend.Model.Intermediate
{
    public record POSTGame(DateTimeOffset StartDateTime, [property: JsonConverter(typeof(TimeSpanJsonConverter))] TimeSpan Duration, int WinningTeamID, int LosingTeamID);
}
