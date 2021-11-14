using Backend.Database;
using Backend.Model;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Backend.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class ItemAcquisitionsController : ControllerBase {
        [HttpGet]
        public IEnumerable<ItemAcquisition> Get() {
            using var reader = DatabaseConnector.RunQuery("SELECT PlayerID, GameID, ItemID, TimeOfAcquisition FROM LoLDB.ItemAcquisition");
            List<ItemAcquisition> results = new();
            while (reader.Read())
                results.Add(ItemAcquisition.CreateItemAcquisition(reader));
            return results;
        }

        [HttpPost]
        public void Post([FromForm] ItemAcquisition itemAcquisition) {
            DatabaseConnector.RunQuery("INSERT INTO LoLDB.ItemAcquisition(PlayerID, GameID, ItemID, TimeOfAcquisition) VALUES (@PlayerID, @GameID, @ItemID, @TimeOfAcquisition)",
                new SqlParameter[] {
                    new SqlParameter("@PlayerID", itemAcquisition.PlayerID),
                    new SqlParameter("@GameID", itemAcquisition.GameID),
                    new SqlParameter("@ItemID", itemAcquisition.ItemID),
                    new SqlParameter("@TimeOfAcquisition", itemAcquisition.TimeOfAcquisition),
                }
            ).Close();
        }
    }
}