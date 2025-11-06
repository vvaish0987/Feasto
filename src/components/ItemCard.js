import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../animations.css';

export default function ItemCard({ item, onAdd, onBuyNow, type='food' }){
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  function handleAdd(){
    if(!user){ navigate('/auth'); return; }
    if(onAdd) onAdd(item, 1, type);
  }

  function handleBuyNow(){
    if(!user){ navigate('/auth'); return; }
    if(onBuyNow) onBuyNow(item, type);
  }

  const cardStyle = {
    background: isHovered ? 'rgba(255, 248, 225, 0.98)' : 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: isHovered ? '2px solid var(--primary-color)' : '1px solid rgba(255, 184, 0, 0.2)',
    borderRadius: 20,
    padding: '1.5rem',
    boxShadow: isHovered 
      ? '0 20px 60px rgba(255, 184, 0, 0.25), 0 0 30px rgba(255, 184, 0, 0.4)'
      : '0 8px 32px rgba(255, 184, 0, 0.1)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer'
  };

  const imageStyle = {
    width: 120,
    height: 120,
    borderRadius: 16,
    objectFit: 'cover',
    border: '2px solid rgba(255, 184, 0, 0.3)',
    transition: 'transform 0.4s ease',
    transform: isHovered ? 'scale(1.1) rotate(2deg)' : 'scale(1) rotate(0deg)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)'
  };

  const nameStyle = {
    fontWeight: 700,
    fontSize: '1.2rem',
    color: '#0D0D0D',
    marginBottom: '0.5rem',
    fontFamily: 'Montserrat, sans-serif',
    transition: 'color 0.3s ease'
  };

  const priceStyle = {
    fontSize: '1.4rem',
    fontWeight: 800,
    color: 'var(--primary-color)',
    marginBottom: '0.5rem',
    fontFamily: 'Montserrat, sans-serif'
  };

  const metaStyle = {
    color: 'rgba(13, 13, 13, 0.6)',
    fontSize: '0.9rem',
    marginBottom: '0.3rem'
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
    color: '#0D0D0D',
    border: 'none',
    padding: '0.6rem 1.5rem',
    borderRadius: 25,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(255, 184, 0, 0.4)',
    fontSize: '0.95rem',
    fontFamily: 'Poppins, sans-serif'
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    background: 'transparent',
    border: '2px solid #FFB800',
    color: '#FFB800'
  };

  const stockBadgeStyle = {
    position: 'absolute',
    top: 15,
    right: 15,
    background: item.stock > 0 ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)',
    color: '#fff',
    padding: '0.3rem 0.8rem',
    borderRadius: 20,
    fontSize: '0.8rem',
    fontWeight: 600,
    backdropFilter: 'blur(10px)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
  };

  return (
    <div 
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Shimmer effect overlay */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255, 184, 0, 0.1), transparent)',
          animation: 'shimmer 1.5s ease-in-out',
          pointerEvents: 'none'
        }} />
      )}

      {/* Stock Badge */}
      {item.stock !== undefined && (
        <div style={stockBadgeStyle}>
          {item.stock > 0 ? `${item.stock} in stock` : 'Out of Stock'}
        </div>
      )}

      {/* Veg/Non-Veg Indicator */}
      {item.hasOwnProperty('isVeg') && (
        <div style={{
          position: 'absolute',
          top: 15,
          left: 15,
          width: 24,
          height: 24,
          borderRadius: '50%',
          border: `2px solid ${item.isVeg ? '#22c55e' : '#ef4444'}`,
          background: 'rgba(255, 255, 255, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 'bold',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: item.isVeg ? '#22c55e' : '#ef4444'
          }} />
        </div>
      )}

      <div style={{display:'flex', gap: '1.5rem', alignItems: 'center'}}>
        {/* Product Image */}
        <div style={{
          width: 120,
          height: 120,
          borderRadius: 16,
          overflow: 'hidden',
          border: '3px solid var(--primary-color)',
          transition: 'transform 0.4s ease',
          transform: isHovered ? 'scale(1.1) rotate(2deg)' : 'scale(1) rotate(0deg)',
          boxShadow: isHovered ? '0 12px 30px rgba(255, 184, 0, 0.4)' : '0 8px 20px rgba(255, 184, 0, 0.2)'
        }}>
          {item.image ? (
            <img 
              src={item.image} 
              alt={item.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s ease',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)'
              }}
              onError={(e) => {
                // Fallback to emoji if image fails to load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
            display: item.image ? 'none' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem'
          }}>
            {type === 'food' ? '🍽️' : '🛒'}
          </div>
        </div>

        <div style={{flex: 1}}>
          <div style={nameStyle}>{item.name}</div>
          <div style={priceStyle}>₹{item.price}</div>
          <div style={metaStyle}>
            <span style={{
              background: 'var(--primary-color)',
              color: '#0D0D0D',
              padding: '0.3rem 0.8rem',
              borderRadius: 15,
              fontSize: '0.8rem',
              fontWeight: 600,
              marginRight: '0.5rem'
            }}>
              {item.category}
            </span>
            {item.hasOwnProperty('isVeg') && (
              <span style={{
                background: item.isVeg ? '#22c55e' : '#ef4444',
                color: 'white',
                padding: '0.3rem 0.8rem',
                borderRadius: 15,
                fontSize: '0.8rem',
                fontWeight: 600,
                marginRight: '0.5rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <span style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'white'
                }} />
                {item.isVeg ? 'Veg' : 'Non-Veg'}
              </span>
            )}
          </div>
          {item.hotel && (
            <div style={{...metaStyle, marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <span style={{color: 'var(--primary-color)', fontSize: '1rem'}}>📍</span> 
              <span style={{fontWeight: 500}}>{item.hotel.name}</span>
            </div>
          )}
        </div>

        <div style={{display:'flex', flexDirection:'column', gap: 10}}>
          <button 
            style={buttonStyle}
            onClick={handleAdd} 
            disabled={item.stock<=0}
            onMouseEnter={(e) => {
              if(item.stock > 0){
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(255, 184, 0, 0.6)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(255, 184, 0, 0.4)';
            }}
          >
            {user ? 'Add to Cart' : 'Login to Add'}
          </button>
          <button 
            style={secondaryButtonStyle}
            onClick={handleBuyNow}
            onMouseEnter={(e) => {
              e.target.style.background = '#FFB800';
              e.target.style.color = '#0D0D0D';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#FFB800';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            {user ? 'Buy Now' : 'Login to Buy'}
          </button>
        </div>
      </div>
    </div>
  );
}
