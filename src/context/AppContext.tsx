'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import initialProducts from '../data/productos.json';

interface Producto {
    id: number;
    nombre: string;
    precio: number;
    imagen: string;
    categoria: string;
    descuento?: number;
    stock?: number;
    destacado?: boolean;
}

interface User {
    id: string;
    name: string;
    role: 'admin' | 'user';
}

interface AppContextType {
    products: Producto[];
    addProduct: (product: Omit<Producto, 'id'>) => void;
    updateProduct: (product: Producto) => void;
    deleteProduct: (id: number) => void;
    user: User | null;
    login: (credentials: any) => boolean;
    logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Producto[]>([]);
    const [user, setUser] = useState<User | null>(null);

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
        // Demo login: admin / 1234
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

    return (
        <AppContext.Provider value={{
            products, addProduct, updateProduct, deleteProduct,
            user, login, logout
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
