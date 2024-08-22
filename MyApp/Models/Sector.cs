using System.ComponentModel.DataAnnotations;

namespace RegistrationApi.Models
{
    public class Sector
    {
        [Key]
        public int SectorId { get; set; }

        [Required]
        public string Bezeichnung { get; set; } = string.Empty;
    }
}
