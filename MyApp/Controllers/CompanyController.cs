using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegistrationApi.Data;
using RegistrationApi.Models;

namespace RegistrationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CompanyController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/company
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompanies()
        {
            return await _context.Companies.ToListAsync();
        }

        // GET: api/company/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Company>> GetCompany(int id)
        {
            var company = await _context.Companies.FindAsync(id);

            if (company == null)
            {
                return NotFound();
            }

            return company;
        }

        // POST: api/company
        [HttpPost]
        public async Task<ActionResult<Company>> PostCompany([FromBody] Company company)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Gibt die Validierungsfehler zurück
            }

            // Hole den Sector basierend auf dem SectorId
            var sector = await _context.Sectors.FindAsync(company.SectorId);
            if (sector == null)
            {
                return BadRequest("Ungültiger SectorId.");
            }

            // Company hinzufügen und speichern
            _context.Companies.Add(company);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCompany), new { id = company.CompanyId }, company);
        }

         [HttpGet("exists/{name}")]
        public async Task<IActionResult> CheckCompanyExists(string name)
        {
            bool exists = await _context.Companies.AnyAsync(c => c.Name == name);
            return Ok(exists);
        }

        // PUT: api/company/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompany(int id, [FromBody] Company company)
        {
            if (id != company.CompanyId)
            {
                return BadRequest();
            }

            // Sicherstellen, dass der angegebene Sector existiert
            var sector = await _context.Sectors.FindAsync(company.SectorId);
            if (sector == null)
            {
                return BadRequest("Ungültiger SectorId.");
            }

            _context.Entry(company).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/company/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            var company = await _context.Companies.FindAsync(id);
            if (company == null)
            {
                return NotFound();
            }

            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CompanyExists(int id)
        {
            return _context.Companies.Any(e => e.CompanyId == id);
        }
    }
}
