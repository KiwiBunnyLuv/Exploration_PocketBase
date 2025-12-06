<script lang="ts">
  import { onMount } from 'svelte';
  import { backend } from '$lib/backend';
  import type { Task } from '$lib/types';
  import { backendInfo } from '$lib/backend';

  let tasks: Task[] = [];
  let newTitle = '';
  let loading = false;
  let errorMessage = '';
  export let showDescription = true;

  async function loadTasks() {
    loading = true;
    errorMessage = '';
    try {
      tasks = await backend.listTasks();
    } catch (e) {
      console.error(e);
      errorMessage = "Erreur lors du chargement des tâches";
    } finally {
      loading = false;
    }
  }

  async function addTask() {
    if (!newTitle.trim()) return;
    loading = true;
    try {
      await backend.addTask(newTitle.trim());
      newTitle = '';
      await loadTasks();
    } catch (e) {
      console.error(e);
      errorMessage = "Erreur lors de l'ajout";
    } finally {
      loading = false;
    }
  }

  async function toggleTask(task: Task) {
    loading = true;
    try {
      await backend.toggleTask(task.id, !task.completed);
      await loadTasks();
    } catch (e) {
      console.error(e);
      errorMessage = "Erreur lors de la mise à jour";
    } finally {
      loading = false;
    }
  }

  async function deleteTask(task: Task) {
    loading = true;
    try {
      await backend.deleteTask(task.id);
      await loadTasks();
    } catch (e) {
      console.error(e);
      errorMessage = "Erreur lors de la suppression";
    } finally {
      loading = false;
    }
  }

  onMount(loadTasks);
</script>
<style>
  .container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1.5rem;
    background: #fafafa;
    border-radius: 12px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  }

  h1 {
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1.6rem;
  }

  /* Form */
  form {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  input {
    flex: 1;
    padding: 0.6rem 0.8rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
  }

  button {
    padding: 0.6rem 1rem;
    background: #4f46e5;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: 0.2s;
  }

  button:hover:not(:disabled) {
    background: #4338ca;
  }

  button:disabled {
    background: #999;
  }

  /* Task list */
  ul {
    list-style: none;
    padding: 0;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  li {
    background: white;
    padding: 0.7rem 1rem;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #eee;
  }

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .delete-btn {
    background: #dc2626;
  }

  .delete-btn:hover {
    background: #b91c1c;
  }

  /* Backend indicator */
  .backend-badge {
    margin-top: 1rem;
    padding: 0.5rem 0.8rem;
    border-radius: 8px;
    font-size: 0.9rem;
    width: fit-content;
    border: 2px solid var(--color);
    color: var(--color);
    font-weight: bold;
  }

  .error {
    color: #dc2626;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  .loading {
    text-align: center;
    margin-top: 1rem;
    color: #4f46e5;
    font-weight: bold;
  }
</style>

<div class="container">
  <h1>PocketTasks — CRUD multi-backend</h1>

  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}

  <form on:submit|preventDefault={addTask}>
    <input placeholder="Nouvelle tâche..." bind:value={newTitle} />
    <button disabled={loading}>Ajouter</button>
  </form>

  {#if loading}
    <p class="loading">Chargement...</p>
  {/if}

  <ul>
    {#each tasks as task}
      <li>
        <label>
          <input type="checkbox" checked={task.completed} on:change={() => toggleTask(task)} />
          {task.title}
        </label>
        <button class="delete-btn" on:click={() => deleteTask(task)} disabled={loading}>❌</button>
      </li>
    {/each}
  </ul>

  <!-- Backend Indicator -->
  <div
    class="backend-badge"
    style="--color: {backendInfo.color};"
  >
    {backendInfo.name} — {backendInfo.description}
  </div>
</div>
