import React, { useEffect, useState } from 'react';
import catalog from '../services/catalogService';
import ItemCard from '../components/ItemCard';
import FilterSortBar from '../components/FilterSortBar';
import { useCart } from '../context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Food(){
  const [categories, setCategories] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const [loadingItems, setLoadingItems] = useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const initFilters = (location && location.state && location.state.initialFilters) ? location.state.initialFilters : {};

  useEffect(()=>{(async ()=>{ const cats = await catalog.getCategories('food'); setCategories(cats); })();},[]);
  useEffect(()=>{(async ()=>{ setLoadingItems(true); const its = await catalog.getItems('food', 'All'); setAllItems(its); setLoadingItems(false); })();},[]);

  function handleAdd(item){ addItem(item,1,'food'); }
  function handleBuyNow(item){ addItem(item,1,'food'); navigate('/checkout',{ state:{ type:'food' } }); }

  return (
    <div style={{background:'#f8f9fa', minHeight:'100vh', paddingBottom:'4rem'}}>
      {/* Header Section */}
      <div style={{
        background: 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
        padding: '3rem 2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '0 0 30px 30px'
      }}>
        {/* Animated background circles */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'rgba(0, 0, 0, 0.05)',
          animation: 'float 8s ease-in-out infinite reverse'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '20%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          animation: 'float 7s ease-in-out infinite'
        }}></div>

        <div style={{maxWidth:1400, margin:'0 auto', position: 'relative', zIndex: 1}}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                fontFamily: 'Montserrat, sans-serif',
                color: '#0D0D0D',
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                animation: 'fadeInUp 0.6s ease-out'
              }}>
                <i className="fa-solid fa-utensils"></i>
                Food Delivery
              </h1>
              <p style={{color: '#0D0D0D', fontSize: '1.1rem', margin:0, opacity: 0.9, animation: 'fadeInUp 0.8s ease-out'}}>
                <i className="fa-solid fa-location-dot" style={{marginRight:8}}></i>
                Order from {allItems.length} delicious items
              </p>
            </div>
            
            {/* View Mode Toggle */}
            <div style={{
              background: 'rgba(0,0,0,0.1)',
              borderRadius: 12,
              padding: 4,
              display: 'flex',
              gap: 4,
              animation: 'fadeInUp 1s ease-out'
            }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  background: viewMode === 'grid' ? '#0D0D0D' : 'transparent',
                  color: viewMode === 'grid' ? '#FFB800' : '#0D0D0D',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.3s ease'
                }}
              >
                <i className="fa-solid fa-grip"></i> Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  background: viewMode === 'list' ? '#0D0D0D' : 'transparent',
                  color: viewMode === 'list' ? '#FFB800' : '#0D0D0D',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.3s ease'
                }}
              >
                <i className="fa-solid fa-list"></i> List
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1400, margin:'0 auto', padding:'0 2rem'}}>
        {/* Filter, Sort & Search Bar */}
        {!loadingItems && (
          <FilterSortBar
            items={allItems}
            onFilteredItems={setFilteredItems}
            type="food"
            categories={categories}
            initialFilters={initFilters}
          />
        )}

        {/* Items Grid/List */}
        {loadingItems ? (
          <div style={{display:'flex', justifyContent:'center', padding:'4rem'}}>
            <div className="spinner" />
          </div>
        ) : (
          <>
            {filteredItems.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: viewMode === 'grid' 
                  ? 'repeat(auto-fill, minmax(350px, 1fr))' 
                  : '1fr',
                gap: 20
              }} className="stagger-children">
                {filteredItems.map((i, idx)=> (
                  <div key={i.id} className={`zoom-in delay-${Math.min(idx + 1, 5)}`}>
                    <ItemCard 
                      item={i} 
                      onAdd={(it, qty, t)=> handleAdd(it)} 
                      onBuyNow={(it)=> handleBuyNow(it)} 
                      type="food"
                      viewMode={viewMode}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                textAlign:'center',
                padding:'4rem',
                background:'white',
                borderRadius:16,
                boxShadow:'0 4px 12px rgba(0,0,0,0.05)'
              }}>
                <i className="fa-solid fa-search" style={{fontSize:'4rem', color:'#ddd', marginBottom:'1rem'}}></i>
                <div style={{color:'#666', fontSize:'1.2rem', fontWeight:500}}>
                  {allItems.length === 0 ? 'No food items available' : 'No items match your search and filters'}
                </div>
                <p style={{color:'#999', marginTop:'0.5rem'}}>Try adjusting your filters or search terms</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
