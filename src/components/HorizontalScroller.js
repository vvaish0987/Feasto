import React from 'react';

export default function HorizontalScroller({ items=[], onSelect, title }){
  return (
    <div style={{marginBottom:18}}>
      {title && <h3>{title}</h3>}
      <div style={{display:'flex', gap:12, overflowX:'auto', paddingBottom:8}}>
        {items.map(it=> (
          <div key={it.id} style={{minWidth:180, borderRadius:8, overflow:'hidden', boxShadow:'0 1px 3px rgba(0,0,0,0.08)'}}>
            <div style={{height:120, backgroundImage:`url(${it.image})`, backgroundSize:'cover', backgroundPosition:'center'}} onClick={()=> onSelect && onSelect(it)} />
            <div style={{padding:8, background:'#fff'}}>
              <div style={{fontWeight:700, fontSize:14}}>{it.name}</div>
              <div className="muted">₹{it.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
