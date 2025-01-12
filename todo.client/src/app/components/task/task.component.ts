import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Task } from '../../models/task-model';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() task: Task | null = null;
  @ViewChild('titleInput') titleInput!: ElementRef;
  @ViewChild('textInput') textInput!: ElementRef;

  titleBeforeEditValue: string = '';
  textBeforeEditValue: string = '';

  onTitleEdit() {
    this.task!.isTitleEdited = true;
    setTimeout(() => {
      this.titleInput.nativeElement.focus();
      this.titleBeforeEditValue = this.titleInput.nativeElement.value;
    });
  }

  onTextEdit() {
    this.task!.isTextEdited = true;
    setTimeout(() => {
      this.textInput.nativeElement.focus();
      this.textBeforeEditValue = this.textInput.nativeElement.value;
    });
  }

  onTitleBlur() {
    this.task!.isTitleEdited = false;
  }
}
