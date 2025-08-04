'use client';

import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export default function HeroBanner() {
  return (
    <section className="relative h-screen min-h-[600px] bg-black overflow-hidden">
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay de gradiente */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 z-0" />

      {/* Contenido principal */}
      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 animate-pulse">
            Bodeguita Los Milagros
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-gray-200">
            Los mejores productos a precios increíbles directamente a tu hogar
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              Ver catálogo
              <FiArrowRight className="animate-pulse" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-black transition-all shadow-md"
            >
              Haz tu pedido
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Flecha animada abajo */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          className="drop-shadow-xl"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
