/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */

/**
 * Producto tal como lo expone el backend Topaz (y, como fallback, DummyJSON).
 */
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail: string;
  images: string[];
}

/** Respuesta de lista cuando se consume DummyJSON directamente. */
export interface ProductListResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
