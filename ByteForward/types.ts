import type { ReactNode } from 'react';

export enum Page {
  Dashboard = 'DASHBOARD',
  AddProduct = 'ADD_PRODUCT',
  Explore = 'EXPLORE',
  Settings = 'SETTINGS',
  Pricing = 'PRICING',
}

export interface Platform {
  id: string;
  name: string;
  icon: ReactNode;
  isLinked: boolean;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  platforms: string[]; // array of platform ids
  category: string;
}

export type SeoSuggestion = {
  title: string;
  description: string;
};

export type ToastType = 'success' | 'error' | 'info';