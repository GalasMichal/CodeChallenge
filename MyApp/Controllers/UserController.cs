using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RegistrationApi.Data;
using RegistrationApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace RegistrationApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UserController : ControllerBase
  {
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public UserController(AppDbContext context, IConfiguration configuration)
    {
      _context = context;
      _configuration = configuration;
    }

    // POST: api/user/register
    [HttpPost("register")]
    public async Task<IActionResult> RegisterUser(User user)
    {
      // Validierung des Benutzernamens
      if (await _context.Users.AnyAsync(u => u.Username == user.Username))
      {
        return BadRequest("Username already exists.");
      }

      _context.Users.Add(user);
      await _context.SaveChangesAsync();

      return Ok(user);
    }

    // GET: api/user/id/{username}
    [HttpGet("id/{username}")]
    public async Task<IActionResult> GetUserIdByUsername(string username)
    {
      var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
      if (user == null)
      {
        return NotFound();
      }
      return Ok(user.Id);
    }

    // GET: api/user/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(int id)
    {
      var user = await _context.Users.FindAsync(id);
      if (user == null)
      {
        return NotFound();
      }
      return Ok(user);
    }

    [HttpGet("test")]
    public IActionResult Test()
    {
      return Ok("Controller is working");
    }

    // GET: api/user/exists/{username}
    [HttpGet("exists/{username}")]
    public async Task<IActionResult> CheckUsernameExists(string username)
    {
      var userExists = await _context.Users.AnyAsync(u => u.Username == username);
      return Ok(userExists); // Gibt true oder false zurück
    }

    // POST: api/user/login
    [HttpPost("login")]
    public async Task<IActionResult> Login(UserLoginDto userLogin)
    {
      var user = await _context.Users
          .FirstOrDefaultAsync(u => u.Username == userLogin.Username && u.Password == userLogin.Password);

      if (user == null)
      {
        return Unauthorized("Invalid username or password.");
      }

      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key is not configured"));
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new Claim[]
          {
                    new Claim(ClaimTypes.Name, user.Username)
          }),
        Expires = DateTime.UtcNow.AddHours(1),
        Issuer = _configuration["Jwt:Issuer"],
        Audience = _configuration["Jwt:Audience"],
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };
      var token = tokenHandler.CreateToken(tokenDescriptor);
      var tokenString = tokenHandler.WriteToken(token);

      return Ok(new { Token = tokenString });
    }

    private bool UserExists(int id)
    {
      return _context.Users.Any(e => e.Id == id);
    }
  }
}
