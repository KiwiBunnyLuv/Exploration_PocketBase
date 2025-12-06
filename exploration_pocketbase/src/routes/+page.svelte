<script lang="ts">
  import { onMount } from 'svelte';
  import { backend } from '$lib/backend';
  import type { Task } from '$lib/types';
  import { backendInfo } from '$lib/backend';
  import { measureExecution } from '$lib/utils/measure';

  let tasks: Task[] = [];
  let newTitle = '';
  let loading = false;
  let errorMessage = '';
  let duration = 0; // <-- temps de réponse mesuré
  let taskAdded = 0;
  let thousandAddedButton = false;

  let benchCreate = 0;
let benchRead = 0;
let benchUpdate = 0;
let benchDelete = 0;

let benchRunning = false;
let benchResultVisible = false;
async function runBenchmark() {
  if (!confirm("Lancer un benchmark complet ? Cela va créer, modifier et supprimer 1000 tâches.")) return;

  benchRunning = true;
  benchResultVisible = false;
  errorMessage = '';

  try {
    // === CREATE 1000 ===
    const { duration: c } = await measureExecution(async () => {
      for (let i = 0; i < 1000; i++) {
        await backend.addTask(`bench-${i}`);
      }
    });
    benchCreate = c;

    // === READ ===
    const { duration: r, result: tasksResult } = await measureExecution(() =>
      backend.listTasks()
    );
    benchRead = r;

    // === UPDATE 1000 ===
    const benchTasks = tasksResult.filter(t => t.title.startsWith("bench-"));
    const { duration: u } = await measureExecution(async () => {
      for (const t of benchTasks) {
        await backend.toggleTask(t.id, !t.completed);
      }
    });
    benchUpdate = u;

    // === DELETE 1000 ===
    const { duration: d } = await measureExecution(async () => {
      for (const t of benchTasks) {
        await backend.deleteTask(t.id);
      }
    });
    benchDelete = d;

    benchResultVisible = true;
    await loadTasks();

  } catch (e) {
    console.error(e);
    errorMessage = "Erreur durant le benchmark";
  } finally {
    benchRunning = false;
  }
}


  async function deleteAllTasks() {
  if (!confirm("Voulez-vous vraiment supprimer toutes les tâches ?")) return;

  loading = true;
  errorMessage = '';

  try {
    const { duration: d } = await measureExecution(async () => {
      const batchSize = 50;

      for (let i = 0; i < tasks.length; i += batchSize) {
        const batch = tasks.slice(i, i + batchSize);
        const promises = batch.map(t => backend.deleteTask(t.id));
        await Promise.all(promises);
        console.log(`Supprimé ${Math.min(i + batchSize, tasks.length)} / ${tasks.length}`);
      }
    });

    duration = d;
    await loadTasks();
  } catch (e) {
    errorMessage = "Erreur lors de la suppression massive";
  } finally {
    loading = false;
  }
}



  // Charger les tâches avec mesure de performance
  async function loadTasks() {
    loading = true;
    errorMessage = '';


    try {
      const { result, duration: d } = await measureExecution(() => backend.listTasks());
      tasks = result;
      taskAdded = result.length;
    } catch (e) {
      errorMessage = "Erreur lors du chargement des tâches";
    } finally {
      loading = false;
    }
  }

  async function addTask() {
    if (!newTitle.trim()) return;

    loading = true;
    try {
      const { duration: d } = await measureExecution(() =>
        backend.addTask(newTitle.trim())
      );
      duration = d;
      newTitle = '';
      await loadTasks();
    } catch (e) {
      errorMessage = "Erreur lors de l'ajout";
    } finally {
      loading = false;
    }
  }

  async function toggleTask(task: Task) {
    loading = true;
    try {
      const { duration: d } = await measureExecution(() =>
        backend.toggleTask(task.id, !task.completed)
      );
      duration = d;
      await loadTasks();
    } catch (e) {
      errorMessage = "Erreur lors de la mise à jour";
    } finally {
      loading = false;
    }
  }

  async function deleteTask(task: Task) {
    loading = true;
    try {
      const { duration: d } = await measureExecution(() =>
        backend.deleteTask(task.id)
      );
      duration = d;

      await loadTasks();
    } catch (e) {
      errorMessage = "Erreur lors de la suppression";
    } finally {
      loading = false;
    }
  }

  onMount(loadTasks);


    async function addThousandTask() {
    if (!newTitle.trim()) return;

    loading = true;
    try {
      const { duration: d } = await measureExecution(async () => {
        const promises: Promise<unknown>[] = [];
        for (let i = 0; i < 100000; i++) {

          await backend.addTask(`Task ${i + 1}`);
          console.log(`Ajout de la tâche ${i + 1}/1000`);
        }
        await Promise.all(promises);
      });
      duration = d;
      newTitle = '';
      await loadTasks();
    } catch (e) {
      errorMessage = "Erreur lors de l'ajout";
    } finally {
      loading = false;
    }
  }
