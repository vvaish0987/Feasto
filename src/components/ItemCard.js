import React from 'react';

export default function ItemCard({ item, onAdd, onBuyNow, type='food' }){
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
          <button className="btn" onClick={()=> onAdd && onAdd(item, 1, type)} disabled={item.stock<=0}>Add</button>
          <button className="btn" onClick={()=> onBuyNow && onBuyNow(item, type)}>Buy now</button>
        </div>
      </div>
    </div>
  );
}
