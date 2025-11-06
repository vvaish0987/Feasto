import React, { useEffect, useState } from 'react';
import catalog from '../services/catalogService';
import ItemCard from '../components/ItemCard';
import SearchBar from '../components/SearchBar';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Grocery(){
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('All');
  const [items, setItems] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [loadingItems, setLoadingItems] = useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();

  useEffect(()=>{(async ()=>{ setLoadingCats(true); const cats = await catalog.getCategories('grocery'); setCategories(cats); setLoadingCats(false); })();},[]);
  useEffect(()=>{(async ()=>{ setLoadingItems(true); const its = await catalog.getItems('grocery', category); setItems(its); setLoadingItems(false); })();},[category]);

  function handleAdd(item){ addItem(item,1,'grocery'); }
  function handleBuyNow(item){ addItem(item,1,'grocery'); navigate('/checkout',{ state:{ type:'grocery' } }); }

  const headerStyle = {
    padding: '3rem 2rem',
    textAlign: 'center',
    background: 'linear-gradient(180deg, rgba(13, 13, 13, 0.9) 0%, rgba(13, 13, 13, 0.7) 100%)',
    marginBottom: '2rem',
    borderRadius: 24
  };

  const categoryBtnStyle = (isActive) => ({
    background: isActive 
      ? 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)'
      : 'rgba(26, 26, 26, 0.7)',
    color: isActive ? '#0D0D0D' : '#FFB800',
    border: isActive ? 'none' : '2px solid rgba(255, 184, 0, 0.3)',
    padding: '0.7rem 1.5rem',
    borderRadius: 25,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: isActive ? '0 4px 15px rgba(255, 184, 0, 0.4)' : 'none',
    backdropFilter: 'blur(10px)',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '0.95rem'
  });

  const sidebarCardStyle = {
    background: 'rgba(26, 26, 26, 0.7)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 184, 0, 0.2)',
    borderRadius: 20,
    padding: '2rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    position: 'sticky',
    top: 100
  };

  return (
    <div style={{maxWidth:1600, margin:'0 auto', padding:'2rem'}}>
      <div style={headerStyle} className="fade-in">
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 900,
          fontFamily: 'Montserrat, sans-serif',
          background: 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '1rem'
        }}>
          🛒 Grocery & Essentials
        </h1>
        <p style={{color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.2rem', marginBottom: '2rem'}}>
          Fresh groceries delivered to your doorstep
        </p>
        <div style={{maxWidth:700, margin:'0 auto'}}>
          <SearchBar initialType="grocery" onAdd={(it)=> handleAdd(it)} onBuyNow={(it)=> handleBuyNow(it)} />
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 350px', gap:32}}>
        <section>
          {/* Category Filters */}
          <div style={{marginBottom:'2rem'}}>
            <h3 style={{
              color:'#FFB800', 
              fontFamily:'Montserrat, sans-serif', 
              fontSize:'1.5rem',
              marginBottom:'1rem'
            }}>
              Categories
            </h3>
            <div style={{display:'flex', gap:12, flexWrap:'wrap'}} className="slide-in-left">
              {loadingCats ? (
                <div className="spinner" />
              ) : (
                categories.map((c, idx)=> (
                  <button 
                    key={c} 
                    style={categoryBtnStyle(c===category)}
                    onClick={()=> setCategory(c)}
                    onMouseEnter={(e) => {
                      if(c !== category){
                        e.target.style.background = 'rgba(255, 184, 0, 0.2)';
                        e.target.style.color = '#FFB800';
                        e.target.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if(c !== category){
                        e.target.style.background = 'rgba(26, 26, 26, 0.7)';
                        e.target.style.color = '#FFB800';
                        e.target.style.transform = 'translateY(0)';
                      }
                    }}
                    className={`delay-${Math.min(idx + 1, 5)}`}
                  >
                    {c}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Items Grid */}
          {loadingItems ? (
            <div style={{display:'flex', justifyContent:'center', padding:'4rem'}}>
              <div className="spinner" />
            </div>
          ) : (
            <div style={{display:'grid', gridTemplateColumns:'1fr', gap:20}} className="stagger-children">
              {items.map((i, idx)=> (
                <div key={i.id} className={`zoom-in delay-${Math.min(idx + 1, 5)}`}>
                  <ItemCard item={i} onAdd={(it, qty, t)=> handleAdd(it)} onBuyNow={(it)=> handleBuyNow(it)} type="grocery" />
                </div>
              ))}
            </div>
          )}

          {items.length === 0 && !loadingItems && (
            <div style={{
              textAlign:'center', 
              padding:'4rem', 
              color:'rgba(255, 255, 255, 0.5)',
              fontSize:'1.2rem'
            }}>
              No items found in this category
            </div>
          )}
        </section>

        {/* Sidebar */}
        <aside className="slide-in-right">
          <div style={sidebarCardStyle}>
            <h3 style={{
              color:'#FFB800', 
              fontFamily:'Montserrat, sans-serif',
              fontSize:'1.3rem',
              marginBottom:'1rem'
            }}>
              📦 Fresh & Safe
            </h3>
            <p style={{color:'rgba(255, 255, 255, 0.7)', lineHeight:1.6, marginBottom:'1.5rem'}}>
              All groceries are carefully packed and delivered fresh to your home. Quality guaranteed!
            </p>
            <div style={{
              background:'rgba(255, 184, 0, 0.1)',
              border:'1px solid rgba(255, 184, 0, 0.3)',
              borderRadius:16,
              padding:'1rem',
              marginTop:'1rem'
            }}>
              <div style={{fontSize:'2rem', marginBottom:'0.5rem'}}>🚚</div>
              <div style={{color:'#FFB800', fontWeight:600, marginBottom:'0.3rem'}}>Fast Delivery</div>
              <div style={{color:'rgba(255, 255, 255, 0.6)', fontSize:'0.9rem'}}>
                Get your essentials within 30 mins
              </div>
            </div>
          </div>

          {/* Daily Essentials Badge */}
          <div style={{
            ...sidebarCardStyle,
            marginTop:'2rem',
            background:'linear-gradient(135deg, rgba(255, 184, 0, 0.1) 0%, rgba(255, 140, 0, 0.1) 100%)',
            border:'2px solid rgba(255, 184, 0, 0.3)'
          }} className="glow-pulse">
            <h3 style={{
              color:'#FFB800', 
              fontFamily:'Montserrat, sans-serif',
              fontSize:'1.2rem',
              marginBottom:'0.5rem'
            }}>
              ⭐ Daily Essentials
            </h3>
            <p style={{color:'rgba(255, 255, 255, 0.7)', fontSize:'0.95rem'}}>
              Stock up on your daily needs with the best prices
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
