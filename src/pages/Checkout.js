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
    <div style={{maxWidth:700, margin:'20px auto'}}>
      <h2>Checkout — {type === 'grocery' ? 'Grocery' : 'Food'}</h2>
      <div className="card">
        <h4>Order Summary</h4>
        {items.map(i=> {
          const m = (missing || []).find(x=> x.id === i.id);
          return (
            <div key={i.id} style={{display:'flex', justifyContent:'space-between', padding:'6px 0'}}>
              <div>
                {i.name} x {i.qty}
                {m && (
                  <div style={{color:'crimson', fontSize:13}}>
                    {m.available > 0 ? `Only ${m.available} available` : 'Out of stock'}
                  </div>
                )}
              </div>
              <div>₹{i.price*i.qty}</div>
            </div>
          );
        })}
        <hr />
        <div style={{display:'flex', justifyContent:'space-between', fontWeight:700}}>Total <div>₹{total}</div></div>
        <div style={{height:12}} />
        {error && <div style={{color:'crimson'}}>{error}</div>}
        {missing && missing.length>0 && (
          <div style={{marginTop:8, padding:8, border:'1px solid #ffd6d6', background:'#fff6f6'}}>
            <strong>Unavailable items</strong>
            <ul style={{margin:6}}>
              {missing.map(mi=> (
                <li key={mi.id}>{mi.name} — requested {mi.requested}, available {mi.available}</li>
              ))}
            </ul>
          </div>
        )}
        {success ? (
          <div style={{color:'green'}}>
            Order placed successfully! Order ID: {success.id} — Redirecting to orders...
          </div>
        ) : (
          <div style={{display:'flex', gap:8}}>
            <button className="btn" onClick={placeOrder} disabled={missing && missing.length>0}>Place order (simulate payment)</button>
          </div>
        )}
      </div>
    </div>
  );
}
