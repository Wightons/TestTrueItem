import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Task } from './../../models/task-model';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() task: Task | null = null;
  @Output() taskDeleted = new EventEmitter<number>();

  @ViewChild('titleInput') titleInput!: ElementRef;
  @ViewChild('textInput') textInput!: ElementRef;

  titleBeforeEditValue: string = '';
  textBeforeEditValue: string = '';

  constructor(private service: TaskService) {}

  onTitleEdit() {
    this.task!.isTitleEdited = true;
    setTimeout(() => {
      this.titleInput.nativeElement.focus();
      this.titleBeforeEditValue = this.task!.title;
    });
  }

  onTextEdit() {
    this.task!.isTextEdited = true;
    setTimeout(() => {
      this.textInput.nativeElement.focus();
      this.textBeforeEditValue = this.task!.text;
    });
  }

  onTitleBlur() {
    let currentTitleValue = this.task!.title;
    if (currentTitleValue !== this.titleBeforeEditValue) {
      this.service
        .update({ ...this.task!, title: currentTitleValue })
        .subscribe({
          error: (error) => {
            console.error('Error updating task title:', error);
          },
        });
    }
    this.task!.isTitleEdited = false;
  }

  onTextBlur() {
    let currentTextValue = this.task!.text;
    if (currentTextValue !== this.textBeforeEditValue) {
      this.service.update({ ...this.task!, text: currentTextValue }).subscribe({
        error: (error) => {
          console.error('Error updating task text:', error);
        },
      });
    }
    this.task!.isTextEdited = false;
  }

  onDelete() {
    this.service.delete(this.task!.id).subscribe({
      next: () => {
        this.taskDeleted.emit(this.task?.id);
      },
      error: (error) => {
        console.error('Error deleting task:', error);
      },
    });
  }
}
