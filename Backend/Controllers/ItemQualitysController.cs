using Backend.Database;
using Backend.Model;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Backend.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class ItemQualitysController : ControllerBase {
        [HttpGet]
        public IEnumerable<ItemQuality> Get() {
            using var reader = DatabaseConnector.RunQuery("SELECT ItemQualityID, [Name] FROM LoLDB.ItemQuality");
            List<ItemQuality> results = new();
            while (reader.Read())
                results.Add(ItemQuality.CreateItemQuality(reader));
            return results;
        }
    }
}