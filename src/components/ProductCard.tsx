'use client';

import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <div className="glass rounded-[2rem] overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] group-hover:border-white/30">
        {/* Imagen */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/productos/default.png';
            }}
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />

          {/* Etiquetas */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {producto.destacado && (
              <span className="px-3 py-1 bg-amber-500 text-white text-[10px] font-black tracking-widest rounded-full shadow-lg">
                DESTACADO
              </span>
            )}
            {descuento > 0 && (
              <span className="px-3 py-1 bg-red-500 text-white text-[10px] font-black tracking-widest rounded-full shadow-lg">
                -{descuento}%
              </span>
            )}
          </div>

          {/* Acciones Rápidas */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <button className="glass p-3 rounded-xl hover:bg-primary hover:text-white transition-colors">
              <FiHeart size={18} />
            </button>
            <button className="glass p-3 rounded-xl hover:bg-primary hover:text-white transition-colors">
              <FiEye size={18} />
            </button>
          </div>
        </div>

        {/* Detalles */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
              {producto.categoria}
            </span>
            {producto.stock !== undefined && (
              <span className="text-[10px] text-slate-400">
                {producto.stock} DISPONIBLES
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold text-white mb-4 line-clamp-1 group-hover:text-primary transition-colors">
            {producto.nombre}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white">
                S/ {precioFinal.toFixed(2)}
              </span>
              {descuento > 0 && (
                <span className="text-xs text-slate-500 line-through">
                  S/ {producto.precio.toFixed(2)}
                </span>
              )}
            </div>

            <button className="p-4 bg-primary text-white rounded-2xl hover:scale-110 active:scale-95 transition-all shadow-[0_10px_20px_rgba(245,158,11,0.3)]">
              <FiShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
