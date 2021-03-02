using System.Diagnostics.CodeAnalysis;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data

{
    public class DataContext : DbContext
    {
        //need to create a constructor
        public DataContext( DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }
    }
}