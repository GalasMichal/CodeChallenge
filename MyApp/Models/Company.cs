using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace RegistrationApi.Models
{
    public class Company
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CompanyId { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        public int SectorId { get; set; }

        [JsonIgnore]
        public ICollection<User>? Users { get; set; }
    }
}
