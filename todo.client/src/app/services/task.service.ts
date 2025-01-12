import { Task } from './../models/task-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Task[]>(this.url);
  }

  create(task: Task) {
    return this.http.post(this.url, task);
  }

  update(task: Task) {
    return this.http.put(this.url, task);
  }

  delete(id: number) {
    return this.http.delete(this.url + `${id}`);
  }
}
