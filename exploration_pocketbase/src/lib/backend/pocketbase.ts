// src/lib/backend/pocketbase.ts
import PocketBase from 'pocketbase';
import type { Backend, Task } from '$lib/types';

console.log("PocketBase loaded:", import.meta.env.VITE_PB_URL);


// ⚠️ L'URL sera définie dans .env
const pb = new PocketBase(import.meta.env.VITE_PB_URL);

export const pocketbaseBackend: Backend = {
  async listTasks(): Promise<Task[]> {
    const records = await pb.collection('tasks').getFullList({ sort: '-created' });
    // On adapte le format PocketBase -> Task
    return records.map((r: any) => ({
      id: r.id,
      title: r.title,
      completed: r.completed
    }));
  },

  async addTask(title: string): Promise<void> {
    await pb.collection('tasks').create({
      title,
      completed: false
    });
  },

  async toggleTask(id: string, completed: boolean): Promise<void> {
    await pb.collection('tasks').update(id, { completed });
  },

  async deleteTask(id: string): Promise<void> {
    await pb.collection('tasks').delete(id);
  }
};
