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
  const [showItems, setShowItems] = useState(false); // New: control items display
  const [restaurants, setRestaurants] = useState([]); // New: list of restaurants
  const [selectedCategory, setSelectedCategory] = useState('all'); // Track selected category
  const [selectedRestaurant, setSelectedRestaurant] = useState('all'); // Track selected restaurant

  const [loadingItems, setLoadingItems] = useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const initFilters = (location && location.state && location.state.initialFilters) ? location.state.initialFilters : {};

  useEffect(()=>{(async ()=>{ const cats = await catalog.getCategories('food'); setCategories(cats); })();},[]);
  useEffect(()=>{
    (async ()=>{ 
      setLoadingItems(true); 
      const its = await catalog.getItems('food', 'All'); 
      setAllItems(its); 
      // Extract unique restaurants
      const uniqueRestaurants = Array.from(new Set(its.map(i=> i.hotel && i.hotel.name).filter(Boolean)));
      setRestaurants(uniqueRestaurants);
      setLoadingItems(false); 
      
      // Auto-show items if filters are passed from home page
      if(initFilters && Object.keys(initFilters).length > 0){
        setShowItems(true);
        // Apply the filters from home page
        if(initFilters.category && initFilters.category !== 'all') {
          setSelectedCategory(initFilters.category);
        }
        if(initFilters.restaurant && initFilters.restaurant !== 'all') {
          setSelectedRestaurant(initFilters.restaurant);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  function handleAdd(item){ addItem(item,1,'food'); }
  function handleBuyNow(item){ addItem(item,1,'food'); navigate('/checkout',{ state:{ type:'food' } }); }

  function handleCategoryClick(category){
    // Convert "All" to "all" for consistency with FilterSortBar
    const normalizedCategory = category === 'All' ? 'all' : category;
    setSelectedCategory(normalizedCategory);
    setSelectedRestaurant('all');
    setShowItems(true);
  }

  function handleRestaurantClick(restaurant){
    setSelectedRestaurant(restaurant);
    setSelectedCategory('all');
    setShowItems(true);
  }

  function handleBrowseAll(){
    setSelectedCategory('all');
    setSelectedRestaurant('all');
    setShowItems(true);
  }

  function handleBackToCategories(){
    setShowItems(false);
    setSelectedCategory('all');
    setSelectedRestaurant('all');
  }

  const categoryImages = {
    'All': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop',
    'Biryani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&auto=format&fit=crop',
    'Pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop',
    'Burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop',
    'Chinese': 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&auto=format&fit=crop',
    'South Indian': 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&auto=format&fit=crop',
    'North Indian': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&auto=format&fit=crop',
    'Desserts': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&auto=format&fit=crop',
    'Beverages': 'https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=400&auto=format&fit=crop',
    'Street Food': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&auto=format&fit=crop',
    'Noodles': 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&auto=format&fit=crop',
    'Seafood': 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=400&auto=format&fit=crop',
    'Breakfast': 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&auto=format&fit=crop',
    'Middle Eastern': 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&auto=format&fit=crop'
  };

  const restaurantImages = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&auto=format&fit=crop'
  ];

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
                {showItems ? `Showing ${filteredItems.length} items` : `Explore ${categories.length} categories & ${restaurants.length} restaurants`}
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

        {/* Categories & Restaurants - Show when items are NOT displayed */}
        {!showItems && !loadingItems && (
          <>
            {/* Categories Section */}
            {categories.length > 0 && (
              <section style={{marginBottom: '3rem'}}>
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
                  {categories.slice(0, 8).map((cat, idx) => (
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
                        backgroundImage: `url(${categoryImages[cat] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop'})`,
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

            {/* Restaurants Section */}
            {restaurants.length > 0 && (
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
                  <i className="fa-solid fa-store" style={{color: '#FFB800'}}></i>
                  Popular Restaurants
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: 16
                }}>
                  {restaurants.map((restaurant, idx) => (
                    <div
                      key={restaurant}
                      onClick={() => handleRestaurantClick(restaurant)}
                      style={{
                        cursor: 'pointer',
                        borderRadius: 16,
                        background: '#fff',
                        boxShadow: '0 6px 22px rgba(0,0,0,0.06)',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        border: '1px solid rgba(0,0,0,0.06)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-6px)';
                        e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.12)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 6px 22px rgba(0,0,0,0.06)';
                      }}
                    >
                      <div style={{
                        height: 120,
                        backgroundImage: `url(${restaurantImages[idx % restaurantImages.length]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative'
                      }}>
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          padding: 12,
                          background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)'
                        }}>
                          <div style={{
                            width: 48,
                            height: 48,
                            borderRadius: 12,
                            background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '1.5rem',
                            color: '#0D0D0D',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                          }}>
                            {restaurant.charAt(0)}
                          </div>
                        </div>
                      </div>
                      <div style={{padding: 14}}>
                        <div style={{fontWeight: 700, color: '#0D0D0D', fontSize: '1rem'}}>
                          {restaurant}
                        </div>
                        <div style={{color: '#999', fontSize: '0.85rem', marginTop: 4}}>
                          <i className="fa-solid fa-star" style={{color: '#FFB800', marginRight: 4}}></i>
                          4.2 • 30 min
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* Filter, Sort & Items - Show when items ARE displayed */}
        {showItems && !loadingItems && (
          <>
            <FilterSortBar
              key={`${selectedCategory}-${selectedRestaurant}`}
              items={allItems}
              onFilteredItems={setFilteredItems}
              type="food"
              categories={categories}
              initialFilters={{
                ...initFilters,
                category: selectedCategory,
                restaurant: selectedRestaurant
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
