import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import logoIcon from '../assests/icon/icon.png';

export default function Navbar(){
  const { food, grocery } = useCart();
  const { user, logout, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const qtyFood = (food || []).reduce((s,i)=> s + (i.qty||0), 0);
  const qtyGrocery = (grocery || []).reduce((s,i)=> s + (i.qty||0), 0);
  const qty = qtyFood + qtyGrocery;

  useEffect(()=>{
    // ensure we have the latest profile (name) after login
    if(user && !user.name && typeof refreshProfile === 'function'){
      refreshProfile().catch(e=> console.warn('refreshProfile failed', e));
    }
  }, [user?.uid]);

  return (
    <header style={{background:'white', borderBottom:'1px solid #eee'}}>
      <div style={{maxWidth:1200, margin:'0 auto', display:'flex', alignItems:'center', gap:20, padding:'0.75rem'}}>
        <Link to="/" style={{display:'flex', alignItems:'center', gap:12, textDecoration:'none'}}>
          <img src={logoIcon} alt="Feasto" style={{width:100, height:100, borderRadius:8, objectFit:'cover', marginRight:12}} />
        </Link>

        <nav style={{marginLeft:24}}>
          <Link to="/" style={{marginRight:12, color:'#333'}}>Home</Link>
          <Link to="/food" style={{marginRight:12, color:'#333'}}>Food</Link>
          <Link to="/grocery" style={{marginRight:12, color:'#333'}}>Grocery</Link>
          <Link to="/orders" style={{marginRight:12, color:'#333'}}>Orders</Link>
        </nav>

        <div style={{flex:1}} />

        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <div style={{display:'flex', gap:8}}>
            <Link to="/cart" className="btn" style={{display:'inline-flex', alignItems:'center', gap:8}}>Cart ({qty})</Link>
            
          </div>
          {user ? (
            <>
              <Link to="/profile" style={{marginRight:8}} className="muted">{user?.name || user?.email}</Link>
              <button className="btn" onClick={()=>{ logout(); navigate('/auth'); }}>Logout</button>
            </>
          ) : (
            <Link to="/auth" className="btn">Login / Register</Link>
          )}
        </div>
      </div>
    </header>
  );
}
