'use client';

import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiShoppingCart, FiPlus, FiMinus, FiShield, FiTruck, FiRefreshCw } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function ProductDetail() {
    const { id } = useParams();
    const router = useRouter();
    const { products, addToCart } = useApp();
    const [quantity, setQuantity] = useState(1);

    const product = products.find(p => p.id === Number(id));

    if (!product) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-10">
                <h1 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter">Producto no encontrado</h1>
                <button onClick={() => router.push('/')} className="glass px-10 py-5 rounded-2xl text-white font-bold hover:bg-primary transition-all">
                    VOLVER AL INICIO
                </button>
            </div>
        );
    }

    const descuento = product.descuento || 0;
    const precioFinal = product.precio * (1 - descuento / 100);

    return (
        <main className="min-h-screen bg-background text-white pt-32 relative overflow-hidden">
            <Navbar />

            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -z-10" />

            <div className="max-w-7xl mx-auto px-6 py-12">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-slate-400 hover:text-white mb-12 transition-colors font-bold tracking-widest text-xs"
                >
                    <FiArrowLeft /> VOLVER
                </button>

                <div className="grid lg:grid-cols-2 gap-20">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative"
                    >
                        <div className="glass p-4 rounded-[4rem] border-white/10 overflow-hidden shadow-2xl">
                            <img
                                src={product.imagen}
                                alt={product.nombre}
                                className="w-full h-full object-cover rounded-[3rem] transition-transform duration-1000 hover:scale-110"
                            />
                        </div>

                        {descuento > 0 && (
                            <div className="absolute top-10 left-10 glass px-6 py-3 rounded-full text-xl font-black text-primary border-primary/20 backdrop-blur-3xl animate-float">
                                -{descuento}% OFF
                            </div>
                        )}
                    </motion.div>

                    {/* Details Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="text-primary font-black tracking-[0.4em] uppercase text-xs mb-4 block">
                            {product.categoria}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
                            {product.nombre}
                        </h1>

                        <div className="flex items-end gap-6 mb-12">
                            <span className="text-6xl font-black text-white tracking-tighter">
                                S/ {precioFinal.toFixed(2)}
                            </span>
                            {descuento > 0 && (
                                <span className="text-2xl text-slate-500 line-through mb-2 font-bold">
                                    S/ {product.precio.toFixed(2)}
                                </span>
                            )}
                        </div>

                        <p className="text-slate-400 text-lg leading-relaxed mb-12 max-w-xl">
                            Nuestros productos son seleccionados bajo los más altos estándares de calidad.
                            Garantizamos frescura y el mejor sabor para el bienestar de tu familia.
                            ¡Disfruta de lo mejor de Tacna en la puerta de tu hogar!
                        </p>

                        {/* Quantity and Cart */}
                        <div className="flex flex-wrap items-center gap-6 mb-16">
                            <div className="glass p-2 rounded-2xl flex items-center gap-6 border-white/10">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:bg-white/10 transition-all text-white"
                                >
                                    <FiMinus />
                                </button>
                                <span className="w-8 text-center text-xl font-black tabular-nums">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:bg-white/10 transition-all text-white"
                                >
                                    <FiPlus />
                                </button>
                            </div>

                            <button
                                onClick={() => {
                                    for (let i = 0; i < quantity; i++) addToCart(product);
                                    router.push('/');
                                }}
                                className="flex-1 min-w-[200px] h-16 bg-primary text-white font-black rounded-2xl flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
                            >
                                <FiShoppingCart size={24} />
                                AÑADIR AL CARRITO
                            </button>
                        </div>

                        {/* Features Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/5 pt-12">
                            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 group">
                                <FiTruck className="text-primary group-hover:animate-bounce" size={24} />
                                <h4 className="font-bold text-sm">Envío Rápido</h4>
                                <p className="text-xs text-slate-500">En menos de 2h en Tacna</p>
                            </div>
                            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 group">
                                <FiShield className="text-primary group-hover:scale-110 transition-transform" size={24} />
                                <h4 className="font-bold text-sm">Garantía Total</h4>
                                <p className="text-xs text-slate-500">100% Calidad Asegurada</p>
                            </div>
                            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 group">
                                <FiRefreshCw className="text-primary group-hover:rotate-180 transition-all duration-700" size={24} />
                                <h4 className="font-bold text-sm">Cambios Fáciles</h4>
                                <p className="text-xs text-slate-500">Sin complicaciones</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
