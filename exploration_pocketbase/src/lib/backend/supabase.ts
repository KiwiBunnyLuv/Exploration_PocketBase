// src/lib/backend/supabase.ts
import { createClient } from '@supabase/supabase-js';
import type { Backend, Task } from '$lib/types';

console.log("Supabase loaded:", import.meta.env.VITE_SUPABASE_URL);



const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON!
);

export const supabaseBackend: Backend = {
  async listTasks(): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error(error);
      return [];
    }

    return (data ?? []).map((r: any) => ({
      id: r.id,
      title: r.title,
      completed: r.completed
    }));
  },

  async addTask(title: string): Promise<void> {
    const { error } = await supabase
      .from('tasks')
      .insert({ title, completed: false });

    if (error) console.error(error);
  },

  async toggleTask(id: string, completed: boolean): Promise<void> {
    const { error } = await supabase
      .from('tasks')
      .update({ completed })
      .eq('id', id);

    if (error) console.error(error);
  },

  async deleteTask(id: string): Promise<void> {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) console.error(error);
  }
};
