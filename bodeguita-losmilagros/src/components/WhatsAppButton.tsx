'use client';

import { FiMessageCircle } from 'react-icons/fi';

export default function WhatsAppButton() {
  const numero = '923550243'; // cambia por el número real (sin '+')
  const mensaje = encodeURIComponent('Hola, quiero hacer un pedido desde la web de Los Milagros');

  return (
    <a
      href={`https://wa.me/${numero}?text=${mensaje}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-4 shadow-lg transition-all animate-pulse"
    >
      <FiMessageCircle className="w-6 h-6" />
    </a>
  );
}
