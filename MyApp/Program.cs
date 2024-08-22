using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using RegistrationApi.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Füge Dienste zum Container hinzu.
builder.Services.AddControllers();

// Konfiguriere die Datenbankverbindung
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Konfiguriere CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowMyOrigins",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200") // Erlaube Anfragen von diesem Ursprung
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Konfiguriere JWT-Authentifizierung
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var key = builder.Configuration["Jwt:Key"];
        if (string.IsNullOrEmpty(key))
        {
            throw new InvalidOperationException("Der JWT-Schlüssel ist nicht konfiguriert.");
        }

        var keyBytes = Encoding.UTF8.GetBytes(key);

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"], // Richtiger Wert hier
            IssuerSigningKey = new SymmetricSecurityKey(keyBytes)
        };
    });

// Konfiguriere Swagger für API-Dokumentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Konfiguriere die HTTP-Anforderungspipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Wende CORS-Policy an
app.UseCors("AllowMyOrigins");

// Füge Authentifizierung hinzu
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers(); // Registriere API-Controller

app.Run();
