// src/lib/types.ts

// ✨ Représente une tâche dans notre appli
export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

// ✨ Interface que chaque backend doit respecter
export interface Backend {
  listTasks(): Promise<Task[]>;
  addTask(title: string): Promise<void>;
  toggleTask(id: string, completed: boolean): Promise<void>;
  deleteTask(id: string): Promise<void>;
}
