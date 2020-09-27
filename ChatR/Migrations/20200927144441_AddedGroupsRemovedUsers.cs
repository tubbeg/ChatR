using Microsoft.EntityFrameworkCore.Migrations;

namespace ChatR.Migrations
{
    public partial class AddedGroupsRemovedUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Users_UserKey",
                table: "Messages");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Messages_UserKey",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "UserKey",
                table: "Messages");

            migrationBuilder.AddColumn<int>(
                name: "GroupKey",
                table: "Messages",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Groups",
                columns: table => new
                {
                    Key = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groups", x => x.Key);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Messages_GroupKey",
                table: "Messages",
                column: "GroupKey");

            migrationBuilder.CreateIndex(
                name: "IX_Groups_Name",
                table: "Groups",
                column: "Name",
                unique: true,
                filter: "[Name] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Groups_GroupKey",
                table: "Messages",
                column: "GroupKey",
                principalTable: "Groups",
                principalColumn: "Key",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Groups_GroupKey",
                table: "Messages");

            migrationBuilder.DropTable(
                name: "Groups");

            migrationBuilder.DropIndex(
                name: "IX_Messages_GroupKey",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "GroupKey",
                table: "Messages");

            migrationBuilder.AddColumn<int>(
                name: "UserKey",
                table: "Messages",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Key = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserIdentifier = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Username = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Key);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Messages_UserKey",
                table: "Messages",
                column: "UserKey");

            migrationBuilder.CreateIndex(
                name: "IX_Users_UserIdentifier_Username",
                table: "Users",
                columns: new[] { "UserIdentifier", "Username" },
                unique: true,
                filter: "[UserIdentifier] IS NOT NULL AND [Username] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Users_UserKey",
                table: "Messages",
                column: "UserKey",
                principalTable: "Users",
                principalColumn: "Key",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
