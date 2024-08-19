using System.ComponentModel.DataAnnotations;

namespace RegistrationApi.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; } = string.Empty; // Initialisiert mit leerem Standardwert

        [Required]
        public string LastName { get; set; } = string.Empty; // Initialisiert mit leerem Standardwert

        [Required]
        public string Username { get; set; } = string.Empty; // Initialisiert mit leerem Standardwert

        [Required]
        public string Password { get; set; } = string.Empty; // Initialisiert mit leerem Standardwert

        public string? Email { get; set; } // Nullable, da optional

        [Required]
        public int CompanyId { get; set; }
        public Company? Company { get; set; } // Nullable, da optional
    }
}
