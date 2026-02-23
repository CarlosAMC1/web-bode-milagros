'use client';

import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
import { Producto, useApp } from '../context/AppContext';
import Link from 'next/link';

interface ProductCardProps {
  producto: Producto;
}

export default function ProductCard({ producto }: ProductCardProps) {
  const { addToCart } = useApp();
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
      <div className="glass rounded-[2rem] overflow-hidden transition-all duration-500 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.4)] border-white/10 group-hover:border-white/30">

        {/* Clickable Image Area */}
        <Link href={`/producto/${producto.id}`} className="block relative h-72 overflow-hidden">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/productos/default.png';
            }}
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {descuento > 0 && (
              <span className="glass px-3 py-1 text-primary text-[10px] font-black tracking-widest rounded-full border-primary/20 animate-pulse">
                -{descuento}%
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <button className="glass p-3 rounded-xl hover:bg-primary hover:text-white transition-colors">
              <FiHeart size={18} />
            </button>
            <Link href={`/producto/${producto.id}`} className="glass p-3 rounded-xl hover:bg-primary hover:text-white transition-colors">
              <FiEye size={18} />
            </Link>
          </div>
        </Link>

        {/* Details */}
        <div className="p-8">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">
              {producto.categoria}
            </span>
            <span className={`text-[10px] font-bold ${producto.stock > 0 ? 'text-green-500/70' : 'text-red-500/70'}`}>
              {producto.stock > 0 ? `${producto.stock} EN STOCK` : 'AGOTADO'}
            </span>
          </div>

          <Link href={`/producto/${producto.id}`}>
            <h3 className="text-xl font-bold text-white mb-6 line-clamp-1 group-hover:text-primary transition-colors">
              {producto.nombre}
            </h3>
          </Link>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-3xl font-black text-white tracking-tighter">
                S/ {precioFinal.toFixed(2)}
              </span>
              {descuento > 0 && (
                <span className="text-xs text-slate-500 line-through">
                  S/ {producto.precio.toFixed(2)}
                </span>
              )}
            </div>

            <button
              onClick={() => addToCart(producto)}
              disabled={producto.stock <= 0}
              className={`p-5 bg-primary text-white rounded-2xl hover:scale-110 active:scale-95 transition-all shadow-[0_15px_30px_rgba(245,158,11,0.3)] hover:shadow-primary/50 ${producto.stock <= 0 ? 'opacity-50 cursor-not-allowed group-hover:scale-100' : ''}`}
            >
              <FiShoppingCart size={22} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
