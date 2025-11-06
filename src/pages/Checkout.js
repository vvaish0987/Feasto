import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { checkAvailability, placeOrderForUser } from '../services/mockApi';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Checkout(){
  const { food, grocery, clear } = useCart();
  const { user } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);
  const [missing, setMissing] = useState([]);
  const nav = useNavigate();
  const location = useLocation();

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

  // allow selection via navigation state: { type: 'food'|'grocery' }
  const type = (location.state && location.state.type) || 'food';
  const items = type === 'grocery' ? grocery : food;
  const total = type === 'grocery' ? (grocery.reduce((s,i)=> s + (i.price||0)*(i.qty||0),0)) : (food.reduce((s,i)=> s + (i.price||0)*(i.qty||0),0));

  async function placeOrder(){
    setError('');
    if(!user){ setError('Please login to place an order'); return; }
    if(!items || items.length===0){ setError('Cart is empty'); return; }

    const availability = await checkAvailability(items);
    if(!availability.ok){
      setMissing(availability.missing || []);
      setError('Some items are not available in required quantity. See details below.');
      return;
    }

    const res = await placeOrderForUser(user.uid, user.email, items);
    if(!res.success){ setError(res.message || 'Failed to place order'); return; }
    setSuccess(res.order);
    clear(type);
    // navigate to orders page after a short delay
    setTimeout(()=> nav('/orders'), 1800);
  }

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
            <i className="fa-solid fa-credit-card" style={{marginRight:'0.5rem'}}></i>
            Checkout — {type === 'grocery' ? 'Grocery' : 'Food'}
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.9)', 
            fontSize: '1.1rem',
            animation: 'fadeInUp 0.8s ease-out',
            textShadow: '0 1px 5px rgba(0,0,0,0.1)'
          }}>
            Review and confirm your order
          </p>
        </div>
      </div>

      <div style={{maxWidth:700, margin:'0 auto', padding:'0 2rem'}}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid rgba(255, 184, 0, 0.2)',
          borderRadius: 20,
          padding: '2rem',
          boxShadow: '0 8px 32px rgba(255, 184, 0, 0.1)'
        }}>
          <h4 style={{
            color:'var(--primary-color)', 
            fontFamily:'Montserrat, sans-serif',
            fontSize:'1.5rem',
            marginBottom:'1.5rem'
          }}>
            <i className="fa-solid fa-receipt" style={{marginRight:'0.5rem'}}></i>
            Order Summary
          </h4>
          
          {items.map(i=> {
            const m = (missing || []).find(x=> x.id === i.id);
            return (
              <div key={i.id} style={{
                display:'flex', 
                justifyContent:'space-between', 
                padding:'0.8rem 0',
                borderBottom:'1px solid rgba(255, 184, 0, 0.1)'
              }}>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600, color:'#0D0D0D', marginBottom:'0.3rem'}}>
                    {i.name} × {i.qty}
                  </div>
                  {m && (
                    <div style={{color:'#EF4444', fontSize:13, display:'flex', alignItems:'center', gap:'0.3rem'}}>
                      <i className="fa-solid fa-circle-exclamation"></i>
                      {m.available > 0 ? `Only ${m.available} available` : 'Out of stock'}
                    </div>
                  )}
                </div>
                <div style={{fontWeight:700, color:'var(--primary-color)'}}>
                  <i className="fa-solid fa-indian-rupee-sign" style={{fontSize:'0.9rem', marginRight:'0.2rem'}}></i>
                  {i.price*i.qty}
                </div>
              </div>
            );
          })}
          
          <hr style={{border:'none', height:'1px', background:'rgba(255, 184, 0, 0.3)', margin:'1rem 0'}} />
          
          <div style={{display:'flex', justifyContent:'space-between', fontWeight:700, fontSize:'1.3rem', color:'#0D0D0D'}}>
            <span>Total</span>
            <div style={{color:'var(--primary-color)'}}>
              <i className="fa-solid fa-indian-rupee-sign" style={{fontSize:'1.1rem', marginRight:'0.2rem'}}></i>
              {total}
            </div>
          </div>
          
          <div style={{height:20}} />
          
          {error && (
            <div style={{
              color:'#EF4444',
              background:'rgba(239, 68, 68, 0.1)',
              border:'1px solid rgba(239, 68, 68, 0.3)',
              padding:'1rem',
              borderRadius:'12px',
              marginBottom:'1rem',
              display:'flex',
              alignItems:'center',
              gap:'0.5rem'
            }}>
              <i className="fa-solid fa-circle-exclamation"></i>
              <span>{error}</span>
            </div>
          )}
          
          {missing && missing.length>0 && (
            <div style={{
              marginBottom:'1rem', 
              padding:'1rem', 
              border:'1px solid rgba(239, 68, 68, 0.3)', 
              background:'rgba(239, 68, 68, 0.05)',
              borderRadius:'12px'
            }}>
              <strong style={{display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.5rem'}}>
                <i className="fa-solid fa-triangle-exclamation" style={{color:'#EF4444'}}></i>
                Unavailable items
              </strong>
              <ul style={{margin:'0.5rem 0 0 1.5rem', color:'rgba(13, 13, 13, 0.8)'}}>
                {missing.map(mi=> (
                  <li key={mi.id} style={{marginBottom:'0.3rem'}}>
                    {mi.name} — requested {mi.requested}, available {mi.available}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {success ? (
            <div style={{
              color:'#10B981',
              background:'rgba(16, 185, 129, 0.1)',
              border:'1px solid rgba(16, 185, 129, 0.3)',
              padding:'1rem',
              borderRadius:'12px',
              display:'flex',
              alignItems:'center',
              gap:'0.5rem'
            }}>
              <i className="fa-solid fa-circle-check"></i>
              <span>Order placed successfully! Order ID: {success.id} — Redirecting to orders...</span>
            </div>
          ) : (
            <button 
              style={{
                width: '100%',
                background: (missing && missing.length>0) ? '#ccc' : 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
                color: (missing && missing.length>0) ? '#666' : '#0D0D0D',
                border: 'none',
                padding: '1rem',
                borderRadius: 20,
                fontWeight: 700,
                fontSize: '1.1rem',
                cursor: (missing && missing.length>0) ? 'not-allowed' : 'pointer',
                boxShadow: (missing && missing.length>0) ? 'none' : '0 4px 15px rgba(255, 184, 0, 0.4)',
                transition: 'all 0.3s ease',
                fontFamily: 'Poppins, sans-serif'
              }}
              onClick={placeOrder}
              disabled={missing && missing.length>0}
              onMouseEnter={(e) => {
                if(!(missing && missing.length>0)){
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(255, 184, 0, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if(!(missing && missing.length>0)){
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(255, 184, 0, 0.4)';
                }
              }}
            >
              <i className="fa-solid fa-check-circle" style={{marginRight:'0.5rem'}}></i>
              Place Order (Simulate Payment)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
