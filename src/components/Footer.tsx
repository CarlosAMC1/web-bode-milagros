export default function Footer() {
  return (
    <footer className="bg-background text-slate-400 pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-black mb-6 text-white tracking-tighter">
              <span className="premium-gradient bg-clip-text text-transparent">Bodeguita</span> Los Milagros
            </h2>
            <p className="mb-8 max-w-sm text-lg leading-relaxed">
              Tu tienda de confianza en Tacna con los mejores productos desde 1995. Calidad, frescura y el mejor trato para tu familia.
            </p>
            <div className="flex gap-4">
              {['facebook', 'instagram', 'twitter'].map((social) => (
                <a key={social} href="#" className="glass p-3 rounded-xl hover:bg-primary hover:text-white transition-all">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-current opacity-70" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Horario</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex flex-col">
                <span className="text-slate-500 text-xs">Lunes a Viernes</span>
                <span className="text-white">7:00 AM - 10:00 PM</span>
              </li>
              <li className="flex flex-col">
                <span className="text-slate-500 text-xs">Sábados y Domingos</span>
                <span className="text-white">8:00 AM - 9:00 PM</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Contacto</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li className="text-white">+51 923 550 243</li>
              <li className="text-white">hola@bodeguita.com</li>
              <li className="text-white">Sr. de los Milagros Mz D Lt 15, Tacna</li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6">
          <p className="text-xs font-bold tracking-widest text-slate-500">
            © {new Date().getFullYear()} BODEGUITA LOS MILAGROS. ALL RIGHTS RESERVED.
          </p>

          <div className="flex gap-8">
            <a href="#" className="text-xs font-bold tracking-widest text-slate-500 hover:text-white transition-colors">TÉRMINOS</a>
            <a href="#" className="text-xs font-bold tracking-widest text-slate-500 hover:text-white transition-colors">PRIVACIDAD</a>
          </div>
        </div>
      </div>
    </footer>
  );
}