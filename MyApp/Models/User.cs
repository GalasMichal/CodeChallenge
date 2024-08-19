using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace RegistrationApi.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;

        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        public string? Email { get; set; }

        [Required]
        public int CompanyId { get; set; }

        // Ignoriere diese Eigenschaft bei der JSON-Serialisierung, um zirkuläre Referenzen zu vermeiden
        [JsonIgnore]
        public Company? Company { get; set; }
    }
}
