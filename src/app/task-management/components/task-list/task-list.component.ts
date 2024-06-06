import { Component, inject } from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../modals/task.modal';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent, FormsModule, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  private taskService = inject(TaskService); // Service injection to manage task operations
  public editMode: boolean[] = []; // Tracks edit mode state for each task

  // Getter to retrieve tasks from the task service
  public get tasks(): Task[] {
    return this.taskService.tasks;
  }

  // Method to toggle the completion status of a task
  public toggleTaskCompletion(index: number): void {
    this.taskService.toggleTaskCompletion(index);
  }

  // Method to delete a task from the list
  public deleteTask(index: number): void {
    this.taskService.removeTask(index);
  }

  // Method to update a task's details
  public updateTask(index: number, updatedTask: Task): void {
    this.taskService.updateTask(index, updatedTask);
    this.editMode[index] = false; // Turn off edit mode after updating a task
  }
}
