namespace RegistrationApi.Models
{
    public class Company
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Industry { get; set; } // Branchenbezeichnung
        public ICollection<User> Users { get; set; }
    }
}
