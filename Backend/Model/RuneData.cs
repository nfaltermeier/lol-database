using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Model
{
    public record RunePath(int ID, string Name, string LogoLink)
    {
        public static RunePath CreateRunePath(SqlDataReader dataReader)
        {
            return new RunePath(dataReader.GetInt32(0), dataReader.GetString(1), dataReader.GetString(2));
        }
    }

    public record KeystoneRune(int ID, string Name, string LogoLink, int RunePathID)
    {
        public static KeystoneRune CreateKeystoneRune(SqlDataReader dataReader)
        {
            return new KeystoneRune(dataReader.GetInt32(0), dataReader.GetString(1), dataReader.GetString(2), dataReader.GetInt32(3));
        }
    }

    public record SecondaryRune(int ID, string Name, string LogoLink, byte Slot, int RunePathID)
    {
        public static SecondaryRune CreateSecondaryRune(SqlDataReader dataReader)
        {
            return new SecondaryRune(dataReader.GetInt32(0), dataReader.GetString(1), dataReader.GetString(2), dataReader.GetByte(3), dataReader.GetInt32(4));
        }
    }

    public record ShardRune(int ID, string Name, string LogoLink, byte Slot)
    {
        public static ShardRune CreateShardRune(SqlDataReader dataReader)
        {
            return new ShardRune(dataReader.GetInt32(0), dataReader.GetString(1), dataReader.GetString(2), dataReader.GetByte(3));
        }
    }

    public record StaticRuneData(IEnumerable<RunePath> RunePaths, IEnumerable<KeystoneRune> KeystoneRunes, IEnumerable<SecondaryRune> SecondaryRunes, IEnumerable<ShardRune> ShardRunes);
}
