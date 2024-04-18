using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Donem_Projesi.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Sepet",
                columns: table => new
                {
                    SepetId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UrunID = table.Column<int>(type: "int", nullable: false),
                    BolgeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sepet", x => x.SepetId);
                });

            migrationBuilder.CreateTable(
                name: "Urunler",
                columns: table => new
                {
                    UrunId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BolgeID = table.Column<int>(type: "int", nullable: false),
                    Parca_Adi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Marka_Adi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Adet_Sayisi = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Urunler", x => x.UrunId);
                });

            migrationBuilder.CreateTable(
                name: "musteri",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ad = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Soyad = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_musteri", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Siparisler",
                columns: table => new
                {
                    SiparisID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    _musteriId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Siparisler", x => x.SiparisID);
                    table.ForeignKey(
                        name: "FK_Siparisler_musteri__musteriId",
                        column: x => x._musteriId,
                        principalTable: "musteri",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "İade",
                columns: table => new
                {
                    iade_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    urun_iadeUrunId = table.Column<int>(type: "int", nullable: false),
                    Siparis_iadeSiparisID = table.Column<int>(type: "int", nullable: false),
                    UrunId_iade = table.Column<int>(type: "int", nullable: false),
                    BolgeID_iade = table.Column<int>(type: "int", nullable: false),
                    siparis_iade = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_İade", x => x.iade_id);
                    table.ForeignKey(
                        name: "FK_İade_Siparisler_Siparis_iadeSiparisID",
                        column: x => x.Siparis_iadeSiparisID,
                        principalTable: "Siparisler",
                        principalColumn: "SiparisID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_İade_Urunler_urun_iadeUrunId",
                        column: x => x.urun_iadeUrunId,
                        principalTable: "Urunler",
                        principalColumn: "UrunId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Siparisler__musteriId",
                table: "Siparisler",
                column: "_musteriId");

            migrationBuilder.CreateIndex(
                name: "IX_İade_Siparis_iadeSiparisID",
                table: "İade",
                column: "Siparis_iadeSiparisID");

            migrationBuilder.CreateIndex(
                name: "IX_İade_urun_iadeUrunId",
                table: "İade",
                column: "urun_iadeUrunId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Sepet");

            migrationBuilder.DropTable(
                name: "İade");

            migrationBuilder.DropTable(
                name: "Siparisler");

            migrationBuilder.DropTable(
                name: "Urunler");

            migrationBuilder.DropTable(
                name: "musteri");
        }
    }
}
