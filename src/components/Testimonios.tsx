'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Testimonio {
  nombre: string;
  mensaje: string;
  foto: string;
}

export default function Testimonios() {
  const [testimonios, setTestimonios] = useState<Testimonio[]>([]);

  useEffect(() => {
    fetch('/testimonios.json')
      .then((res) => res.json())
      .then((data) => setTestimonios(data));
  }, []);

  return (
    <section id="testimonios" className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Lo que dicen nuestros clientes
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonios.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-all"
            >
              <img
                src={t.foto}
                alt={t.nombre}
                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/clientes/default.png';
                }}
              />
              <p className="text-gray-600 italic mb-3">“{t.mensaje}”</p>
              <h4 className="text-emerald-600 font-semibold">{t.nombre}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
