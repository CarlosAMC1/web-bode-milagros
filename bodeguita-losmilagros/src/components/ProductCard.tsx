'use client';

import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
  descuento?: number;
  stock?: number;
  destacado?: boolean;
}

export default function ProductCard({ producto }: { producto: Producto }) {
  const descuento = producto.descuento || 0;
  const precioFinal = producto.precio * (1 - descuento / 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all border border-gray-100 group"
    >
      {/* Imagen + etiquetas */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/productos/default.png';
          }}
        />

        {/* Etiquetas: destacado y descuento */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2 z-10">
          {producto.destacado && (
            <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full font-bold drop-shadow-sm">
              DESTACADO
            </span>
          )}
          {descuento > 0 && (
            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold drop-shadow-sm">
              -{descuento}% OFF
            </span>
          )}
        </div>

        {/* Botón corazón flotante */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
            <FiHeart className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Detalles */}
      <div className="p-4">
        <span className="text-xs text-gray-500 uppercase font-semibold">
          {producto.categoria}
        </span>

        <h3 className="font-semibold text-gray-900 mt-1 text-base line-clamp-2 h-12">
          {producto.nombre}
        </h3>

        {/* Precio y stock */}
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-lg font-bold text-emerald-600">
              S/ {precioFinal.toFixed(2)}
            </span>
            {descuento > 0 && (
              <span className="text-sm text-gray-400 line-through ml-2">
                S/ {producto.precio.toFixed(2)}
              </span>
            )}
          </div>

          {producto.stock !== undefined && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
              {producto.stock} en stock
            </span>
          )}
        </div>

        {/* Botón de añadir */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-full mt-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-lg flex items-center justify-center gap-2 font-medium transition-all shadow-md hover:shadow-lg"
        >
          <FiShoppingCart />
          Añadir al carrito
        </motion.button>
      </div>
    </motion.div>
  );
}
