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
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showItems, setShowItems] = useState(false); // New: control items display
  const [selectedCategory, setSelectedCategory] = useState('all'); // Track selected category

  const [loadingItems, setLoadingItems] = useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const initFilters = (location && location.state && location.state.initialFilters) ? location.state.initialFilters : {};

  useEffect(()=>{(async ()=>{ const cats = await catalog.getCategories('grocery'); setCategories(cats); })();},[]);
  useEffect(()=>{
    (async ()=>{ 
      setLoadingItems(true); 
      const its = await catalog.getItems('grocery', 'All'); 
      setAllItems(its); 
      setLoadingItems(false); 
      
      // Auto-show items if filters are passed from home page
      if(initFilters && Object.keys(initFilters).length > 0){
        setShowItems(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  function handleAdd(item){ addItem(item,1,'grocery'); }
  function handleBuyNow(item){ addItem(item,1,'grocery'); navigate('/checkout',{ state:{ type:'grocery' } }); }

  function handleCategoryClick(category){
    // Convert "All" to "all" for consistency with FilterSortBar
    const normalizedCategory = category === 'All' ? 'all' : category;
    setSelectedCategory(normalizedCategory);
    setShowItems(true);
  }

  function handleBrowseAll(){
    setSelectedCategory('all');
    setShowItems(true);
  }

  function handleBackToCategories(){
    setShowItems(false);
    setSelectedCategory('all');
  }

  const categoryImages = {
    'Vegetables': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop',
    'Fruits': 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&auto=format&fit=crop',
    'Dairy': 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&auto=format&fit=crop',
    'Bakery': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop',
    'Snacks': 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&auto=format&fit=crop',
    'Beverages': 'https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=400&auto=format&fit=crop',
    'Personal Care': 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&auto=format&fit=crop',
    'Household': 'https://images.unsplash.com/photo-1585504198199-20277593b94f?w=400&auto=format&fit=crop'
  };

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
                <i className="fa-solid fa-basket-shopping"></i>
                Grocery & Essentials
              </h1>
              <p style={{color: '#0D0D0D', fontSize: '1.1rem', margin:0, opacity: 0.9, animation: 'fadeInUp 0.8s ease-out'}}>
                <i className="fa-solid fa-location-dot" style={{marginRight:8}}></i>
                {showItems ? `Showing ${filteredItems.length} items` : `Explore ${categories.length} categories`}
              </p>
            </div>
            
            {/* View Mode Toggle - Only show when items are displayed */}
            {showItems && (
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
            )}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1400, margin:'0 auto', padding:'0 2rem'}}>
        {/* Search/Sort Button or Back Button */}
        {!loadingItems && (
          <div style={{marginBottom: '2rem'}}>
            {showItems ? (
              <button
                onClick={handleBackToCategories}
                style={{
                  background: 'white',
                  border: '2px solid #FFB800',
                  color: '#FFB800',
                  padding: '0.8rem 1.5rem',
                  borderRadius: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '1rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#FFB800';
                  e.target.style.color = '#0D0D0D';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.color = '#FFB800';
                }}
              >
                <i className="fa-solid fa-arrow-left" style={{marginRight: 8}}></i>
                Back to Categories
              </button>
            ) : (
              <button
                onClick={handleBrowseAll}
                style={{
                  background: 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
                  color: '#0D0D0D',
                  padding: '1rem 2rem',
                  borderRadius: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '1rem',
                  border: 'none',
                  boxShadow: '0 4px 15px rgba(255, 184, 0, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(255, 184, 0, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(255, 184, 0, 0.4)';
                }}
              >
                <i className="fa-solid fa-filter"></i>
                Search / Sort Items
              </button>
            )}
          </div>
        )}

        {/* Categories - Show when items are NOT displayed */}
        {!showItems && !loadingItems && categories.length > 0 && (
          <section>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 800,
              fontFamily: 'Montserrat, sans-serif',
              color: '#0D0D0D',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}>
              <i className="fa-solid fa-layer-group" style={{color: '#FFB800'}}></i>
              Browse by Category
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: 20
            }}>
              {categories.map((cat, idx) => (
                <div
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  style={{
                    cursor: 'pointer',
                    borderRadius: 16,
                    overflow: 'hidden',
                    background: 'white',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(0,0,0,0.06)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                  }}
                >
                  <div style={{
                    height: 180,
                    backgroundImage: `url(${categoryImages[cat] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '1.5rem',
                      background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.85) 100%)'
                    }}>
                      <div style={{
                        color: 'white',
                        fontSize: '1.3rem',
                        fontWeight: 800,
                        fontFamily: 'Montserrat, sans-serif'
                      }}>
                        {cat}
                      </div>
                    </div>
                  </div>
                  <div style={{
                    padding: '1rem',
                    background: 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
                    color: '#0D0D0D',
                    textAlign: 'center',
                    fontWeight: 700
                  }}>
                    <i className="fa-solid fa-arrow-right" style={{marginRight: 8}}></i>
                    Explore {cat}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
              {/* Filter, Sort & Items - Show when items ARE displayed */}
        {showItems && !loadingItems && (
          <>
            <FilterSortBar
              key={selectedCategory}
              items={allItems}
              onFilteredItems={setFilteredItems}
              type="grocery"
              categories={categories}
              initialFilters={{
                ...initFilters,
                category: selectedCategory
              }}
            />

            {/* Items Grid/List */}
            {filteredItems.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: viewMode === 'grid' 
                  ? 'repeat(auto-fill, minmax(350px, 1fr))' 
                  : '1fr',
                gap: 20,
                marginTop: '2rem'
              }} className="stagger-children">
                {filteredItems.map((i, idx)=> (
                  <div key={i.id} className={`zoom-in delay-${Math.min(idx + 1, 5)}`}>
                    <ItemCard 
                      item={i} 
                      onAdd={(it, qty, t)=> handleAdd(it)} 
                      onBuyNow={(it)=> handleBuyNow(it)} 
                      type="grocery"
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
                boxShadow:'0 4px 12px rgba(0,0,0,0.05)',
                marginTop: '2rem'
              }}>
                <i className="fa-solid fa-search" style={{fontSize:'4rem', color:'#ddd', marginBottom:'1rem'}}></i>
                <div style={{color:'#666', fontSize:'1.2rem', fontWeight:500}}>
                  No items match your search and filters
                </div>
                <p style={{color:'#999', marginTop:'0.5rem'}}>Try adjusting your filters or search terms</p>
              </div>
            )}
          </>
        )}

        {/* Loading State */}
        {loadingItems && (
          <div style={{display:'flex', justifyContent:'center', padding:'4rem'}}>
            <div className="spinner" />
          </div>
        )}
      </div>
    </div>
  );
}
