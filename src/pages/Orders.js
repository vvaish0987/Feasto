import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOrdersForUser } from '../services/mockApi';

export default function Orders(){
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  if (!document.head.contains(style)) {
    document.head.appendChild(style);
  }

  useEffect(()=>{
    (async ()=>{
      setLoading(true);
      if(user){
        const ord = await getOrdersForUser(user.uid);
        setOrders(ord);
      } else setOrders([]);
      setLoading(false);
    })();
  },[user]);

  return (
    <div style={{background:'#f8f9fa', minHeight:'100vh', paddingBottom:'4rem'}}>
      {/* Header Section with Animation */}
      <div style={{
        background: 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
        padding: '3rem 2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '0 0 30px 30px'
      }}>
        {/* Animated Background Circles */}
        <div style={{position:'absolute', top:'-50px', right:'10%', width:'200px', height:'200px', borderRadius:'50%', background:'rgba(255,255,255,0.1)', animation:'float 6s ease-in-out infinite'}}></div>
        <div style={{position:'absolute', bottom:'-30px', left:'15%', width:'150px', height:'150px', borderRadius:'50%', background:'rgba(255,255,255,0.1)', animation:'float 7s ease-in-out infinite'}}></div>
        <div style={{position:'absolute', top:'50%', left:'5%', width:'100px', height:'100px', borderRadius:'50%', background:'rgba(255,255,255,0.1)', animation:'float 8s ease-in-out infinite'}}></div>

        <div style={{position:'relative', zIndex:1, textAlign:'center'}}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 900,
            fontFamily: 'Montserrat, sans-serif',
            color: '#fff',
            marginBottom: '0.5rem',
            animation: 'fadeInUp 0.6s ease-out',
            textShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <i className="fa-solid fa-clock-rotate-left" style={{marginRight:'0.5rem'}}></i>
            Your Orders
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.9)', 
            fontSize: '1.1rem',
            animation: 'fadeInUp 0.8s ease-out',
            textShadow: '0 1px 5px rgba(0,0,0,0.1)'
          }}>
            Track and review your order history
          </p>
        </div>
      </div>

      <div style={{maxWidth:900, margin:'0 auto', padding:'0 2rem'}}>
        {!user && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid rgba(255, 184, 0, 0.2)',
            borderRadius: 20,
            padding: '2rem',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(255, 184, 0, 0.1)'
          }}>
            <i className="fa-solid fa-user-lock" style={{fontSize:'3rem', color:'#FFB800', marginBottom:'1rem', display:'block'}}></i>
            <p style={{fontSize:'1.1rem', color:'#0D0D0D'}}>
              Please <a href="/auth" style={{color:'var(--primary-color)', fontWeight:600, textDecoration:'none'}}>
                <i className="fa-solid fa-right-to-bracket" style={{marginRight:'0.3rem'}}></i>
                login
              </a> to see your orders.
            </p>
          </div>
        )}
        
        {user && orders.length===0 && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid rgba(255, 184, 0, 0.2)',
            borderRadius: 20,
            padding: '3rem',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(255, 184, 0, 0.1)'
          }}>
            <i className="fa-solid fa-box-open" style={{fontSize:'4rem', color:'#FFB800', marginBottom:'1rem', display:'block'}}></i>
            <h3 style={{color:'#0D0D0D', marginBottom:'0.5rem'}}>No orders yet</h3>
            <p style={{color:'rgba(13, 13, 13, 0.6)'}}>Start shopping to see your orders here</p>
          </div>
        )}
        
        {orders.map(o=> (
          <div 
            key={o.id} 
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid rgba(255, 184, 0, 0.2)',
              borderRadius: 20,
              padding: '1.5rem',
              marginBottom: '1rem',
              boxShadow: '0 4px 16px rgba(255, 184, 0, 0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 184, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 184, 0, 0.1)';
            }}
          >
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1rem', alignItems:'center'}}>
              <div>
                <strong style={{color:'var(--primary-color)', fontSize:'1.1rem'}}>
                  <i className="fa-solid fa-hashtag"></i>
                  {o.id}
                </strong>
                <span style={{color:'rgba(13, 13, 13, 0.6)', marginLeft:'1rem'}}>
                  <i className="fa-solid fa-calendar" style={{marginRight:'0.3rem'}}></i>
                  {new Date(o.date).toLocaleString()}
                </span>
              </div>
              <div style={{
                padding:'0.4rem 1rem',
                borderRadius:'20px',
                fontWeight:600,
                fontSize:'0.9rem',
                background: o.delivered ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 184, 0, 0.2)',
                color: o.delivered ? '#10B981' : '#FF8C00',
                border: o.delivered ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255, 184, 0, 0.4)'
              }}>
                <i className={`fa-solid fa-${o.delivered ? 'circle-check' : 'truck-fast'}`} style={{marginRight:'0.5rem'}}></i>
                {o.delivered ? 'Delivered' : 'In Transit'}
              </div>
            </div>
            
            <div style={{
              background:'rgba(255, 184, 0, 0.05)',
              borderRadius:'12px',
              padding:'1rem',
              marginBottom:'1rem'
            }}>
              {o.items.map(it=> (
                <div key={it.id} style={{
                  display:'flex', 
                  justifyContent:'space-between',
                  padding:'0.5rem 0',
                  borderBottom:'1px solid rgba(255, 184, 0, 0.1)'
                }}>
                  <div style={{color:'#0D0D0D'}}>
                    <i className="fa-solid fa-circle" style={{fontSize:'0.4rem', marginRight:'0.5rem', color:'#FFB800'}}></i>
                    {it.name} × {it.qty}
                  </div>
                  <div style={{fontWeight:600, color:'var(--primary-color)'}}>
                    <i className="fa-solid fa-indian-rupee-sign" style={{fontSize:'0.9rem', marginRight:'0.2rem'}}></i>
                    {it.price*it.qty}
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{
              display:'flex', 
              justifyContent:'space-between',
              paddingTop:'0.5rem',
              borderTop:'2px solid rgba(255, 184, 0, 0.2)'
            }}>
              <span style={{fontWeight:700, fontSize:'1.1rem', color:'#0D0D0D'}}>
                <i className="fa-solid fa-receipt" style={{marginRight:'0.5rem'}}></i>
                Total
              </span>
              <span style={{fontWeight:700, fontSize:'1.2rem', color:'var(--primary-color)'}}>
                <i className="fa-solid fa-indian-rupee-sign" style={{fontSize:'1rem', marginRight:'0.2rem'}}></i>
                {o.total}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
