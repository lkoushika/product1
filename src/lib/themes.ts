import type { Theme } from './supabase';

export interface ThemeConfig {
  id: Theme;
  name: string;
  description: string;
  bg: string;
  bgGradient: string;
  particleColor: string;
  cardBg: string;
  cardBorder: string;
  headingColor: string;
  textColor: string;
  mutedColor: string;
  accentColor: string;
  buttonBg: string;
  buttonText: string;
  dividerColor: string;
  previewSwatch: string;
}

export const themes: Record<Theme, ThemeConfig> = {
  pink: {
    id: 'pink',
    name: 'Pastel Pink Dreamy',
    description: 'Soft, warm, romantic',
    bg: 'bg-rose-50',
    bgGradient: 'from-rose-50 via-pink-50 to-orange-50',
    particleColor: '#fda4b4',
    cardBg: 'bg-white/60',
    cardBorder: 'border-rose-100',
    headingColor: 'text-rose-800',
    textColor: 'text-rose-900',
    mutedColor: 'text-rose-400',
    accentColor: 'text-rose-500',
    buttonBg: 'bg-rose-400 hover:bg-rose-500',
    buttonText: 'text-white',
    dividerColor: 'border-rose-200',
    previewSwatch: 'from-rose-200 to-pink-200',
  },
  blue: {
    id: 'blue',
    name: 'Soft Baby Blue',
    description: 'Calm, tender, sincere',
    bg: 'bg-sky-50',
    bgGradient: 'from-sky-50 via-blue-50 to-indigo-50',
    particleColor: '#93cbfc',
    cardBg: 'bg-white/60',
    cardBorder: 'border-sky-100',
    headingColor: 'text-sky-800',
    textColor: 'text-sky-900',
    mutedColor: 'text-sky-400',
    accentColor: 'text-sky-500',
    buttonBg: 'bg-sky-400 hover:bg-sky-500',
    buttonText: 'text-white',
    dividerColor: 'border-sky-200',
    previewSwatch: 'from-sky-200 to-blue-200',
  },
  dark: {
    id: 'dark',
    name: 'Dark Rainy Emotional',
    description: 'Deep, raw, honest',
    bg: 'bg-slate-900',
    bgGradient: 'from-slate-900 via-slate-800 to-slate-900',
    particleColor: '#94a3b8',
    cardBg: 'bg-white/5',
    cardBorder: 'border-white/10',
    headingColor: 'text-slate-100',
    textColor: 'text-slate-200',
    mutedColor: 'text-slate-500',
    accentColor: 'text-slate-300',
    buttonBg: 'bg-slate-600 hover:bg-slate-500',
    buttonText: 'text-white',
    dividerColor: 'border-white/10',
    previewSwatch: 'from-slate-700 to-slate-600',
  },
};
