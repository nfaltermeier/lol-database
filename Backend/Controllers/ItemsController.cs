using Backend.Database;
using Backend.Model;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Backend.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class ItemController : ControllerBase {
        [HttpGet]
        public IEnumerable<Item> Get() {
            using var reader = DatabaseConnector.RunQuery("SELECT ItemID, [Name], ItemQualityID, LogoLink FROM LoLDB.Item");
            List<Item> results = new();
            while (reader.Read())
                results.Add(Item.CreateItem(reader));
            return results;
        }

        [HttpPost]
        public void Post([FromForm] Item item) {
            DatabaseConnector.RunQuery("INSERT INTO LoLDB.Item(Name, ItemQualityID, LogoLink) VALUES (@Name, @ItemQualityID, @LogoLink)",
                new SqlParameter[] {
                    new SqlParameter("@Name", item.Name),
                    new SqlParameter("@ItemQualityID", item.ItemQualityID),
                    new SqlParameter("@LogoLink", item.LogoLink),
                }
            ).Close();
        }
    }
}