using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace Backend.Database
{
    public class DatabaseConnector
    {
        public static SqlConnection sqlConnection;

        static DatabaseConnector()
        {
            sqlConnection = new SqlConnection(@"Data Source=(localdb)\MSSQLLocalDb;Integrated Security=true;");
            sqlConnection.Open();
        }

        public static (SqlCommand, SqlDataReader) RunCommand(string sql)
        {
            SqlCommand command = new SqlCommand(sql, sqlConnection);
            return (command, command.ExecuteReader());
        }
    }
}
