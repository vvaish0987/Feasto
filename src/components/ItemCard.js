import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ItemCard({ item, onAdd, onBuyNow, type='food' }){
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleAdd(){
    if(!user){ navigate('/auth'); return; }
    if(onAdd) onAdd(item, 1, type);
  }

  function handleBuyNow(){
    if(!user){ navigate('/auth'); return; }
    if(onBuyNow) onBuyNow(item, type);
  }

  return (
    <div className="card" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
      <div style={{maxWidth: '65%'}}>
        <div style={{fontWeight:700}}>{item.name}</div>
        <div className="muted">{item.category} • ₹{item.price}</div>
        {item.stock !== undefined && <div className="muted">Stock: {item.stock}</div>}
        {item.hotel && <div className="muted">From: {item.hotel.name} • {item.hotel.address}</div>}
      </div>
      <div style={{display:'flex', flexDirection:'column', gap:8, alignItems:'flex-end'}}>
        <div style={{display:'flex', gap:8}}>
          <button className="btn" onClick={handleAdd} disabled={item.stock<=0}>{user ? 'Add' : 'Login to add'}</button>
          <button className="btn" onClick={handleBuyNow}>{user ? 'Buy now' : 'Login to buy'}</button>
        </div>
      </div>
    </div>
  );
}
