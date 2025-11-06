import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOrdersForUser } from '../services/mockApi';

export default function Orders(){
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    (async ()=>{
      setLoading(true);
      if(user){
        const ord = await getOrdersForUser(user.uid);
        setOrders(ord);
      } else setOrders([]);
      setLoading(false);
    })();
  },[user?.uid]);

  return (
    <div style={{maxWidth:900, margin:'16px auto'}}>
      <h2>Your Orders</h2>
      {!user && <div className="card">Please <b>login</b> to see your orders.</div>}
      {user && orders.length===0 && <div className="card">No orders yet</div>}
      {orders.map(o=> (
        <div className="card" key={o.id} style={{marginBottom:10}}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <div><strong>{o.id}</strong> • <span className="muted">{new Date(o.date).toLocaleString()}</span></div>
            <div>{o.delivered ? 'Delivered' : 'In transit'}</div>
          </div>
          <div style={{marginTop:8}}>
            {o.items.map(it=> <div key={it.id} style={{display:'flex', justifyContent:'space-between'}}><div>{it.name} x {it.qty}</div><div>₹{it.price*it.qty}</div></div>)}
          </div>
          <div style={{marginTop:8, fontWeight:700}}>Total: ₹{o.total}</div>
        </div>
      ))}
    </div>
  );
}
