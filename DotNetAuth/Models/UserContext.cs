using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Channels;
namespace DotNetAuth.Models
{


    public class UserContext: DbContext
    {
        public UserContext(DbContextOptions<UserContext> options): base(options)
        {
                
        }
        public DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("User"); 
        }
    }
}
