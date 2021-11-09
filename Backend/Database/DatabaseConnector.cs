using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace Backend.Database
{
    public class DatabaseConnector
    {
        public static SqlDataReader RunCommand(string sql, SqlParameter[] parameters = null)
        {
            SqlConnection connection = new SqlConnection(@"Data Source=(localdb)\MSSQLLocalDb;Integrated Security=true;");
            using SqlCommand command = new SqlCommand(sql, connection);
            connection.Open();
            if (parameters != null)
                command.Parameters.AddRange(parameters);
            return command.ExecuteReader(CommandBehavior.CloseConnection);
        }
    }
}
