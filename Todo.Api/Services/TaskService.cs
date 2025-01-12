using Microsoft.EntityFrameworkCore;
using Todo.Api.Models;

namespace Todo.Api.Services
{
    public class TaskService
    {
        private readonly TodoContext _todoContext;
        public TaskService(TodoContext todoContext)
        {
            _todoContext = todoContext;
        }

        public async Task Add(TaskModel taskModel)
        {
            await _todoContext.AddAsync(taskModel);
            await _todoContext.SaveChangesAsync();
        }

        public async Task<List<TaskModel>> GetAll()
        {
            var list = await _todoContext.Tasks.ToListAsync();
            return list;
        }
        
        public async Task Delete(int id)
        {
            var task = await _todoContext.Tasks.FindAsync(id);
            if (task != null)
            {
                _todoContext.Remove(task);
                await _todoContext.SaveChangesAsync();
            }
        }

        public async Task Update(TaskModel taskModel)
        {
            var existingTask = await _todoContext.Tasks.FindAsync(taskModel.Id);
            if (existingTask != null)
            {
                existingTask.Title = taskModel.Title;
                existingTask.Text = taskModel.Text;

                await _todoContext.SaveChangesAsync();
            }
        }

    }
}
