using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RegistrationApi.Models
{
    public class Company
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty; // Initialisiert mit leerem Standardwert

        [Required]
        public string Industry { get; set; } = string.Empty; // Initialisiert mit leerem Standardwert

        public ICollection<User>? Users { get; set; } // Nullable, da eine Firma keine Benutzer haben muss
    }
}
