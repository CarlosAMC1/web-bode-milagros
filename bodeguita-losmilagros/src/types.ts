// src/types.ts
export interface Producto { // 👈 Nombre en español
  id: number;
  nombre: string; // 👈 Clave exacta
  precio: number;
  imagen: string;
  categoria: string;
  descuento?: number;
  stock?: number;
}

// Tipos para las props de los componentes (opcional)
export interface ProductCardProps {
    producto: Producto;
}

// Tipos para la lista de productos (opcional)
export type ListaProductos = Producto[];