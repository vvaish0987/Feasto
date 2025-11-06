import React from 'react';

export default function ItemCard({ item, onAdd }){
  return (
    <div className="card" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
      <div>
        <div style={{fontWeight:700}}>{item.name}</div>
        <div className="muted">{item.category} • ₹{item.price}</div>
        <div className="muted">Stock: {item.stock}</div>
      </div>
      <div style={{display:'flex', flexDirection:'column', gap:8, alignItems:'flex-end'}}>
        <button className="btn" onClick={()=> onAdd(item)} disabled={item.stock<=0}>Add</button>
      </div>
    </div>
  );
}
