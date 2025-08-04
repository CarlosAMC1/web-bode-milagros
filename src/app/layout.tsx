// app/layout.tsx
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="bg-neutral-50 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}