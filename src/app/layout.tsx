// src/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import { Providers } from './Providers';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
