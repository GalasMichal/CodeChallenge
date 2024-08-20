using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.Design;
using System.Text.Json.Serialization;

namespace RegistrationApi.Models
{
    public class Company
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Sector { get; set; } = string.Empty;


        // Ignoriere diese Eigenschaft bei der JSON-Serialisierung, um zirkuläre Referenzen zu vermeiden
        [JsonIgnore]
        public ICollection<User>? Users { get; set; }
    }
}
