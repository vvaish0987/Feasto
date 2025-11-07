import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage(){
  const { food, grocery, updateQty, removeItem, totalFood, totalGrocery } = useCart();
  const nav = useNavigate();
  const [tab, setTab] = useState('food');

  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  if (!document.head.contains(style)) {
    document.head.appendChild(style);
  }

  const items = tab === 'grocery' ? grocery : food;
  const total = tab === 'grocery' ? totalGrocery : totalFood;

  // Styles moved to CSS file or applied directly in JSX

  return (
    <div style={{background:'#f8f9fa', minHeight:'100vh', paddingBottom:'4rem'}}>
      {/* Header Section with Animation */}
      <div style={{
        background: 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
        padding: '3rem 2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '0 0 30px 30px'
      }}>
        {/* Animated Background Circles */}
        <div style={{position:'absolute', top:'-50px', right:'10%', width:'200px', height:'200px', borderRadius:'50%', background:'rgba(255,255,255,0.1)', animation:'float 6s ease-in-out infinite'}}></div>
        <div style={{position:'absolute', bottom:'-30px', left:'15%', width:'150px', height:'150px', borderRadius:'50%', background:'rgba(255,255,255,0.1)', animation:'float 7s ease-in-out infinite'}}></div>
        <div style={{position:'absolute', top:'50%', left:'5%', width:'100px', height:'100px', borderRadius:'50%', background:'rgba(255,255,255,0.1)', animation:'float 8s ease-in-out infinite'}}></div>

        <div style={{position:'relative', zIndex:1, textAlign:'center'}}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 900,
            fontFamily: 'Montserrat, sans-serif',
            color: '#fff',
            marginBottom: '0.5rem',
            animation: 'fadeInUp 0.6s ease-out',
            textShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <i className="fa-solid fa-cart-shopping" style={{marginRight:'0.5rem'}}></i>
            Your Cart
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.9)', 
            fontSize: '1.1rem',
            animation: 'fadeInUp 0.8s ease-out',
            textShadow: '0 1px 5px rgba(0,0,0,0.1)'
          }}>
            Review your items and proceed to checkout
          </p>
        </div>
      </div>

      <div style={{maxWidth:1200, margin:'0 auto', padding:'0 2rem'}}>
        {/* Tab Buttons */}
        <div style={{display:'flex', gap:16, marginBottom:24, justifyContent:'center'}}>
          <button 
            style={{
              background: tab==='food' 
                ? 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)'
                : 'rgba(255, 255, 255, 0.9)',
              color: tab==='food' ? '#0D0D0D' : '#FFB800',
              border: tab==='food' ? 'none' : '2px solid rgba(255, 184, 0, 0.3)',
              padding: '0.8rem 2rem',
              borderRadius: 25,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: tab==='food' ? '0 4px 15px rgba(255, 184, 0, 0.4)' : 'none',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1rem'
            }}
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
            <i className="fa-solid fa-utensils" style={{marginRight:'0.5rem'}}></i>
            Food ({food.length})
          </button>
          <button 
            style={{
              background: tab==='grocery' 
                ? 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)'
                : 'rgba(255, 255, 255, 0.9)',
              color: tab==='grocery' ? '#0D0D0D' : '#FFB800',
              border: tab==='grocery' ? 'none' : '2px solid rgba(255, 184, 0, 0.3)',
              padding: '0.8rem 2rem',
              borderRadius: 25,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: tab==='grocery' ? '0 4px 15px rgba(255, 184, 0, 0.4)' : 'none',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1rem'
            }}
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
            <i className="fa-solid fa-basket-shopping" style={{marginRight:'0.5rem'}}></i>
            Grocery ({grocery.length})
          </button>
        </div>

      {items.length===0 ? (
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid rgba(255, 184, 0, 0.2)',
          borderRadius: 20,
          padding: '3rem',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(255, 184, 0, 0.1)',
          color: '#0D0D0D'
        }}>
          <div style={{fontSize: '4rem', marginBottom: '1rem'}}>
            <i className="fa-solid fa-cart-shopping" style={{color:'#FFB800'}}></i>
          </div>
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
            <i className={`fa-solid fa-${tab === 'food' ? 'utensils' : 'basket-shopping'}`} style={{marginRight:'0.5rem'}}></i>
            Browse {tab === 'food' ? 'Food' : 'Groceries'}
          </Link>
        </div>
      ) : (
        <div style={{display:'grid', gridTemplateColumns:'1fr 350px', gap:32}}>
          <div>
            {items.map((i, idx)=> (
              <div 
                key={i.id} 
                style={{
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
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 184, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 184, 0, 0.1)';
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
                    fontSize: '1.5rem',
                    color: '#fff'
                  }}>
                    <i className={`fa-solid fa-${tab === 'food' ? 'utensils' : 'basket-shopping'}`}></i>
                  </div>
                  <div>
                    <div style={{fontWeight:700, fontSize:'1.1rem', color:'#0D0D0D', marginBottom:'0.3rem'}}>{i.name}</div>
                    <div style={{color:'rgba(13, 13, 13, 0.6)'}}>
                      <i className="fa-solid fa-indian-rupee-sign" style={{fontSize:'0.9rem', marginRight:'0.2rem'}}></i>
                      {i.price} • {i.category}
                    </div>
                  </div>
                </div>
                
                <div style={{display:'flex', gap:12, alignItems:'center'}}>
                  <input 
                    type="number" 
                    value={i.qty} 
                    min={1} 
                    style={{
                      width: 70,
                      padding: '0.5rem',
                      borderRadius: 12,
                      border: '2px solid var(--primary-color)',
                      textAlign: 'center',
                      fontWeight: 600,
                      fontSize: '1rem'
                    }}
                    onChange={e=> updateQty(i.id, Math.max(1, Number(e.target.value)), tab)} 
                  />
                  <div style={{fontWeight:700, fontSize:'1.2rem', color:'var(--primary-color)', minWidth:'80px'}}>
                    <i className="fa-solid fa-indian-rupee-sign" style={{fontSize:'1rem', marginRight:'0.2rem'}}></i>
                    {i.price*i.qty}
                  </div>
                  <button 
                    style={{
                      background: 'transparent',
                      border: '2px solid #EF4444',
                      color: '#EF4444',
                      padding: '0.5rem 1rem',
                      borderRadius: 15,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontSize: '0.9rem'
                    }}
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
                    <i className="fa-solid fa-trash" style={{marginRight:'0.5rem'}}></i>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside style={{
            background: 'rgba(255, 255, 255, 0.95)',
            border: '2px solid var(--primary-color)',
            borderRadius: 20,
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(255, 184, 0, 0.2)',
            position: 'sticky',
            top: 120,
            height: 'fit-content'
          }}>
            <h3 style={{
              color:'var(--primary-color)', 
              fontFamily:'Montserrat, sans-serif',
              fontSize:'1.5rem',
              marginBottom:'1.5rem'
            }}>
              <i className="fa-solid fa-receipt" style={{marginRight:'0.5rem'}}></i>
              Order Summary
            </h3>
            
            <div style={{marginBottom:'1.5rem'}}>
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:'0.5rem', color:'#0D0D0D'}}>
                <span>Items ({items.length})</span>
                <span style={{fontWeight:600}}>
                  <i className="fa-solid fa-indian-rupee-sign" style={{fontSize:'0.9rem', marginRight:'0.2rem'}}></i>
                  {total}
                </span>
              </div>
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:'0.5rem', color:'rgba(13, 13, 13, 0.6)'}}>
                <span>
                  <i className="fa-solid fa-truck" style={{marginRight:'0.5rem'}}></i>
                  Delivery Fee
                </span>
                <span>
                  <i className="fa-solid fa-indian-rupee-sign" style={{fontSize:'0.8rem', marginRight:'0.2rem'}}></i>
                  49
                </span>
              </div>
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:'0.5rem', color:'rgba(13, 13, 13, 0.6)'}}>
                <span>
                  <i className="fa-solid fa-file-invoice" style={{marginRight:'0.5rem'}}></i>
                  Taxes
                </span>
                <span>
                  <i className="fa-solid fa-indian-rupee-sign" style={{fontSize:'0.8rem', marginRight:'0.2rem'}}></i>
                  {Math.round(total * 0.05)}
                </span>
              </div>
              <hr style={{border:'none', height:'1px', background:'rgba(255, 184, 0, 0.3)', margin:'1rem 0'}} />
              <div style={{display:'flex', justifyContent:'space-between', fontSize:'1.2rem', fontWeight:700, color:'#0D0D0D'}}>
                <span>Total</span>
                <span style={{color:'var(--primary-color)'}}>
                  <i className="fa-solid fa-indian-rupee-sign" style={{fontSize:'1rem', marginRight:'0.2rem'}}></i>
                  {total + 49 + Math.round(total * 0.05)}
                </span>
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
              <i className="fa-solid fa-credit-card" style={{marginRight:'0.5rem'}}></i>
              Proceed to Checkout
            </button>
          </aside>
        </div>
      )}
      </div>
    </div>
  );
}
