using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.Design;
using System.Text.Json.Serialization;

namespace RegistrationApi.Models
{
    public class Company
    {
        public int CompanyId { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public int SectorId { get; set; }

        // Verknüpfung zur zugehörigen Sector-Entität
        public required Sector Sector { get; set; }

        // Ignoriere diese Eigenschaft bei der JSON-Serialisierung, um zirkuläre Referenzen zu vermeiden
        [JsonIgnore]
        public ICollection<User>? Users { get; set; }
    }
}
