'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useApp } from '../context/AppContext';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { cart, removeFromCart, updateCartQuantity, clearCart } = useApp();

    const total = cart.reduce((acc, item) => acc + (item.precio * item.quantity), 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-background/80 backdrop-blur-2xl z-[101] border-l border-white/10 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <FiShoppingBag className="text-primary" size={24} />
                                <h2 className="text-2xl font-black text-white">Tu Carrito</h2>
                                <span className="glass px-3 py-1 rounded-full text-[10px] font-bold text-slate-400">
                                    {cart.length} ITEMS
                                </span>
                            </div>
                            <button
                                onClick={onClose}
                                className="glass p-3 rounded-xl text-white hover:bg-white/10 transition-all"
                            >
                                <FiX size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 glass rounded-full flex items-center justify-center mb-6 text-slate-600">
                                        <FiShoppingBag size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Carrito vacío</h3>
                                    <p className="text-slate-500 mb-8 max-w-[240px]">Parece que aún no has añadido nada a tu bolsa.</p>
                                    <button
                                        onClick={onClose}
                                        className="px-8 py-4 bg-primary text-white font-black rounded-2xl hover:scale-105 active:scale-95 transition-all"
                                    >
                                        VOLVER A LA TIENDA
                                    </button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <motion.div
                                        layout
                                        key={item.id}
                                        className="glass p-4 rounded-2xl border-white/5 flex gap-4 group hover:border-white/20 transition-all"
                                    >
                                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 glass">
                                            <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover" />
                                        </div>

                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between gap-2">
                                                <h4 className="font-bold text-white line-clamp-1">{item.nombre}</h4>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-slate-600 hover:text-red-400 transition-colors"
                                                >
                                                    <FiTrash2 size={16} />
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center glass rounded-xl px-2 py-1 gap-4">
                                                    <button
                                                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 text-slate-400 hover:text-white"
                                                    >
                                                        <FiMinus size={14} />
                                                    </button>
                                                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 text-slate-400 hover:text-white"
                                                    >
                                                        <FiPlus size={14} />
                                                    </button>
                                                </div>
                                                <span className="font-black text-white">S/ {(item.precio * item.quantity).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-8 glass m-6 rounded-[2rem] border-white/10 space-y-6">
                                <div className="flex justify-between items-center px-2">
                                    <span className="text-slate-400 font-bold text-sm tracking-widest uppercase">Total a pagar</span>
                                    <span className="text-3xl font-black text-white">S/ {total.toFixed(2)}</span>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={clearCart}
                                        className="glass p-5 rounded-2xl text-slate-400 hover:text-red-400 hover:bg-red-400/5 transition-all"
                                    >
                                        <FiTrash2 size={24} />
                                    </button>
                                    <button className="flex-1 bg-primary text-white font-black rounded-2xl py-5 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20">
                                        PROCEDER AL PAGO
                                        <FiArrowRight />
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
