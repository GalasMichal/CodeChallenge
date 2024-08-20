using System.ComponentModel.DataAnnotations;

namespace RegistrationApi.Models
{
    public class Sector
    {
        [Key]
        public int SectorId { get; set; }  // Entsprechend der Tabelle
        public string Bezeichnung { get; set; } = string.Empty;  // Entsprechend der Tabelle
    }
}


