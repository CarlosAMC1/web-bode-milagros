'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiLock, FiArrowLeft } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useApp();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (login({ username, password })) {
            router.push('/admin');
        } else {
            setError('Credenciales incorrectas (demo: admin / 1234)');
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
            {/* Círculos decorativos */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />

            <Link
                href="/"
                className="absolute top-10 left-10 glass p-3 rounded-xl text-white hover:text-primary transition-colors flex items-center gap-2"
            >
                <FiArrowLeft />
                <span>Volver al inicio</span>
            </Link>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md"
            >
                <div className="glass p-10 rounded-[2.5rem] border-white/20">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-black text-white mb-2">Panel Admin</h1>
                        <p className="text-slate-400">Bodeguita Los Milagros</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold tracking-widest text-slate-400 mb-2 uppercase">Usuario</label>
                            <div className="relative">
                                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-all"
                                    placeholder="admin"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold tracking-widest text-slate-400 mb-2 uppercase">Contraseña</label>
                            <div className="relative">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-400 text-sm text-center font-medium bg-red-400/10 py-3 rounded-xl border border-red-400/20">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full py-5 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            INICIAR SESIÓN
                        </button>
                    </form>
                </div>
            </motion.div>
        </main>
    );
}
