namespace RegistrationApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; } // Eindeutiger Benutzername
        public string Password { get; set; }
        public string Email { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
    }
}