</script>

<!-- CONTAINER -->
<div class="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">

  <h1 class="text-2xl font-bold mb-4 text-center">PocketTasks — CRUD multi-backend</h1>

  <!-- Erreur -->
  {#if errorMessage}
    <p class="text-red-500 font-medium text-center mb-3">{errorMessage}</p>
  {/if}

  <!-- FORMULAIRE -->
  <form on:submit|preventDefault={addTask} class="flex gap-2 mb-4">
    <input
      placeholder="Nouvelle tâche..."
      bind:value={newTitle}
      class="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
    />

    <button
      disabled={loading}
      class="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:bg-gray-400 transition"
    >
      Ajouter
    </button>
    <button
      type="button"
      on:click={addThousandTask}
      disabled={loading}
      class="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 disabled:bg-gray-400 transition"
    >
      Ajouter 1000 tasks
    </button>
  </form>

  <!-- Indicateur de performance -->
  {#if duration > 0}
    <div class="mt-2 mb-4 p-2 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-medium">
      ⏱ Temps de réponse : <span class="font-bold">{duration} ms</span>
    </div>
  {/if}

    {#if taskAdded > 0}
    <div class="mt-2 mb-4 p-2 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-medium">
      nombre de tâches : <span class="font-bold">{taskAdded}</span>
    </div>
  {/if}
    <button
    class="px-3 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 disabled:bg-gray-400 transition"
    disabled={loading || taskAdded === 0}
    on:click={deleteAllTasks}
  >
    Tout supprimer
  </button>
  <!-- Benchmark -->
<div class="mt-6 p-4 bg-gray-50 border rounded-lg mb-3">
  <h2 class="text-lg font-semibold mb-3">🏁 Benchmark complet</h2>

  <button
    on:click={runBenchmark}
    disabled={benchRunning || loading}
    class="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 disabled:bg-gray-400 transition"
  >
    {benchRunning ? "Benchmark en cours..." : "Lancer le benchmark"}
  </button>

  {#if benchResultVisible}
    <div class="mt-4 text-sm space-y-2">
      <p>🟦 <strong>CREATE (1000)</strong> : {benchCreate} ms</p>
      <p>🟩 <strong>READ</strong> : {benchRead} ms</p>
      <p>🟧 <strong>UPDATE (1000)</strong> : {benchUpdate} ms</p>
      <p>🟥 <strong>DELETE (1000)</strong> : {benchDelete} ms</p>
    </div>
  {/if}
</div>

  <!-- LOADING -->
  {#if loading}
    <p class="text-center text-indigo-600 font-semibold">Chargement...</p>
  {/if}

  <!-- LISTE DES TÂCHES -->
  <ul class="space-y-2 mt-4">
    {#each tasks as task}
      <li class="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
        
        <!-- Checkbox + titre -->
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={task.completed}
            on:change={() => toggleTask(task)}
            class="h-4 w-4 accent-indigo-600"
          />
          <span class={task.completed ? "line-through text-gray-400" : ""}>
            {task.title}
          </span>
        </label>

        <!-- Delete -->
        <button
          on:click={() => deleteTask(task)}
          disabled={loading}
          class="px-3 py-1 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 disabled:bg-gray-400 transition"
        >
          ❌
        </button>
      </li>
    {/each}
  </ul>

  <!-- BACKEND INDICATOR -->
  <div
    class="mt-6 inline-flex items-center px-3 py-2 rounded-lg border-2 text-sm font-semibold"
    style="border-color:{backendInfo.color}; color:{backendInfo.color};"
  >
    {backendInfo.name} — {backendInfo.description}
  </div>

</div>

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