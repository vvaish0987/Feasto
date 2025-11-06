import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage(){
  const { food, grocery, updateQty, removeItem, totalFood, totalGrocery } = useCart();
  const nav = useNavigate();
  const [tab, setTab] = useState('food');

  const items = tab === 'grocery' ? grocery : food;
  const total = tab === 'grocery' ? totalGrocery : totalFood;

  const headerStyle = {
    padding: '2rem',
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.95)',
    marginBottom: '2rem',
    borderRadius: 20,
    boxShadow: '0 8px 32px rgba(255, 184, 0, 0.1)'
  };

  const tabButtonStyle = (isActive) => ({
    background: isActive 
      ? 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)'
      : 'rgba(255, 255, 255, 0.9)',
    color: isActive ? '#0D0D0D' : '#FFB800',
    border: isActive ? 'none' : '2px solid rgba(255, 184, 0, 0.3)',
    padding: '0.8rem 2rem',
    borderRadius: 25,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: isActive ? '0 4px 15px rgba(255, 184, 0, 0.4)' : 'none',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '1rem'
  });

  const cartItemStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    border: '1px solid rgba(255, 184, 0, 0.2)',
    borderRadius: 20,
    padding: '1.5rem',
    marginBottom: '1rem',
    boxShadow: '0 4px 16px rgba(255, 184, 0, 0.1)',
    transition: 'all 0.3s ease',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const summaryCardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    border: '2px solid var(--primary-color)',
    borderRadius: 20,
    padding: '2rem',
    boxShadow: '0 8px 32px rgba(255, 184, 0, 0.2)',
    position: 'sticky',
    top: 120,
    height: 'fit-content'
  };

  const quantityInputStyle = {
    width: 70,
    padding: '0.5rem',
    borderRadius: 12,
    border: '2px solid var(--primary-color)',
    textAlign: 'center',
    fontWeight: 600,
    fontSize: '1rem'
  };

  const removeButtonStyle = {
    background: 'transparent',
    border: '2px solid #EF4444',
    color: '#EF4444',
    padding: '0.5rem 1rem',
    borderRadius: 15,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '0.9rem'
  };

  const emptyCartStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    border: '1px solid rgba(255, 184, 0, 0.2)',
    borderRadius: 20,
    padding: '3rem',
    textAlign: 'center',
    boxShadow: '0 8px 32px rgba(255, 184, 0, 0.1)',
    color: '#0D0D0D'
  };

  return (
    <div style={{maxWidth:1200, margin:'0 auto', padding:'2rem'}}>
      <div style={headerStyle} className="fade-in">
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 900,
          fontFamily: 'Montserrat, sans-serif',
          color: 'var(--primary-color)',
          marginBottom: '1rem'
        }}>
          🛒 Your Cart
        </h1>
        <p style={{color: 'rgba(13, 13, 13, 0.6)', fontSize: '1.1rem'}}>
          Review your items and proceed to checkout
        </p>
      </div>

      <div style={{display:'flex', gap:16, marginBottom:24, justifyContent:'center'}} className="slide-in-up">
        <button 
          style={tabButtonStyle(tab==='food')} 
          onClick={()=> setTab('food')}
          onMouseEnter={(e) => {
            if(tab !== 'food'){
              e.target.style.background = 'rgba(255, 184, 0, 0.1)';
              e.target.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseLeave={(e) => {
            if(tab !== 'food'){
              e.target.style.background = 'rgba(255, 255, 255, 0.9)';
              e.target.style.transform = 'translateY(0)';
            }
          }}
        >
          🍽️ Food ({food.length})
        </button>
        <button 
          style={tabButtonStyle(tab==='grocery')} 
          onClick={()=> setTab('grocery')}
          onMouseEnter={(e) => {
            if(tab !== 'grocery'){
              e.target.style.background = 'rgba(255, 184, 0, 0.1)';
              e.target.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseLeave={(e) => {
            if(tab !== 'grocery'){
              e.target.style.background = 'rgba(255, 255, 255, 0.9)';
              e.target.style.transform = 'translateY(0)';
            }
          }}
        >
          🛒 Grocery ({grocery.length})
        </button>
      </div>

      {items.length===0 ? (
        <div style={emptyCartStyle} className="zoom-in">
          <div style={{fontSize: '4rem', marginBottom: '1rem'}}>🛒</div>
          <h3 style={{color: '#0D0D0D', marginBottom: '1rem'}}>Your {tab} cart is empty</h3>
          <p style={{color: 'rgba(13, 13, 13, 0.6)', marginBottom: '2rem'}}>
            Discover amazing {tab === 'food' ? 'dishes' : 'products'} and add them to your cart
          </p>
          <Link 
            to={tab === 'food' ? '/food' : '/grocery'}
            style={{
              background: 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
              color: '#0D0D0D',
              padding: '1rem 2rem',
              borderRadius: 25,
              textDecoration: 'none',
              fontWeight: 600,
              display: 'inline-block',
              boxShadow: '0 4px 15px rgba(255, 184, 0, 0.4)',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Browse {tab === 'food' ? 'Food' : 'Groceries'} →
          </Link>
        </div>
      ) : (
        <div style={{display:'grid', gridTemplateColumns:'1fr 350px', gap:32}}>
          <div className="stagger-children">
            {items.map((i, idx)=> (
              <div 
                key={i.id} 
                style={cartItemStyle}
                className={`zoom-in delay-${Math.min(idx + 1, 5)}`}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-4px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(255, 184, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 16px rgba(255, 184, 0, 0.1)';
                }}
              >
                <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
                  <div style={{
                    width: 60,
                    height: 60,
                    borderRadius: 12,
                    background: 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}>
                    {tab === 'food' ? '🍽️' : '🛒'}
                  </div>
                  <div>
                    <div style={{fontWeight:700, fontSize:'1.1rem', color:'#0D0D0D', marginBottom:'0.3rem'}}>{i.name}</div>
                    <div style={{color:'rgba(13, 13, 13, 0.6)'}}>₹{i.price} • {i.category}</div>
                  </div>
                </div>
                
                <div style={{display:'flex', gap:12, alignItems:'center'}}>
                  <input 
                    type="number" 
                    value={i.qty} 
                    min={1} 
                    style={quantityInputStyle}
                    onChange={e=> updateQty(i.id, Math.max(1, Number(e.target.value)), tab)} 
                  />
                  <div style={{fontWeight:700, fontSize:'1.2rem', color:'var(--primary-color)', minWidth:'80px'}}>
                    ₹{i.price*i.qty}
                  </div>
                  <button 
                    style={removeButtonStyle}
                    onClick={()=> removeItem(i.id, tab)}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#EF4444';
                      e.target.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#EF4444';
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside style={summaryCardStyle} className="slide-in-right">
            <h3 style={{
              color:'var(--primary-color)', 
              fontFamily:'Montserrat, sans-serif',
              fontSize:'1.5rem',
              marginBottom:'1.5rem'
            }}>
              Order Summary
            </h3>
            
            <div style={{marginBottom:'1.5rem'}}>
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:'0.5rem', color:'#0D0D0D'}}>
                <span>Items ({items.length})</span>
                <span style={{fontWeight:600}}>₹{total}</span>
              </div>
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:'0.5rem', color:'rgba(13, 13, 13, 0.6)'}}>
                <span>Delivery Fee</span>
                <span>₹49</span>
              </div>
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:'0.5rem', color:'rgba(13, 13, 13, 0.6)'}}>
                <span>Taxes</span>
                <span>₹{Math.round(total * 0.05)}</span>
              </div>
              <hr style={{border:'none', height:'1px', background:'rgba(255, 184, 0, 0.3)', margin:'1rem 0'}} />
              <div style={{display:'flex', justifyContent:'space-between', fontSize:'1.2rem', fontWeight:700, color:'#0D0D0D'}}>
                <span>Total</span>
                <span style={{color:'var(--primary-color)'}}>₹{total + 49 + Math.round(total * 0.05)}</span>
              </div>
            </div>
            
            <button 
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
                color: '#0D0D0D',
                border: 'none',
                padding: '1rem',
                borderRadius: 20,
                fontWeight: 700,
                fontSize: '1.1rem',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(255, 184, 0, 0.4)',
                transition: 'all 0.3s ease',
                fontFamily: 'Poppins, sans-serif'
              }}
              onClick={()=> nav('/checkout', { state: { type: tab } })}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(255, 184, 0, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(255, 184, 0, 0.4)';
              }}
            >
              Proceed to Checkout →
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
