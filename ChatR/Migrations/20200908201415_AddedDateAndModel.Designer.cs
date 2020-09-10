﻿// <auto-generated />
using System;
using ChatR.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace ChatR.Migrations
{
    [DbContext(typeof(MessageContext))]
    [Migration("20200908201415_AddedDateAndModel")]
    partial class AddedDateAndModel
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ChatR.Models.Message", b =>
                {
                    b.Property<int>("Key")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Author")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Content")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.Property<int>("UserKey")
                        .HasColumnType("int");

                    b.HasKey("Key");

                    b.HasIndex("UserKey");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("ChatR.Models.User", b =>
                {
                    b.Property<int>("Key")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("UserIdentifier")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Key");

                    b.HasIndex("UserIdentifier", "Username")
                        .IsUnique()
                        .HasFilter("[UserIdentifier] IS NOT NULL AND [Username] IS NOT NULL");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ChatR.Models.Message", b =>
                {
                    b.HasOne("ChatR.Models.User", "User")
                        .WithMany("Messages")
                        .HasForeignKey("UserKey")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
