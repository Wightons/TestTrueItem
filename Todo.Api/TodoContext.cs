using Microsoft.EntityFrameworkCore;
using Todo.Api.Models;

namespace Todo.Api
{
    public class TodoContext : DbContext
    {
        public DbSet<TaskModel> Tasks { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=.;Database=TasksDb;Trusted_Connection=True;TrustServerCertificate=True");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<TaskModel>(entity =>
            {
                entity.Property(t => t.Title)
                    .IsRequired()
                    .HasMaxLength(25);

                entity.Property(t => t.Text)
                    .IsRequired()
                    .HasMaxLength(1024);
            });
        }
    }
}
