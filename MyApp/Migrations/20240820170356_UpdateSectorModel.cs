using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyApp.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSectorModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Sectors");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Sectors",
                newName: "Bezeichnung");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Sectors",
                newName: "SectorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Bezeichnung",
                table: "Sectors",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "SectorId",
                table: "Sectors",
                newName: "Id");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Sectors",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
