'use client';

import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useRouter } from 'next/navigation';
import {
    FiPlus, FiEdit2, FiTrash2, FiLogOut,
    FiPackage, FiUsers, FiSettings, FiImage, FiSearch
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
    const { products, addProduct, updateProduct, deleteProduct, user, logout } = useApp();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'products' | 'users'>('products');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    if (!user) return null;

    const handleEdit = (product: any) => {
        setCurrentProduct(product);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setCurrentProduct(null);
        setIsModalOpen(true);
    };

    const filteredProducts = products.filter(p =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background text-white flex">
            {/* Sidebar */}
            <aside className="w-72 glass-dark border-r border-white/5 p-8 flex flex-col gap-10">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                        <FiSettings className="text-white" />
                    </div>
                    <div>
                        <h2 className="font-black tracking-tight">ADMIN</h2>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">Management Panel</p>
                    </div>
                </div>

                <nav className="flex flex-col gap-2">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm ${activeTab === 'products' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:bg-white/5'}`}
                    >
                        <FiPackage />
                        <span>Productos</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm ${activeTab === 'users' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:bg-white/5'}`}
                    >
                        <FiUsers />
                        <span>Usuarios</span>
                    </button>
                </nav>

                <div className="mt-auto">
                    <button
                        onClick={logout}
                        className="flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-400 hover:text-red-400 hover:bg-red-400/5 transition-all font-bold text-sm w-full"
                    >
                        <FiLogOut />
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-12 overflow-y-auto max-h-screen">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-black mb-2 animate-float">
                            {activeTab === 'products' ? 'Gestión de Productos' : 'Gestión de Usuarios'}
                        </h1>
                        <p className="text-slate-400 text-sm">Bienvenido de nuevo, {user.name}.</p>
                    </div>

                    <div className="flex gap-4">
                        <div className="relative">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="glass pl-12 pr-4 py-3 rounded-xl w-64 focus:outline-none focus:border-primary/40 border-transparent transition-all"
                            />
                        </div>
                        <button
                            onClick={handleAdd}
                            className="bg-primary hover:bg-primary-dark p-4 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95"
                        >
                            <FiPlus size={20} />
                        </button>
                    </div>
                </header>

                {activeTab === 'products' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredProducts.map(p => (
                            <motion.div
                                layoutId={`card-${p.id}`}
                                key={p.id}
                                className="glass p-6 rounded-3xl border-transparent hover:border-white/10 transition-all flex gap-6 group"
                            >
                                <div className="w-24 h-24 rounded-2xl overflow-hidden glass relative flex-shrink-0">
                                    <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover opacity-80" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                        <FiImage className="text-white" />
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <span className="text-[10px] font-black tracking-widest text-primary uppercase mb-1 block">{p.categoria}</span>
                                    <h3 className="font-bold text-white truncate mb-1">{p.nombre}</h3>
                                    <p className="text-xl font-black text-white">S/ {p.precio.toFixed(2)}</p>

                                    <div className="flex gap-2 mt-4">
                                        <button
                                            onClick={() => handleEdit(p)}
                                            className="p-2 glass rounded-lg hover:text-blue-400 transition-colors"
                                        >
                                            <FiEdit2 size={14} />
                                        </button>
                                        <button
                                            onClick={() => deleteProduct(p.id)}
                                            className="p-2 glass rounded-lg hover:text-red-400 transition-colors"
                                        >
                                            <FiTrash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="glass p-12 rounded-3xl text-center">
                        <FiUsers size={48} className="mx-auto mb-4 text-slate-500" />
                        <h2 className="text-2xl font-bold mb-2">Gestión de Usuarios</h2>
                        <p className="text-slate-400 max-w-sm mx-auto">
                            Actualmente solo existe el usuario administrador principal. La funcionalidad para múltiples usuarios se habilitará en la próxima actualización.
                        </p>
                    </div>
                )}
            </main>

            {/* Modal / Form */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="glass p-12 rounded-[2.5rem] w-full max-w-lg border-white/20"
                        >
                            <h2 className="text-3xl font-black mb-8">
                                {currentProduct ? 'Editar Producto' : 'Añadir Producto'}
                            </h2>

                            <ProductForm
                                product={currentProduct}
                                onClose={() => setIsModalOpen(false)}
                                onSave={(data) => {
                                    if (currentProduct) {
                                        updateProduct({ ...data, id: currentProduct.id });
                                    } else {
                                        addProduct(data);
                                    }
                                    setIsModalOpen(false);
                                }}
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ProductForm({ product, onClose, onSave }: any) {
    const [formData, setFormData] = useState({
        nombre: product?.nombre || '',
        precio: product?.precio || 0,
        categoria: product?.categoria || 'Abarrotes',
        imagen: product?.imagen || '/productos/default.png',
        stock: product?.stock || 0
    });

    return (
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
            <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                    <label className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2 block">Nombre</label>
                    <input
                        className="glass w-full px-4 py-3 rounded-xl"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <label className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2 block">Precio (S/)</label>
                    <input
                        type="number" step="0.01"
                        className="glass w-full px-4 py-3 rounded-xl"
                        value={formData.precio}
                        onChange={(e) => setFormData({ ...formData, precio: parseFloat(e.target.value) })}
                        required
                    />
                </div>

                <div>
                    <label className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2 block">Stock</label>
                    <input
                        type="number"
                        className="glass w-full px-4 py-3 rounded-xl"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                        required
                    />
                </div>

                <div className="col-span-2">
                    <label className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2 block">Imagen URL</label>
                    <input
                        className="glass w-full px-4 py-3 rounded-xl"
                        value={formData.imagen}
                        onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                        placeholder="/productos/cafe.jpg"
                    />
                </div>
            </div>

            <div className="flex gap-4 mt-10">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-4 glass hover:bg-white/10 transition-colors font-bold rounded-2xl"
                >
                    CANCELAR
                </button>
                <button
                    type="submit"
                    className="flex-1 py-4 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                    {product ? 'GUARDAR' : 'CREAR'}
                </button>
            </div>
        </form>
    );
}
