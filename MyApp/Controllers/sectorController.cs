using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegistrationApi.Data;
using RegistrationApi.Models;


namespace RegistrationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SectorController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SectorController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sector>>> GetSectors()
        {
            return await _context.Sectors.ToListAsync();
        }
    }
}
