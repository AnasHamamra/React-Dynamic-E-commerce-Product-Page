import React from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { favorites } = useCart();

  return (
    <nav className="navbar navbar-light bg-white shadow-sm sticky-top" role="navigation" aria-label="Main navigation">
      <div className="container align-items-center">
        {/* Brand */}
        <a className="navbar-brand fw-bold" href="#" onClick={(e)=>{e.preventDefault(); window.location.reload();}} aria-label="Go to homepage">MyBrand</a>

        

        {/* Action icons always visible */}
        <div className="align-items-center gap-3 ms-auto order-lg-3 d-lg-flex d-none">
          <a href="#" className="icon-link" aria-label="Search"><i className="fa-solid fa-magnifying-glass"></i></a>
          <button className="btn btn-link p-0 icon-link" aria-label="Favorites" data-bs-toggle="offcanvas" data-bs-target="#mobileMenuFavs">
            {favorites?.length == 0 && <i className="fa-regular fa-heart"></i>}
            
            {favorites?.length > 0 && <span className="badge bg-danger ms-1">{favorites.length}</span>}
          </button>
          <a href="#" className="icon-link" aria-label="Sign in"><i className="fa-regular fa-user"></i></a>
          <a href="#" className="icon-link" aria-label="Cart"><i className="fa-solid fa-cart-shopping"></i></a>
        </div>

        {/* Mobile hamburger - appears only small */}
        <button className="navbar-toggler border-0 d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu" aria-label="Open menu">
          <i className="fa-solid fa-bars"></i>
        </button>

        {/* Offcanvas (mobile) - full screen from right */}
        <div className="offcanvas offcanvas-end fullscreen" tabIndex="-1" id="mobileMenu" aria-labelledby="mobileMenuLabel">
          <div className="offcanvas-header justify-content-between">
            <a className="navbar-brand fw-bold text-black" href="#" onClick={(e)=>{e.preventDefault(); window.location.reload();}}>MyBrand</a>
            <div className="d-flex align-items-center gap-3">
              <a href="#" className="icon-link text-white" aria-label="Search"><i className="fa-solid fa-magnifying-glass"  style={{color: 'black'}}></i></a>
              <a href="#" className="icon-link text-white" aria-label="Cart"><i className="fa-solid fa-cart-shopping"  style={{color: 'black'}}></i></a>
            </div>
            <button type="button" className="btn-close btn-close-black" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>

          <div className="offcanvas-body d-flex flex-column">
            <a href="#" className="nav-link fs-5 text-black">Sign In / Register</a>
            <hr className="border-secondary opacity-50" />
            
          </div>
        </div>

        {/* Offcanvas for favorites quick view (optional) */}
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="mobileMenuFavs" aria-labelledby="mobileFavsLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title text-black">Favorites</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
        
        </div>

      </div>
    </nav>
  );
}
