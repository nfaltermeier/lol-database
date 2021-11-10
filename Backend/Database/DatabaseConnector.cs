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
        private static readonly string connectionString = @"Data Source=(localdb)\MSSQLLocalDb;Integrated Security=true;";
        public static SqlDataReader RunQuery(string sql, SqlParameter[] parameters = null)
        {
            SqlConnection connection = new SqlConnection(connectionString);
            using SqlCommand command = new SqlCommand(sql, connection);
            connection.Open();
            if (parameters != null)
                command.Parameters.AddRange(parameters);
            return command.ExecuteReader(CommandBehavior.CloseConnection);
        }

        public static SqlDataReader RunStoredProcedure(string procedureReference, SqlParameter[] parameters = null)
        {
            SqlConnection connection = new SqlConnection(connectionString);
            using SqlCommand command = new SqlCommand(procedureReference, connection);
            command.CommandType = CommandType.StoredProcedure;
            connection.Open();
            if (parameters != null)
                command.Parameters.AddRange(parameters);
            return command.ExecuteReader(CommandBehavior.CloseConnection);
        }
    }
}
