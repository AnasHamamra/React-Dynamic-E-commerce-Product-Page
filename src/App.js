import React from 'react';
import Navbar from './components/Navbar';
import ProductPage from './pages/ProductPage';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <CartProvider>
      <a href="#productListing" className="visually-hidden-focusable">Skip to main content</a>
      <Navbar />
      <main id="main" className="container my-4">
        <ProductPage />
      </main>
    </CartProvider>
  );
}
