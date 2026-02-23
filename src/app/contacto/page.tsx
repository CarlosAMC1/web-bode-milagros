'use client';

import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Contacto() {
  return (
    <main className="min-h-screen bg-background text-white relative overflow-hidden">
      <Navbar />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -z-10" />

      <section className="max-w-7xl mx-auto px-6 pt-40 pb-24">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Hablemos</span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              ¿Tienes alguna <br />
              <span className="premium-gradient bg-clip-text text-transparent text-glow">Consulta?</span>
            </h1>
            <p className="text-slate-400 text-lg mb-12 max-w-md">
              Estamos aquí para ayudarte. Escríbenos y nuestro equipo te responderá en menos de 24 horas.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <FiMail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-500 text-xs uppercase tracking-widest mb-1">Email</h4>
                  <p className="font-medium">hola@bodeguita.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <FiPhone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-500 text-xs uppercase tracking-widest mb-1">Teléfono</h4>
                  <p className="font-medium">+51 923 550 243</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <FiMapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-500 text-xs uppercase tracking-widest mb-1">Ubicación</h4>
                  <p className="font-medium">Sr. de los Milagros Mz D Lt 15, Tacna</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass p-12 rounded-[3rem] border-white/10"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Nombre</label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary/50 transition-all text-white placeholder:text-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Email</label>
                  <input
                    type="email"
                    placeholder="email@ejemplo.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary/50 transition-all text-white placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Asunto</label>
                <input
                  type="text"
                  placeholder="¿En qué podemos ayudarte?"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary/50 transition-all text-white placeholder:text-slate-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Mensaje</label>
                <textarea
                  rows={4}
                  placeholder="Escribe tu mensaje aquí..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary/50 transition-all text-white placeholder:text-slate-600 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_40px_rgba(245,158,11,0.2)]"
              >
                ENVIAR MENSAJE
                <FiSend />
              </button>
            </form>
          </motion.div>

        </div>
      </section>

      <Footer />
    </main>
  );
}