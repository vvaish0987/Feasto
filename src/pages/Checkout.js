import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { checkAvailability, placeOrderForUser } from '../services/mockApi';
import { useNavigate } from 'react-router-dom';

export default function Checkout(){
  const { items, clear, total } = useCart();
  const { user } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);
  const nav = useNavigate();

  async function placeOrder(){
    setError('');
  if(!user){ setError('Please login to place an order'); return; }
    if(items.length===0){ setError('Cart is empty'); return; }

    const availability = await checkAvailability(items);
    if(!availability.ok){
      setError('Some items are not available in required quantity.');
      return;
    }

  const res = await placeOrderForUser(user.uid, user.email, items);
    if(!res.success){ setError(res.message || 'Failed to place order'); return; }
    setSuccess(res.order);
    clear();
    // navigate to orders page after a short delay
    setTimeout(()=> nav('/orders'), 1800);
  }

  return (
    <div style={{maxWidth:700, margin:'20px auto'}}>
      <h2>Checkout</h2>
      <div className="card">
        <h4>Order Summary</h4>
        {items.map(i=> (
          <div key={i.id} style={{display:'flex', justifyContent:'space-between', padding:'6px 0'}}>
            <div>{i.name} x {i.qty}</div>
            <div>₹{i.price*i.qty}</div>
          </div>
        ))}
        <hr />
        <div style={{display:'flex', justifyContent:'space-between', fontWeight:700}}>Total <div>₹{total}</div></div>
        <div style={{height:12}} />
        {error && <div style={{color:'crimson'}}>{error}</div>}
        {success ? (
          <div style={{color:'green'}}>
            Order placed successfully! Order ID: {success.id} — Redirecting to orders...
          </div>
        ) : (
          <div style={{display:'flex', gap:8}}>
            <button className="btn" onClick={placeOrder}>Place order (simulate payment)</button>
          </div>
        )}
      </div>
    </div>
  );
}
