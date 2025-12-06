// src/lib/backend/index.ts
import type { Backend } from '$lib/types';
import { pocketbaseBackend } from './pocketbase';
import { supabaseBackend } from './supabase';

// 🟢 Change cette constante pour choisir le backend
const USE_SUPABASE = false;

export const backend: Backend = USE_SUPABASE
  ? supabaseBackend
  : pocketbaseBackend;


  export const backendInfo = USE_SUPABASE
  ? {
      name: "Supabase",
      description: "PostgreSQL • Cloud-hosted",
      color: "green"
    }
  : {
      name: "PocketBase",
      description: "SQLite • Self-hosted/local",
      color: "orange"
    };