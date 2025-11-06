import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../animations.css';

export default function ItemCard({ item, onAdd, onBuyNow, type='food', viewMode='list' }){
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

  const isGridView = viewMode === 'grid';

  const cardStyle = {
    background: '#fff',
    border: isHovered ? '2px solid #FFB800' : '1px solid #e5e7eb',
    borderRadius: 16,
    padding: isGridView ? '1.25rem' : '1.5rem',
    boxShadow: isHovered 
      ? '0 8px 24px rgba(0,0,0,0.12)'
      : '0 2px 8px rgba(0,0,0,0.04)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    height: '100%',
    display: 'flex',
    flexDirection: isGridView ? 'column' : 'row',
    gap: isGridView ? '1rem' : '1.5rem'
  };

  const imageContainerStyle = {
    width: isGridView ? '100%' : '180px',
    height: isGridView ? '200px' : '180px',
    borderRadius: 12,
    overflow: 'hidden',
    flexShrink: 0,
    background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
    position: 'relative'
  };

  return (
    <div 
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Veg/Non-Veg Indicator */}
      {item.hasOwnProperty('isVeg') && (
        <div style={{
          position: 'absolute',
          top: 12,
          left: 12,
          width: 20,
          height: 20,
          borderRadius: 4,
          border: `2px solid ${item.isVeg ? '#22c55e' : '#ef4444'}`,
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: item.isVeg ? '#22c55e' : '#ef4444'
          }} />
        </div>
      )}

      {/* Stock Badge */}
      {item.stock !== undefined && item.stock === 0 && (
        <div style={{
          position: 'absolute',
          top: 12,
          right: 12,
          background: '#ef4444',
          color: '#fff',
          padding: '4px 12px',
          borderRadius: 6,
          fontSize: '0.75rem',
          fontWeight: 600,
          zIndex: 2,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          Out of Stock
        </div>
      )}

      {/* Product Image */}
      <div style={imageContainerStyle}>
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
            onError={(e) => {
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
          fontSize: '3rem',
          color: '#0D0D0D'
        }}>
          <i className={`fa-solid ${type === 'food' ? 'fa-utensils' : 'fa-basket-shopping'}`}></i>
        </div>

        {/* Offer Badge */}
        {item.offer && item.offer.hasOffer && (
          <div style={{
            position: 'absolute',
            bottom: 8,
            left: 8,
            right: 8,
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: '#fff',
            padding: '6px 10px',
            borderRadius: 8,
            fontSize: '0.75rem',
            fontWeight: 700,
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)'
          }}>
            <i className="fa-solid fa-tag" style={{marginRight: 4}}></i>
            {item.offer.offerText}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minWidth: 0
      }}>
        <div>
          <h3 style={{
            fontWeight: 700,
            fontSize: isGridView ? '1.1rem' : '1.25rem',
            color: '#0D0D0D',
            marginBottom: '0.5rem',
            fontFamily: 'Montserrat, sans-serif',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: isGridView ? 'nowrap' : 'normal'
          }}>{item.name}</h3>
          
          {/* Restaurant/Brand Info */}
          {(item.hotel || item.brand) && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '0.75rem',
              color: '#6b7280',
              fontSize: '0.875rem'
            }}>
              <i className="fa-solid fa-location-dot" style={{color: '#FFB800', fontSize: '0.75rem'}}></i>
              <span>{item.hotel?.name || item.brand}</span>
            </div>
          )}

          {/* Category Badge */}
          <div style={{marginBottom: '0.75rem'}}>
            <span style={{
              background: '#f3f4f6',
              color: '#374151',
              padding: '4px 12px',
              borderRadius: 6,
              fontSize: '0.8rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <i className="fa-solid fa-layer-group" style={{fontSize: '0.7rem'}}></i>
              {item.category}
            </span>
          </div>

          {/* Price Display */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {item.offer && item.offer.hasOffer && item.offer.discountedPrice !== item.price ? (
              <>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#0D0D0D',
                  fontFamily: 'Montserrat, sans-serif'
                }}>
                  ₹{item.offer.discountedPrice}
                </div>
                <div style={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: '#9ca3af',
                  textDecoration: 'line-through'
                }}>
                  ₹{item.offer.originalPrice}
                </div>
                {item.offer.discountType === 'percentage' && (
                  <div style={{
                    background: '#22c55e',
                    color: 'white',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}>
                    {item.offer.discountValue}% OFF
                  </div>
                )}
              </>
            ) : (
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                color: '#0D0D0D',
                fontFamily: 'Montserrat, sans-serif'
              }}>₹{item.price}</div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginTop: 'auto',
          flexDirection: isGridView ? 'column' : 'row'
        }}>
          <button 
            style={{
              flex: 1,
              background: item.stock > 0 ? 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)' : '#e5e7eb',
              color: item.stock > 0 ? '#0D0D0D' : '#9ca3af',
              border: 'none',
              padding: '12px 20px',
              borderRadius: 10,
              fontWeight: 600,
              cursor: item.stock > 0 ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              fontSize: '0.95rem',
              fontFamily: 'Poppins, sans-serif',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: item.stock > 0 ? '0 2px 8px rgba(255, 184, 0, 0.3)' : 'none'
            }}
            onClick={handleAdd} 
            disabled={item.stock <= 0}
            onMouseEnter={(e) => {
              if(item.stock > 0){
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(255, 184, 0, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = item.stock > 0 ? '0 2px 8px rgba(255, 184, 0, 0.3)' : 'none';
            }}
          >
            <i className="fa-solid fa-cart-plus"></i>
            {user ? 'Add to Cart' : 'Login to Add'}
          </button>
          <button 
            style={{
              flex: 1,
              background: '#fff',
              border: '2px solid #FFB800',
              color: '#FFB800',
              padding: '12px 20px',
              borderRadius: 10,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '0.95rem',
              fontFamily: 'Poppins, sans-serif',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onClick={handleBuyNow}
            onMouseEnter={(e) => {
              e.target.style.background = '#FFB800';
              e.target.style.color = '#0D0D0D';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#fff';
              e.target.style.color = '#FFB800';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <i className="fa-solid fa-bolt"></i>
            {user ? 'Buy Now' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
