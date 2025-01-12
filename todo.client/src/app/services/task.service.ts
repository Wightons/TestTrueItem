import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task-model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private url = 'https://localhost:7219/api/Tasks/';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Task[]>(this.url);
  }

  create(task: Task) {
    const taskModel = { id: 0, title: task.title, text: task.text };
    return this.http.post(this.url, taskModel);
  }
}
