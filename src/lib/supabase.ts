import { createClient } from '@supabase/supabase-js';

// Vite's import.meta.env typing for this project
declare global {
  interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_ANON_KEY: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Theme = 'blue' | 'pink' | 'dark';

export interface Photo {
  url: string;
  caption: string;
}

export interface OpenWhenLetter {
  trigger: string;
  message: string;
}

export interface LoveCard {
  front: string;
  back: string;
}

export interface PromiseTodo {
  text: string;
  done: boolean;
}

export interface ApologyPage {
  id?: string;
  slug: string;
  partner_name: string;
  theme: Theme;
  apology_message: string;
  learned_text: string;
  closing_message: string;
  music_url: string | null;
  music_enabled: boolean;
  photos: Photo[];
  show_apology: boolean;
  show_memories: boolean;
  show_promise: boolean;
  open_when_letters: OpenWhenLetter[];
  love_cards: LoveCard[];
  promise_todos: PromiseTodo[];
  show_open_when: boolean;
  show_love_cards: boolean;
  show_promise_todos: boolean;
  created_at?: string;
}

export async function saveApologyPage(page: Omit<ApologyPage, 'id' | 'created_at'>): Promise<ApologyPage | null> {
  const { data, error } = await supabase
    .from('apology_pages')
    .insert(page)
    .select()
    .single();

  if (error) {
    console.error('Error saving page:', error);
    return null;
  }
  return data;
}

export async function getApologyPage(slug: string): Promise<ApologyPage | null> {
  const { data, error } = await supabase
    .from('apology_pages')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error('Error fetching page:', error);
    return null;
  }
  return data;
}

export function generateSlug(): string {
  const words = ['rose', 'heart', 'love', 'dear', 'true', 'pure', 'soft', 'warm', 'light', 'dawn'];
  const w1 = words[Math.floor(Math.random() * words.length)];
  const w2 = words[Math.floor(Math.random() * words.length)];
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `${w1}-${w2}-${num}`;
}

export const ACCESS_PASSWORD = 'heartmends2026';

export async function logAccess(): Promise<void> {
  await supabase.from('access_logs').insert({ accessed_at: new Date().toISOString() });
}


