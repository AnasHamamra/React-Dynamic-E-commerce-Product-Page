import React, { useEffect, useMemo, useState } from 'react';
import ProductGallery from '../components/ProductGallery';
import ProductInfo from '../components/ProductInfo';
import ProductOptions from '../components/ProductOptions';
import RelatedProducts from '../components/RelatedProducts';
import AddToCartModal from '../components/AddToCartModal';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { useCart } from '../context/CartContext';


const MOCK_PRODUCTS = [
  {
    id: 1,
    title: 'Smartphone',
    price: '$299',
    description: 'A powerful smartphone with long battery life.',
    images: [
      { src: process.env.PUBLIC_URL + '/assets/imgs/RedSmartphone.jpeg', alt: 'Smartphone1'},
      { src: process.env.PUBLIC_URL + '/assets/imgs/BlueSmartphone.jpeg', alt: 'Smartphone2' },
      { src: process.env.PUBLIC_URL + '/assets/imgs/GreenSmartphone.jpeg', alt: 'Smartphone3' }
    ],
    category: 'Electronics',
  },
  {
    id: 2,
    title: 'T-Shirt',
    price: '$19',
    description: 'Comfortable cotton T-shirt available in all sizes.',
    images: [
      { src: process.env.PUBLIC_URL +'/assets/imgs/RedTshirt.jpeg', alt: 'T-Shirt1' },
      { src: process.env.PUBLIC_URL +'/assets/imgs/BlueTshirt.jpeg', alt: 'T-Shirt2' },
      { src: process.env.PUBLIC_URL +'/assets/imgs/GreenTshirt.jpeg', alt: 'T-Shirt3' }
    ],
    category: 'Clothing',
  },
  {
    id: 3,
    title: 'Laptop',
    price: '$899',
    description: 'Lightweight laptop for work and play.',
    images: [
      { src: process.env.PUBLIC_URL +'/assets/imgs/RedLaptop.jpeg', alt: 'Laptop' },
      { src: process.env.PUBLIC_URL +'/assets/imgs/BlueLaptop.jpeg', alt: 'Laptop' },
      { src: process.env.PUBLIC_URL +'/assets/imgs/GreenLaptop.jpeg', alt: 'Laptop' }
    ],
    category: 'Electronics',
  },
  {
    id: 4,
    title: 'Running Shoes',
    price: '$59',
    description: 'High performance running shoes.',
    images: [
      { src: process.env.PUBLIC_URL +'/assets/imgs/RedShoes.jpeg', alt: 'Running Shoes' },
      { src: process.env.PUBLIC_URL +'/assets/imgs/BlueShoes.jpeg', alt: 'Running Shoes' },
      { src: process.env.PUBLIC_URL +'/assets/imgs/GreenShoes.jpeg', alt: 'Running Shoes' }
    ],
    category: 'Clothing',
  },
  {
    id: 5,
    title: 'Backpack',
    price: '$30',
    description: 'High performance running shoes.',
    images: [
      { src: process.env.PUBLIC_URL +'/assets/imgs/RedBag.jpeg', alt: 'Backpack' },
      { src: process.env.PUBLIC_URL +'/assets/imgs/BlueBag.jpeg', alt: 'Backpack' },
      { src: process.env.PUBLIC_URL +'/assets/imgs/GreenBag.jpeg', alt: 'Backpack' }
    ],
    category: 'Acssesories',
  }
];

export default function ProductPage() {
  const { addToCart, favorites, toggleFavorite } = useCart();

  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);

  const [imgIndex, setImgIndex] = useState(0);
  const [size, setSize]   = useState(null);
  const [color, setColor] = useState(null);
  const [qty, setQty]     = useState(1);
  const [modalOpen, setModalOpen] = useState(false);


  const fetchProduct = (id = 1) => {
    setLoading(true); setError('');
    setTimeout(() => {
      if (Math.random() < 0.05) {
        setLoading(false);
        setError('Network error: failed to fetch product.');
        return;
      }
      const prod = MOCK_PRODUCTS.find(p => p.id === id) || MOCK_PRODUCTS[0];
      const relatedItems = MOCK_PRODUCTS.filter(p => p.id !== prod.id);
      setProduct(prod);
      setRelated(relatedItems);
      setImgIndex(0);
      setSize(null); setColor(null); setQty(1);
      setLoading(false);
    }, 450);
  };

  useEffect(() => { fetchProduct(1); }, []);

  const canAdd = useMemo(() => !!size && !!color && qty > 0, [size, color, qty]);

  const handleAddToCart = () => {
    if (!canAdd) return;
    addToCart({ id: product.id, title: product.title, price: product.price, size, color, qty });
    setModalOpen(true);
  };

  if (loading) return <Loader />;
  if (error) return <Error message={error} onRetry={() => fetchProduct(product?.id || 1)} />;

  return (
    <>
      <div id="liveRegion" aria-live="polite" className="visually-hidden" />

      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <ProductGallery images={product.images} currentIndex={imgIndex} onSelect={setImgIndex} />
        </div>

        <div className="col-12 col-lg-6">
          <ProductInfo title={product.title} price={product.price} description={product.description} />
          <ProductOptions size={size} color={color} qty={qty} onChangeSize={setSize} onChangeColor={setColor} onChangeQty={setQty} />

          {!canAdd && <div className="text-danger small mt-2">Please select a size and color to add to cart.</div>}

          <div className="d-flex actions-row mt-3">
            <button className="btn btn-dark" onClick={handleAddToCart} disabled={!canAdd} aria-disabled={!canAdd}>
              <i className="fa-solid fa-cart-plus me-2" /> Add to Cart
            </button>
            <button className="btn btn-outline-secondary ms-2" onClick={() => toggleFavorite(product.id)} aria-pressed={favorites.includes(product.id)}>
              <i className={`fa-solid fa-heart ${favorites.includes(product.id) ? 'text-danger' : ''}`} /> Favorite
            </button>
          </div>
        </div>
      </div>

      <RelatedProducts items={related} onSelect={(id) => fetchProduct(id)} />

      <AddToCartModal open={modalOpen} onClose={() => setModalOpen(false)} summary={{ title: product.title, size, color, qty }} />
    </>
  );
}
