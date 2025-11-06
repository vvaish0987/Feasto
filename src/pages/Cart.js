import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage(){
  const { items, updateQty, removeItem, total } = useCart();
  const nav = useNavigate();

  return (
    <div style={{maxWidth:900, margin:'12px auto'}}>
      <h2>Your Cart</h2>
      {items.length===0 ? (
        <div className="card">Your cart is empty. <Link to="/">Browse items</Link></div>
      ) : (
        <div style={{display:'grid', gridTemplateColumns:'1fr 320px', gap:12}}>
          <div>
            {items.map(i=> (
              <div className="card" key={i.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
                <div>
                  <div style={{fontWeight:700}}>{i.name}</div>
                  <div className="muted">₹{i.price} • {i.category}</div>
                </div>
                <div style={{display:'flex', gap:8, alignItems:'center'}}>
                  <input type="number" value={i.qty} min={1} style={{width:64}} onChange={e=> updateQty(i.id, Math.max(1, Number(e.target.value)))} />
                  <div style={{fontWeight:700}}>₹{i.price*i.qty}</div>
                  <button className="btn" onClick={()=> removeItem(i.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <aside className="card">
            <h3>Order Summary</h3>
            <div style={{display:'flex', justifyContent:'space-between'}}><div>Subtotal</div><div>₹{total}</div></div>
            <div style={{height:12}} />
            <button className="btn" onClick={()=> nav('/checkout')}>Pay and Proceed</button>
          </aside>
        </div>
      )}
    </div>
  );
}
