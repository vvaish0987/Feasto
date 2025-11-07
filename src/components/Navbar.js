import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import logoIcon from '../assests/icon/icon.png';
import '../animations.css';

export default function Navbar(){
  const { food, grocery } = useCart();
  const { user, logout, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [prevQty, setPrevQty] = useState(0);
  const [bounceCart, setBounceCart] = useState(false);

  const qtyFood = (food || []).reduce((s,i)=> s + (i.qty||0), 0);
  const qtyGrocery = (grocery || []).reduce((s,i)=> s + (i.qty||0), 0);
  const qty = qtyFood + qtyGrocery;

  useEffect(()=>{
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(()=>{
    if(qty > prevQty){
      setBounceCart(true);
      setTimeout(() => setBounceCart(false), 400);
    }
    setPrevQty(qty);
  }, [qty]);

  useEffect(()=>{
    if(user && !user.name && typeof refreshProfile === 'function'){
      refreshProfile().catch(e=> console.warn('refreshProfile failed', e));
    }
  }, [user?.uid]);

  const navbarStyle = {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    background: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px) saturate(180%)',
    borderBottom: '1px solid rgba(255, 184, 0, 0.2)',
    boxShadow: scrolled ? '0 4px 30px rgba(255, 184, 0, 0.15)' : '0 2px 10px rgba(255, 184, 0, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const containerStyle = {
    maxWidth: 1400,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    padding: '0.6rem 1.5rem'
  };

  const logoStyle = {
    width: 48,
    height: 48,
    borderRadius: 10,
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
    boxShadow: '0 6px 18px rgba(255, 184, 0, 0.15)'
  };

  const navLinkStyle = {
    marginRight: 24,
    color: '#0D0D0D',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 500,
    position: 'relative',
    transition: 'color 0.3s ease',
    fontFamily: 'Poppins, sans-serif'
  };

  const cartBadgeStyle = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    background: 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
    color: '#0D0D0D',
    padding: '0.6rem 1.2rem',
    borderRadius: 25,
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(255, 184, 0, 0.4)',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.95rem'
  };

  const cartCountStyle = {
    background: '#0D0D0D',
    color: '#FFB800',
    borderRadius: '50%',
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.85rem',
    fontWeight: 700,
    animation: bounceCart ? 'badgeBounce 0.4s ease-out' : 'none'
  };

  return (
    <header style={navbarStyle}>
      <div style={containerStyle}>
        {/* Left: Logo and Nav Links */}
        <div style={{display:'flex', alignItems:'center', gap:32}}>
          <Link to="/" style={{textDecoration:'none', display: 'flex', alignItems: 'center', gap: '0.8rem'}}>
            <div style={{
              fontSize: '1.8rem',
              background: 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
              padding: '0.4rem',
              borderRadius: 10,
              width: 42,
              height: 42,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(255, 184, 0, 0.3)'
            }}>
              <i className="fa-solid fa-utensils" style={{color: '#0D0D0D'}}></i>
            </div>
            <h3 style={{
              fontSize: '1.6rem',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: 'Montserrat, sans-serif',
              margin: 0
            }}>
              FEASTO
            </h3>
          </Link>
          <nav style={{display:'flex', alignItems:'center', gap:24}}>
            <Link to="/food" className="hover-underline" style={{...navLinkStyle, fontWeight:600}}>
              Food
            </Link>
            <Link to="/grocery" className="hover-underline" style={{...navLinkStyle, fontWeight:600}}>
              Groceries
            </Link>
            {user && (
              <Link to="/orders" className="hover-underline" style={{...navLinkStyle, fontWeight:600}}>
                Orders
              </Link>
            )}
          </nav>
        </div>

        {/* Right: User info and actions */}
        <div style={{display:'flex', gap:16, alignItems:'center', marginLeft: 'auto', justifyContent: 'flex-end'}}>
          {user && (
            <Link 
              to="/cart" 
              style={cartBadgeStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 184, 0, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 184, 0, 0.4)';
              }}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <span style={cartCountStyle}>{qty}</span>
            </Link>
          )}
          
          {user ? (
            <>
              <Link to="/profile" style={{textDecoration:'none'}}>
                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end', gap:2}}>
                  <div style={{fontSize:'0.95rem', fontWeight:700, color:'#0D0D0D'}}>
                    <i className="fa-solid fa-user" style={{marginRight:8, color:'#FFB800'}}></i>
                    {user?.name || user?.email}
                  </div>
                  {user?.location && (
                    <div style={{fontSize:'0.8rem', color:'#666'}}>
                      <i className="fa-solid fa-location-dot" style={{marginRight:6, color:'#FFB800'}}></i>
                      {user.location}
                    </div>
                  )}
                </div>
              </Link>
              <button 
                className="btn" 
                onClick={()=>{ logout(); navigate('/auth'); }}
                style={{
                  background: 'transparent',
                  border: '2px solid #FFB800',
                  color: '#FFB800',
                  padding: '0.5rem 1rem',
                  borderRadius: 20,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#FFB800';
                  e.target.style.color = '#0D0D0D';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#FFB800';
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/auth" 
              className="btn"
              style={{
                background: 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
                color: '#0D0D0D',
                padding: '0.6rem 1.5rem',
                borderRadius: 25,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(255, 184, 0, 0.4)',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <i className="fa-solid fa-right-to-bracket"></i>
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
