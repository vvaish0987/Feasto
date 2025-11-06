import React, { useEffect, useState } from 'react';
import catalog from '../services/catalogService';
import ItemCard from '../components/ItemCard';
import FilterSortBar from '../components/FilterSortBar';
import { useCart } from '../context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Grocery(){
  const [categories, setCategories] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const [loadingItems, setLoadingItems] = useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const initFilters = (location && location.state && location.state.initialFilters) ? location.state.initialFilters : {};

  useEffect(()=>{(async ()=>{ const cats = await catalog.getCategories('grocery'); setCategories(cats); })();},[]);
  useEffect(()=>{(async ()=>{ setLoadingItems(true); const its = await catalog.getItems('grocery', 'All'); setAllItems(its); setLoadingItems(false); })();},[]);

  function handleAdd(item){ addItem(item,1,'grocery'); }
  function handleBuyNow(item){ addItem(item,1,'grocery'); navigate('/checkout',{ state:{ type:'grocery' } }); }

  const headerStyle = {
    padding: '2.5rem 2rem',
    textAlign: 'center',
    background: 'linear-gradient(135deg, rgba(255, 184, 0, 0.1) 0%, rgba(255, 140, 0, 0.05) 100%)',
    marginBottom: '2rem',
    borderRadius: 20,
    border: '1px solid rgba(255, 184, 0, 0.2)'
  };

  return (
    <div style={{maxWidth:1600, margin:'0 auto', padding:'2rem'}}>
      <div style={headerStyle} className="fade-in">
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          fontFamily: 'Montserrat, sans-serif',
          color: '#0D0D0D',
          marginBottom: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12
        }}>
          <i className="fa-solid fa-basket-shopping" style={{color:'#FFB800'}}></i>
          Grocery & Essentials
        </h1>
        <p style={{color: '#666', fontSize: '1.1rem', margin:0}}>
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
          initialFilters={initFilters}
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
