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
    padding: '1rem 2rem'
  };

  const logoStyle = {
    width: 60,
    height: 60,
    borderRadius: 12,
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
    boxShadow: '0 0 20px rgba(255, 184, 0, 0.3)'
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
        <Link to="/" style={{display:'flex', alignItems:'center', gap:12, textDecoration:'none'}}>
          <img 
            src={logoIcon} 
            alt="Feasto" 
            style={logoStyle}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1) rotate(5deg)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1) rotate(0deg)'}
          />
          <span className="text-gradient" style={{fontSize:'1.5rem', fontWeight:700, fontFamily:'Montserrat, sans-serif'}}>
            FEASTO
          </span>
        </Link>

        <nav style={{marginLeft:40, display:'flex', alignItems:'center'}}>
          <Link to="/" className="hover-underline" style={navLinkStyle}>Home</Link>
          <Link to="/food" className="hover-underline" style={navLinkStyle}>Food</Link>
          <Link to="/grocery" className="hover-underline" style={navLinkStyle}>Grocery</Link>
          <Link to="/orders" className="hover-underline" style={navLinkStyle}>Orders</Link>
        </nav>

        <div style={{flex:1}} />

        <div style={{display:'flex', gap:16, alignItems:'center'}}>
          <Link 
            to="/cart" 
            style={cartBadgeStyle}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(255, 184, 0, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(255, 184, 0, 0.4)';
            }}
          >
            🛒 Cart <span style={cartCountStyle}>{qty}</span>
          </Link>
          
          {user ? (
            <>
              <Link 
                to="/profile" 
                className="hover-underline"
                style={{...navLinkStyle, marginRight: 0, color: '#FFB800'}}
              >
                {user?.name || user?.email}
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
                cursor: 'pointer'
              }}
            >
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
