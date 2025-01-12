using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Todo.Api.Models;
using Todo.Api.Services;

namespace Todo.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly TaskService _taskService;

        public TasksController(TaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public async Task<ActionResult<List<TaskModel>>> GetAll()
        {
            var tasks = await _taskService.GetAll();
            return Ok(tasks);
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] TaskModel taskModel)
        {
            if (taskModel == null)
            {
                return BadRequest("Task model cannot be null.");
            }

            await _taskService.Add(taskModel);
            return CreatedAtAction(nameof(GetAll), new { id = taskModel.Id }, taskModel);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var existingTask = await _taskService.GetAll();
            if (existingTask == null)
            {
                return NotFound($"Task with ID {id} not found.");
            }

            await _taskService.Delete(id);
            return NoContent();
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromBody] TaskModel taskModel)
        {
            if (taskModel == null)
            {
                return BadRequest("Task model cannot be null.");
            }

            await _taskService.Update(taskModel);
            return NoContent();
        }
    }
}
