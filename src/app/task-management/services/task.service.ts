import { Injectable, WritableSignal, signal } from '@angular/core';
import { Task } from '../modals/task.modal';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // A private signal to manage the state of tasks dynamically
  private _tasks: WritableSignal<Task[]> = signal<Task[]>([]);

  // A public getter to access the current state of tasks
  public get tasks(): Task[] {
    return this._tasks();
  }

  constructor() {
    // On initialization, load tasks from local storage if they exist
    const storedTasks = this.loadTasksFromStorage();
    if (storedTasks) {
      this._tasks.set(storedTasks);
    }
  }

  // Adds a task to the list with a unique ID and saves to local storage
  public addTask(title: string, description: string): void {
    this._tasks.update((tasks) => [
      ...tasks,
      { id: this.generateUniqueId(), title, description, completed: false }
    ]);
    this.saveTasksToStorage();
  }

  // Removes a task by index and updates local storage
  public removeTask(index: number): void {
    this._tasks.update((tasks) => tasks.filter((_, i) => i !== index));
    this.saveTasksToStorage();
  }

  // Toggles the completion status of a task and updates local storage
  public toggleTaskCompletion(index: number): void {
    this._tasks.update((tasks) => {
      const updatedTasks = [...tasks];
      updatedTasks[index].completed = !updatedTasks[index].completed;
      return updatedTasks;
    });
    this.saveTasksToStorage();
  }

  // Updates a task at a given index and saves the changes to local storage
  public updateTask(index: number, updatedTask: Task): void {
    this._tasks.update((tasks) => {
      const updatedTasks = [...tasks];
      updatedTasks[index] = { ...updatedTask };
      return updatedTasks;
    });
    this.saveTasksToStorage();
  }

  // Generates a unique ID for each new task
  private generateUniqueId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Saves the current state of tasks to local storage
  private saveTasksToStorage(): void {
    localStorage?.setItem('tasks', JSON.stringify(this.tasks));
  }

  // Loads tasks from local storage
  private loadTasksFromStorage(): Task[] | null {
    const storedTasks = localStorage?.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : null;
  }

}