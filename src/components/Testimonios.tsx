'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiMessageCircle, FiStar } from 'react-icons/fi';

interface Testimonio {
  nombre: string;
  mensaje: string;
  foto: string;
}

export default function Testimonios() {
  const [testimonios, setTestimonios] = useState<Testimonio[]>([
    {
      nombre: "María García",
      mensaje: "Los mejores productos de Tacna. Siempre frescos y a buen precio.",
      foto: "/clientes/1.jpg"
    },
    {
      nombre: "Juan Pérez",
      mensaje: "Excelente atención y entrega rápida. Muy recomendado.",
      foto: "/clientes/2.jpg"
    },
    {
      nombre: "Ana Martínez",
      mensaje: "La calidad de las frutas y verduras es espectacular.",
      foto: "/clientes/3.jpg"
    }
  ]);

  return (
    <section id="testimonios" className="bg-background py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Experiencias</span>
          <h2 className="text-4xl md:text-6xl font-black text-white">
            Lo que dicen <br />
            <span className="premium-gradient bg-clip-text text-transparent">Nuestros Clientes</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonios.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-10 rounded-[2.5rem] relative group"
            >
              <div className="absolute -top-6 left-10 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                <FiMessageCircle className="text-white" />
              </div>

              <div className="flex gap-1 text-amber-500 mb-6">
                {[...Array(5)].map((_, i) => <FiStar key={i} className="fill-current" size={14} />)}
              </div>

              <p className="text-slate-300 italic text-lg mb-8 leading-relaxed">“{t.mensaje}”</p>

              <div className="flex items-center gap-4">
                <img
                  src={t.foto}
                  alt={t.nombre}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + t.nombre;
                  }}
                />
                <h4 className="text-white font-bold tracking-tight">{t.nombre}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
