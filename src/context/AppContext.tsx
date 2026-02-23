'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import initialProducts from '@/productos.json';

export interface Producto {
    id: number;
    nombre: string;
    precio: number;
    categoria: string;
    imagen: string;
    stock: number;
    descuento?: number;
}

export interface User {
    id: string;
    name: string;
    role: 'admin' | 'user';
}

export interface CartItem extends Producto {
    quantity: number;
}

interface AppContextType {
    products: Producto[];
    addProduct: (product: Omit<Producto, 'id'>) => void;
    updateProduct: (product: Producto) => void;
    deleteProduct: (id: number) => void;
    user: User | null;
    login: (credentials: any) => boolean;
    logout: () => void;
    // Cart
    cart: CartItem[];
    addToCart: (product: Producto) => void;
    removeFromCart: (productId: number) => void;
    updateCartQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Producto[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        // Load products from localStorage or initial JSON
        const savedProducts = localStorage.getItem('milagros_products');
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        } else {
            setProducts(initialProducts);
        }

        // Load user session
        const savedUser = localStorage.getItem('milagros_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        // Load cart
        const savedCart = localStorage.getItem('milagros_cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const saveProducts = (newProducts: Producto[]) => {
        setProducts(newProducts);
        localStorage.setItem('milagros_products', JSON.stringify(newProducts));
    };

    const addProduct = (p: Omit<Producto, 'id'>) => {
        const newProduct = { ...p, id: Date.now() };
        saveProducts([...products, newProduct]);
    };

    const updateProduct = (p: Producto) => {
        saveProducts(products.map((item) => (item.id === p.id ? p : item)));
    };

    const deleteProduct = (id: number) => {
        saveProducts(products.filter((p) => p.id !== id));
    };

    const login = (credentials: any) => {
        if (credentials.username === 'admin' && credentials.password === '1234') {
            const newUser: User = { id: '1', name: 'Administrador', role: 'admin' };
            setUser(newUser);
            localStorage.setItem('milagros_user', JSON.stringify(newUser));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('milagros_user');
    };

    // Cart Logic
    const saveCart = (newCart: CartItem[]) => {
        setCart(newCart);
        localStorage.setItem('milagros_cart', JSON.stringify(newCart));
    };

    const addToCart = (product: Producto) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            saveCart(cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            saveCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (id: number) => {
        saveCart(cart.filter(item => item.id !== id));
    };

    const updateCartQuantity = (id: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
        } else {
            saveCart(cart.map(item =>
                item.id === id ? { ...item, quantity } : item
            ));
        }
    };

    const clearCart = () => {
        saveCart([]);
    };

    return (
        <AppContext.Provider value={{
            products, addProduct, updateProduct, deleteProduct,
            user, login, logout,
            cart, addToCart, removeFromCart, updateCartQuantity, clearCart
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
