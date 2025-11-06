import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import catalog from '../services/catalogService';
import HorizontalScroller from '../components/HorizontalScroller';
import SearchBar from '../components/SearchBar';
import { useCart } from '../context/CartContext';

export default function Inventory(){
  const [foodFeatured, setFoodFeatured] = useState([]);
  const [grocFeatured, setGrocFeatured] = useState([]);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const { addItem } = useCart();

  useEffect(()=>{
    (async ()=>{
      const f = await catalog.getFeatured('food');
      setFoodFeatured(f || []);
      const g = await catalog.getFeatured('grocery');
      setGrocFeatured(g || []);
    })();
  },[]);

  const heroStyle = {
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '4rem 2rem',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: '4rem'
  };

  const heroTitleStyle = {
    fontSize: '4rem',
    fontWeight: 900,
    fontFamily: 'Montserrat, sans-serif',
    background: 'linear-gradient(135deg, #FFB800 0%, #FF8C00 50%, #FFB800 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '1rem',
    textShadow: '0 0 40px rgba(255, 184, 0, 0.3)',
    animation: 'fadeIn 1s ease-out'
  };

  const heroSubtitleStyle = {
    fontSize: '1.5rem',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '3rem',
    fontFamily: 'Poppins, sans-serif',
    animation: 'slideInUp 1s ease-out'
  };

  const selectorCardStyle = (isFood) => ({
    cursor: 'pointer',
    padding: '2.5rem',
    borderRadius: 24,
    background: 'rgba(26, 26, 26, 0.7)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 184, 0, 0.2)',
    minHeight: 280,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    overflow: 'hidden'
  });

  const iconStyle = {
    fontSize: '4rem',
    marginBottom: '1rem',
    animation: 'float 3s ease-in-out infinite'
  };

  function renderSelector(){
    return (
      <div className="stagger-children" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, maxWidth:1200, margin:'0 auto', padding:'0 2rem'}}>
        <div 
          onClick={()=> setSelected('food')}
          style={selectorCardStyle(true)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 184, 0, 0.3)';
            e.currentTarget.style.border = '1px solid rgba(255, 184, 0, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
            e.currentTarget.style.border = '1px solid rgba(255, 184, 0, 0.2)';
          }}
        >
          <div>
            <div style={iconStyle}>🍽️</div>
            <h2 style={{margin:0, fontSize:'2rem', color:'#fff', fontFamily:'Montserrat, sans-serif'}}>Food Delivery</h2>
            <div style={{marginTop:12, color:'rgba(255, 255, 255, 0.7)', fontSize:'1.1rem'}}>
              Order delicious food from top restaurants
            </div>
          </div>
          <div style={{alignSelf:'flex-end', marginTop:'1.5rem'}}>
            <button 
              className="btn"
              style={{
                background: 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
                color: '#0D0D0D',
                padding: '0.8rem 2rem',
                borderRadius: 25,
                border: 'none',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(255, 184, 0, 0.4)'
              }}
            >
              Explore Food →
            </button>
          </div>
        </div>

        <div 
          onClick={()=> setSelected('grocery')}
          style={selectorCardStyle(false)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 184, 0, 0.3)';
            e.currentTarget.style.border = '1px solid rgba(255, 184, 0, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
            e.currentTarget.style.border = '1px solid rgba(255, 184, 0, 0.2)';
          }}
        >
          <div>
            <div style={iconStyle}>🛒</div>
            <h2 style={{margin:0, fontSize:'2rem', color:'#fff', fontFamily:'Montserrat, sans-serif'}}>Instamart / Grocery</h2>
            <div style={{marginTop:12, color:'rgba(255, 255, 255, 0.7)', fontSize:'1.1rem'}}>
              Instant grocery delivery & daily essentials
            </div>
          </div>
          <div style={{alignSelf:'flex-end', marginTop:'1.5rem'}}>
            <button 
              className="btn"
              style={{
                background: 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
                color: '#0D0D0D',
                padding: '0.8rem 2rem',
                borderRadius: 25,
                border: 'none',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(255, 184, 0, 0.4)'
              }}
            >
              Explore Grocery →
            </button>
          </div>
        </div>
      </div>
    );
  }

  function renderDetails(){
    if(selected==='food'){
      return (
        <section style={{marginTop:40, padding:'0 2rem', maxWidth:1400, margin:'2rem auto'}} className="fade-in">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem'}}>
            <h3 style={{fontSize:'2rem', color:'#fff', fontFamily:'Montserrat, sans-serif'}}>
              <span className="text-gradient">Food Delivery</span>
            </h3>
            <button 
              className="btn"
              onClick={()=> setSelected(null)}
              style={{
                background: 'transparent',
                border: '2px solid #FFB800',
                color: '#FFB800',
                padding: '0.6rem 1.5rem',
                borderRadius: 20,
                fontWeight: 600
              }}
            >
              ← Back
            </button>
          </div>
          <HorizontalScroller items={foodFeatured} onSelect={(it)=> navigate('/food')} title="Popular near you" />
        </section>
      );
    }

    if(selected==='grocery'){
      return (
        <section style={{marginTop:40, padding:'0 2rem', maxWidth:1400, margin:'2rem auto'}} className="fade-in">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem'}}>
            <h3 style={{fontSize:'2rem', color:'#fff', fontFamily:'Montserrat, sans-serif'}}>
              <span className="text-gradient">Groceries & Essentials</span>
            </h3>
            <button 
              className="btn"
              onClick={()=> setSelected(null)}
              style={{
                background: 'transparent',
                border: '2px solid #FFB800',
                color: '#FFB800',
                padding: '0.6rem 1.5rem',
                borderRadius: 20,
                fontWeight: 600
              }}
            >
              ← Back
            </button>
          </div>
          <HorizontalScroller items={grocFeatured} onSelect={(it)=> navigate('/grocery')} title="Essentials" />
        </section>
      );
    }

    return null;
  }

  return (
    <div>
      {/* Hero Section */}
      {!selected && (
        <div style={heroStyle}>
          <h1 style={heroTitleStyle}>Welcome to FEASTO</h1>
          <p style={heroSubtitleStyle}>
            Your favorite food & groceries, delivered instantly
          </p>
          <div style={{maxWidth:700, width:'100%', marginBottom:'3rem'}} className="slide-in-up delay-2">
            <SearchBar onAdd={(it)=> addItem && addItem(it,1,it.source||'food')} onBuyNow={(it)=> navigate((it.source==='grocery'? '/grocery':'/food'))} />
          </div>
        </div>
      )}

      {/* Selector Cards */}
      {!selected && renderSelector()}

      {/* Details view for selected category */}
      {renderDetails()}
    </div>
  );
}
