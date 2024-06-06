import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  public title: string = ''; // Binds to form input to capture the title of a new task
  public description: string = ''; // Binds to form input to capture the description of a new task

  // Injects the TaskService to interact with the task data
  constructor(private taskService: TaskService) { }

  // Method to handle form submission
  public onSubmit(): void {
    // Check if title and description are not just whitespace
    if (this.title.trim() && this.description.trim()) {
      // Add the task using the task service
      this.taskService.addTask(this.title, this.description);
      // Reset the form fields after submission
      this.title = '';
      this.description = '';
    }
  }
}
