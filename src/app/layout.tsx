// src/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head />
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
