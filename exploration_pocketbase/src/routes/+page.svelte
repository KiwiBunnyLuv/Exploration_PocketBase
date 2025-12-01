<script lang="ts">
  import { onMount } from 'svelte';
  import { backend } from '$lib/backend';
  import type { Task } from '$lib/types';

  let tasks: Task[] = [];
  let newTitle = '';
  let loading = false;
  let errorMessage = '';

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

<h1>PocketTasks — CRUD multi-backend</h1>

{#if errorMessage}
  <p style="color:red">{errorMessage}</p>
{/if}

<form on:submit|preventDefault={addTask}>
  <input
    placeholder="Nouvelle tâche..."
    bind:value={newTitle}
  />
  <button disabled={loading}>Ajouter</button>
</form>

{#if loading}
  <p>Chargement...</p>
{/if}

<ul>
  {#each tasks as task}
    <li>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          on:change={() => toggleTask(task)}
        />
        {task.title}
      </label>
      <button on:click={() => deleteTask(task)} disabled={loading}>
        ❌
      </button>
    </li>
  {/each}
</ul>

