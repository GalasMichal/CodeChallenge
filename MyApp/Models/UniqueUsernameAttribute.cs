using System.ComponentModel.DataAnnotations;
using System.Linq;
using RegistrationApi.Data;

namespace RegistrationApi.Models
{
    public class UniqueUsernameAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
        {
            // Sicherstellen, dass der Datenbankkontext vorhanden ist
            if (validationContext.GetService(typeof(AppDbContext)) is not AppDbContext context)
            {
                return new ValidationResult("Datenbankkontext konnte nicht gefunden werden.");
            }

            // Sicherstellen, dass der Wert (username) nicht null ist
            if (value is not string username)
            {
                return new ValidationResult("Der Benutzername darf nicht NULL sein.");
            }

            // Überprüfen, ob der Benutzername bereits existiert
            if (context.Users.Any(u => u.Username == username))
            {
                return new ValidationResult("Der Benutzername ist bereits vergeben.");
            }

      // Erfolgreiche Validierung
#pragma warning disable CS8603 // Mögliche Nullverweisrückgabe.
      return ValidationResult.Success;
#pragma warning restore CS8603 // Mögliche Nullverweisrückgabe.
    }
    }
}
