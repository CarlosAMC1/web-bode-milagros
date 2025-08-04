import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Contacto() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-amber-900">
          Contáctanos
        </h1>
        <form className="max-w-md mx-auto">
          <input 
            type="text" 
            placeholder="Nombre" 
            className="w-full p-3 mb-4 border rounded"
          />
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 mb-4 border rounded"
          />
          <textarea 
            placeholder="Mensaje" 
            rows={5}
            className="w-full p-3 mb-4 border rounded"
          ></textarea>
          <button 
            type="submit" 
            className="bg-amber-600 text-white px-6 py-3 rounded w-full hover:bg-amber-700"
          >
            Enviar
          </button>
        </form>
      </section>
      <Footer />
    </div>
  );
}