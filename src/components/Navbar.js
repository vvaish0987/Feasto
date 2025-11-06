import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar(){
  const { items } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const qty = items.reduce((s,i)=> s+i.qty,0);

  return (
    <header style={{background:'white', borderBottom:'1px solid #eee'}}>
      <div style={{maxWidth:1100, margin:'0 auto', display:'flex', alignItems:'center', gap:20, padding:'0.75rem'}}>
        <Link to="/" style={{display:'flex', alignItems:'center', gap:12, textDecoration:'none'}}>
          <div style={{width:44, height:44, borderRadius:8, background:'var(--feasto-orange)', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700}}>F</div>
          <div style={{fontWeight:700, color:'var(--feasto-dark)'}}>Feasto</div>
        </Link>

        <nav style={{marginLeft:10}}>
          <Link to="/" style={{marginRight:12, color:'#333'}}>Browse</Link>
          <Link to="/orders" style={{marginRight:12, color:'#333'}}>Orders</Link>
          <Link to="/profile" style={{marginRight:12, color:'#333'}}>Profile</Link>
        </nav>

        <div style={{flex:1}} />

        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <Link to="/cart" className="btn" style={{display:'inline-flex', alignItems:'center', gap:8}}>
            Cart ({qty})
          </Link>
          {user ? (
            <>
              <Link to="/profile" style={{marginRight:8}} className="muted">{user.email}</Link>
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
