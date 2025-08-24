import React, { createContext, useContext, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('cart', []);
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const addToCart = (item) => setCart(prev => [...prev, item]);

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const value = useMemo(() => ({
    cart, addToCart, favorites, toggleFavorite
  }), [cart, favorites]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
