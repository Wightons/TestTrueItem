import { TaskService } from './services/task.service';
import { Component } from '@angular/core';
import { TaskComponent } from './components/task/task.component';
import { Task } from './models/task-model';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface NewTask {
  title: string;
  text: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  tasks$: Observable<Task[]> | null = null;
  isModalExpand: boolean = false;

  newTask: NewTask = { title: '', text: '' };

  constructor(private service: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  onCreate() {
    this.isModalExpand = !this.isModalExpand;
  }

  onCreation($event: any) {
    const newTask: Task = {
      id: 0,
      title: this.newTask.title,
      text: this.newTask.text,
    };
    this.service.create(newTask).subscribe({
      next: () => {
        this.newTask = { title: '', text: '' };
        this.isModalExpand = false;
        this.loadTasks();
      },
      error: (error) => {
        console.error('Error creating task:', error);
      },
    });
  }

  loadTasks() {
    this.tasks$ = this.service.getAll();
  }

  onTaskDeleted(taskId: number) {
    this.tasks$ = this.tasks$!.pipe(
      map((tasks: Task[]) => tasks.filter((task) => task.id !== taskId))
    );
  }
}
