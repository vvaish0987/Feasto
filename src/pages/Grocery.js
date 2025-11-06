import React, { useEffect, useState } from 'react';
import catalog from '../services/catalogService';
import ItemCard from '../components/ItemCard';
import FilterSortBar from '../components/FilterSortBar';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Grocery(){
  const [categories, setCategories] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const [loadingItems, setLoadingItems] = useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();

  useEffect(()=>{(async ()=>{ const cats = await catalog.getCategories('grocery'); setCategories(cats); })();},[]);
  useEffect(()=>{(async ()=>{ setLoadingItems(true); const its = await catalog.getItems('grocery', 'All'); setAllItems(its); setLoadingItems(false); })();},[]);

  function handleAdd(item){ addItem(item,1,'grocery'); }
  function handleBuyNow(item){ addItem(item,1,'grocery'); navigate('/checkout',{ state:{ type:'grocery' } }); }

  const headerStyle = {
    padding: '3rem 2rem',
    textAlign: 'center',
    background: 'linear-gradient(180deg, rgba(13, 13, 13, 0.9) 0%, rgba(13, 13, 13, 0.7) 100%)',
    marginBottom: '2rem',
    borderRadius: 24
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
        <p style={{color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.2rem'}}>
          Fresh groceries delivered to your doorstep
        </p>
      </div>

      {/* Filter, Sort & Search Bar */}
      {!loadingItems && (
        <FilterSortBar
          items={allItems}
          onFilteredItems={setFilteredItems}
          type="grocery"
          categories={categories}
        />
      )}

      <div style={{display:'grid', gridTemplateColumns:'1fr', gap:32}}>
        <section>
          {/* Items Grid */}
          {loadingItems ? (
            <div style={{display:'flex', justifyContent:'center', padding:'4rem'}}>
              <div className="spinner" />
            </div>
          ) : (
            <div style={{display:'grid', gridTemplateColumns:'1fr', gap:20}} className="stagger-children">
              {filteredItems.map((i, idx)=> (
                <div key={i.id} className={`zoom-in delay-${Math.min(idx + 1, 5)}`}>
                  <ItemCard item={i} onAdd={(it, qty, t)=> handleAdd(it)} onBuyNow={(it)=> handleBuyNow(it)} type="grocery" />
                </div>
              ))}
            </div>
          )}

          {filteredItems.length === 0 && !loadingItems && (
            <div style={{
              textAlign:'center', 
              padding:'4rem', 
              color:'rgba(0, 0, 0, 0.5)',
              fontSize:'1.2rem'
            }}>
              {allItems.length === 0 ? 'No grocery items available' : 'No items match your search and filters'}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
