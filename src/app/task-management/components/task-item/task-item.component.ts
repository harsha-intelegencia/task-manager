import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../modals/task.modal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  @Input() task?: Task;
  @Input() index?: number;
  @Output() deleteTask = new EventEmitter<number>();
  @Output() toggleComplete = new EventEmitter<number>();
}
