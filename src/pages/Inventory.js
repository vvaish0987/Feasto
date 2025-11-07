import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import catalog from '../services/catalogService';
import HorizontalScroller from '../components/HorizontalScroller';
import Carousel from '../components/Carousel';
import { useCart } from '../context/CartContext';

export default function Inventory(){
  const [foodFeatured, setFoodFeatured] = useState([]);
  const [grocFeatured, setGrocFeatured] = useState([]);
  const [dealGroups, setDealGroups] = useState([]);
  // Removed unused state
  const [popularRestaurants, setPopularRestaurants] = useState([]);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const { addItem } = useCart();

  useEffect(()=>{
    (async ()=>{
      const f = await catalog.getFeatured('food');
      setFoodFeatured(f || []);
      const g = await catalog.getFeatured('grocery');
      setGrocFeatured(g || []);
      // fetch all food items to derive deals and restaurants
      try{
        const allF = await catalog.getItems('food','All');
        const offers = (allF || []).filter(i=> i.offer && i.offer.hasOffer);
        // group by hotel
        const map = new Map();
        for(const it of offers){
          const hotelName = it.hotel && it.hotel.name ? it.hotel.name : 'Unknown';
          if(!map.has(hotelName)) map.set(hotelName, { hotel: it.hotel || {}, items: [] });
          map.get(hotelName).items.push(it);
        }
        const groups = Array.from(map.entries()).map(([k,v])=> ({ name: k, hotel: v.hotel, items: v.items }));
        setDealGroups(groups.slice(0,12));
        // Removed deal categories handling
        const restaurants = Array.from(new Set((allF||[]).map(i=> i.hotel && i.hotel.name).filter(Boolean))).slice(0,12);
        setPopularRestaurants(restaurants);
      }catch(e){ /* ignore fallback */ }
    })();
  },[]);

  const selectorCardStyle = (isFood) => ({
    cursor: 'pointer',
    padding: '2.5rem',
    borderRadius: 24,
    background: 'rgba(26, 26, 26, 0.7)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 184, 0, 0.2)',
    minHeight: 280,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    overflow: 'hidden'
  });

  const iconStyle = {
    fontSize: '4rem',
    marginBottom: '1rem',
    animation: 'float 3s ease-in-out infinite'
  };

  function renderSelector(){
    return (
      <div className="stagger-children" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, maxWidth:1200, margin:'0 auto', padding:'0 2rem'}}>
        <div 
          onClick={()=> navigate('/food')}
          style={selectorCardStyle(true)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 184, 0, 0.3)';
            e.currentTarget.style.border = '1px solid rgba(255, 184, 0, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
            e.currentTarget.style.border = '1px solid rgba(255, 184, 0, 0.2)';
          }}
        >
          <div>
            <div style={iconStyle}>
              <i className="fa-solid fa-utensils" style={{fontSize:'3.5rem', color:'#FFB800'}}></i>
            </div>
            <h2 style={{margin:0, fontSize:'2rem', color:'#fff', fontFamily:'Montserrat, sans-serif'}}>Food Delivery</h2>
            <div style={{marginTop:12, color:'rgba(255, 255, 255, 0.7)', fontSize:'1.1rem'}}>
              Order delicious food from top restaurants
            </div>
          </div>
          <div style={{alignSelf:'flex-end', marginTop:'1.5rem'}}>
            <button 
              className="btn"
              style={{
                background: 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
                color: '#0D0D0D',
                padding: '0.8rem 2rem',
                borderRadius: 25,
                border: 'none',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(255, 184, 0, 0.4)'
              }}
            >
              Explore Food <i className="fa-solid fa-arrow-right" style={{marginLeft:8}}></i>
            </button>
          </div>
        </div>

        <div 
          onClick={()=> navigate('/grocery')}
          style={selectorCardStyle(false)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 184, 0, 0.3)';
            e.currentTarget.style.border = '1px solid rgba(255, 184, 0, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
            e.currentTarget.style.border = '1px solid rgba(255, 184, 0, 0.2)';
          }}
        >
          <div>
            <div style={iconStyle}>
              <i className="fa-solid fa-basket-shopping" style={{fontSize:'3.5rem', color:'#FFB800'}}></i>
            </div>
            <h2 style={{margin:0, fontSize:'2rem', color:'#fff', fontFamily:'Montserrat, sans-serif'}}> Grocery</h2>
            <div style={{marginTop:12, color:'rgba(255, 255, 255, 0.7)', fontSize:'1.1rem'}}>
              Instant grocery delivery & daily essentials
            </div>
          </div>
          <div style={{alignSelf:'flex-end', marginTop:'1.5rem'}}>
            <button 
              className="btn"
              style={{
                background: 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
                color: '#0D0D0D',
                padding: '0.8rem 2rem',
                borderRadius: 25,
                border: 'none',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(255, 184, 0, 0.4)'
              }}
            >
              Explore Grocery <i className="fa-solid fa-arrow-right" style={{marginLeft:8}}></i>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Removed unused handleDealCategoryClick function

  function handleRestaurantClick(name){
    navigate('/food', { state: { initialFilters: { offers: 'with-offers', restaurant: name } } });
  }

  function renderDetails(){
    if(selected==='food'){
      return (
        <section style={{marginTop:40, padding:'0 2rem', maxWidth:1400, margin:'2rem auto'}} className="fade-in">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem'}}>
            <h3 style={{fontSize:'2rem', color:'#fff', fontFamily:'Montserrat, sans-serif'}}>
              <span className="text-gradient">Food Delivery</span>
            </h3>
            <button 
              className="btn"
              onClick={()=> setSelected(null)}
              style={{
                background: 'transparent',
                border: '2px solid #FFB800',
                color: '#FFB800',
                padding: '0.6rem 1.5rem',
                borderRadius: 20,
                fontWeight: 600
              }}
            >
              ← Back
            </button>
          </div>
          <HorizontalScroller items={foodFeatured} onSelect={(it)=> navigate('/food')} title="Popular near you" />
        </section>
      );
    }

    if(selected==='grocery'){
      return (
        <section style={{marginTop:40, padding:'0 2rem', maxWidth:1400, margin:'2rem auto'}} className="fade-in">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem'}}>
            <h3 style={{fontSize:'2rem', color:'#fff', fontFamily:'Montserrat, sans-serif'}}>
              <span className="text-gradient">Groceries & Essentials</span>
            </h3>
            <button 
              className="btn"
              onClick={()=> setSelected(null)}
              style={{
                background: 'transparent',
                border: '2px solid #FFB800',
                color: '#FFB800',
                padding: '0.6rem 1.5rem',
                borderRadius: 20,
                fontWeight: 600
              }}
            >
              ← Back
            </button>
          </div>
          <HorizontalScroller items={grocFeatured} onSelect={(it)=> navigate('/grocery')} title="Essentials" />
        </section>
      );
    }

    return null;
  }

  return (
    <div>
      {/* Hero Carousel - Always visible when no category selected */}
      {!selected && (
        <Carousel onAdd={(it)=> addItem && addItem(it,1,it.source||'food')} 
                 onBuyNow={(it)=> navigate((it.source==='grocery'? '/grocery':'/food'))} />
      )}

      {/* Food & Grocery Selector Cards - Below carousel */}
      {!selected && renderSelector()}

      {/* Exclusive Deals */}
      {!selected && dealGroups.length > 0 && (
        <section style={{maxWidth:1400, margin:'3rem auto', padding:'0 2rem'}}>
          <h3 style={{
            fontSize:'2rem', 
            marginBottom:20, 
            color:'#0D0D0D',
            fontFamily:'Montserrat, sans-serif',
            fontWeight:800
          }}>
            <i className="fa-solid fa-tags" style={{marginRight:12, color:'#FFB800'}}></i>
            Exclusive Deals
          </h3>
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',
            gap:20,
            marginBottom:20
          }}>
            {dealGroups.map((g, idx)=> (
              <div 
                key={g.name} 
                onClick={()=> handleRestaurantClick(g.name)} 
                style={{
                  borderRadius:16, 
                  overflow:'hidden', 
                  boxShadow:'0 8px 30px rgba(0,0,0,0.08)', 
                  cursor:'pointer', 
                  background:'#fff',
                  transition:'all 0.3s ease',
                  border: '1px solid rgba(0,0,0,0.06)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
                }}
              >
                <div style={{
                  height:160, 
                  backgroundImage:`url(${g.items[0]?.image})`, 
                  backgroundSize:'cover', 
                  backgroundPosition:'center',
                  position:'relative'
                }}>
                  <div style={{
                    position:'absolute',
                    top:12,
                    right:12,
                    background:'rgba(255, 184, 0, 0.95)',
                    color:'#0D0D0D',
                    padding:'6px 12px',
                    borderRadius:20,
                    fontSize:'0.85rem',
                    fontWeight:700
                  }}>
                    <i className="fa-solid fa-percent" style={{marginRight:6}}></i>
                    {g.items.length} Offers
                  </div>
                </div>
                <div style={{padding:16}}>
                  <div style={{fontWeight:800, color:'#0D0D0D', fontSize:'1.1rem', marginBottom:8}}>{g.name}</div>
                  <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                    {g.items.slice(0,2).map(it=> (
                      <div key={it.id} style={{
                        background:'linear-gradient(135deg, #FFF8E1, #FFE082)', 
                        color:'#FF8C00', 
                        padding:'6px 10px', 
                        borderRadius:10, 
                        fontSize:'0.8rem', 
                        fontWeight:700
                      }}>
                        {it.offer && it.offer.offerText}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Popular Restaurants */}
      {!selected && popularRestaurants.length > 0 && (
        <section style={{maxWidth:1400, margin:'3rem auto', padding:'0 2rem'}}>
          <h3 style={{
            fontSize:'2rem', 
            marginBottom:20, 
            color:'#0D0D0D',
            fontFamily:'Montserrat, sans-serif',
            fontWeight:800
          }}>
            <i className="fa-solid fa-store" style={{marginRight:12, color:'#FFB800'}}></i>
            Popular Restaurants
          </h3>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:16}}>
            {popularRestaurants.map((r, idx)=> {
              const restaurantImages = [
                'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&auto=format&fit=crop'
              ];
              return (
                <div 
                  key={r} 
                  onClick={()=> handleRestaurantClick(r)} 
                  style={{
                    cursor:'pointer', 
                    borderRadius:16, 
                    background:'#fff', 
                    boxShadow:'0 6px 22px rgba(0,0,0,0.06)',
                    overflow:'hidden',
                    transition:'all 0.3s ease',
                    border:'1px solid rgba(0,0,0,0.06)'
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
                    height:120,
                    backgroundImage:`url(${restaurantImages[idx % restaurantImages.length]})`,
                    backgroundSize:'cover',
                    backgroundPosition:'center',
                    position:'relative'
                  }}>
                    <div style={{
                      position:'absolute',
                      bottom:0,
                      left:0,
                      right:0,
                      padding:12,
                      background:'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)'
                    }}>
                      <div style={{
                        width:48, 
                        height:48, 
                        borderRadius:12, 
                        background:'linear-gradient(135deg, #FFB800, #FF8C00)', 
                        display:'flex', 
                        alignItems:'center', 
                        justifyContent:'center', 
                        fontWeight:800,
                        fontSize:'1.5rem',
                        color:'#0D0D0D',
                        boxShadow:'0 4px 12px rgba(0,0,0,0.2)'
                      }}>
                        {r.charAt(0)}
                      </div>
                    </div>
                  </div>
                  <div style={{padding:14}}>
                    <div style={{fontWeight:700, color:'#0D0D0D', fontSize:'1rem'}}>{r}</div>
                    <div style={{color:'#999', fontSize:'0.85rem', marginTop:4}}>
                      <i className="fa-solid fa-star" style={{color:'#FFB800', marginRight:4}}></i>
                      4.2 • 30 min
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Popular Categories */}
      {!selected && (
        <section style={{maxWidth:1400, margin:'3rem auto', padding:'0 2rem'}}>
          <h3 style={{
            fontSize:'2rem', 
            marginBottom:20, 
            color:'#0D0D0D',
            fontFamily:'Montserrat, sans-serif',
            fontWeight:800
          }}>
            <i className="fa-solid fa-fire" style={{marginRight:12, color:'#FFB800'}}></i>
            Popular Categories
          </h3>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(150px, 1fr))', gap:16}}>
            {[
              {name:'Pizza', category:'Pizza', icon:'fa-pizza-slice', img:'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop'},
              {name:'North Indian', category:'North Indian', icon:'fa-bowl-rice', img:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&auto=format&fit=crop'},
              {name:'Sushi', category:'Sushi', icon:'fa-fish', img:'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&auto=format&fit=crop'},
              {name:'Desserts', category:'Desserts', icon:'fa-cake-candles', img:'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&auto=format&fit=crop'},
              {name:'South Indian', category:'South Indian', icon:'fa-cookie', img:'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&auto=format&fit=crop'},
              {name:'Street Food', category:'Street Food', icon:'fa-burger', img:'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&auto=format&fit=crop'},
              {name:'Italian', category:'Italian', icon:'fa-pizza-slice', img:'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&auto=format&fit=crop'},
              {name:'Salads', category:'Salads', icon:'fa-leaf', img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop'}
            ].map(cat => (
              <div
                key={cat.name} 
                onClick={()=> navigate('/food', { state: { initialFilters: { category: cat.category } } })} 
                style={{
                  position:'relative',
                  height:140,
                  borderRadius:16, 
                  overflow:'hidden',
                  cursor:'pointer',
                  boxShadow:'0 6px 20px rgba(0,0,0,0.08)',
                  transition:'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)';
                }}
              >
                <div style={{
                  position:'absolute',
                  top:0,
                  left:0,
                  right:0,
                  bottom:0,
                  backgroundImage:`url(${cat.img})`,
                  backgroundSize:'cover',
                  backgroundPosition:'center'
                }} />
                <div style={{
                  position:'absolute',
                  top:0,
                  left:0,
                  right:0,
                  bottom:0,
                  background:'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
                  display:'flex',
                  flexDirection:'column',
                  alignItems:'center',
                  justifyContent:'center',
                  gap:8
                }}>
                  <i className={`fa-solid ${cat.icon}`} style={{fontSize:'2.5rem', color:'#FFB800'}}></i>
                  <div style={{color:'#fff', fontWeight:700, fontSize:'1.1rem'}}>{cat.name}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Grocery Essentials Section */}
      {!selected && (
        <section style={{maxWidth:1400, margin:'3rem auto 4rem', padding:'0 2rem'}}>
          <h3 style={{
            fontSize:'2rem', 
            marginBottom:20, 
            color:'#0D0D0D',
            fontFamily:'Montserrat, sans-serif',
            fontWeight:800
          }}>
            <i className="fa-solid fa-basket-shopping" style={{marginRight:12, color:'#FFB800'}}></i>
            Fresh Groceries Delivered
          </h3>
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fill, minmax(250px, 1fr))',
            gap:20
          }}>
            {[
              {name:'Vegetables', category:'Vegetables', icon:'fa-carrot', img:'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop', discount:'Up to 20% OFF'},
              {name:'Dairy & Eggs', category:'Dairy', icon:'fa-egg', img:'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&auto=format&fit=crop', discount:'Fresh Daily'},
              {name:'Fresh Fruits', category:'Fruits', icon:'fa-apple-whole', img:'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&auto=format&fit=crop', discount:'Farm Fresh'},
              {name:'Pantry Staples', category:'Grains', icon:'fa-jar', img:'https://images.unsplash.com/photo-1556910110-a5a63dfd393c?w=400&auto=format&fit=crop', discount:'Best Prices'}
            ].map(item => (
              <div
                key={item.name}
                onClick={() => navigate('/grocery', { state: { initialFilters: { category: item.category } } })}
                style={{
                  position:'relative',
                  borderRadius:16,
                  overflow:'hidden',
                  cursor:'pointer',
                  background:'#fff',
                  boxShadow:'0 8px 24px rgba(0,0,0,0.08)',
                  transition:'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 16px 35px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                }}
              >
                <div style={{
                  height:180,
                  backgroundImage:`url(${item.img})`,
                  backgroundSize:'cover',
                  backgroundPosition:'center',
                  position:'relative'
                }}>
                  <div style={{
                    position:'absolute',
                    top:12,
                    left:12,
                    background:'linear-gradient(135deg, #FFB800, #FF8C00)',
                    color:'#0D0D0D',
                    padding:'8px 14px',
                    borderRadius:20,
                    fontSize:'0.85rem',
                    fontWeight:700,
                    boxShadow:'0 4px 12px rgba(0,0,0,0.2)'
                  }}>
                    {item.discount}
                  </div>
                </div>
                <div style={{padding:16}}>
                  <div style={{
                    display:'flex',
                    alignItems:'center',
                    gap:10,
                    marginBottom:8
                  }}>
                    <i className={`fa-solid ${item.icon}`} style={{fontSize:'1.5rem', color:'#FFB800'}}></i>
                    <div style={{fontWeight:700, color:'#0D0D0D', fontSize:'1.1rem'}}>{item.name}</div>
                  </div>
                  <div style={{
                    color:'#666',
                    fontSize:'0.9rem',
                    marginTop:8
                  }}>
                    Shop Now <i className="fa-solid fa-arrow-right" style={{marginLeft:6}}></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Details view for selected category */}
      {renderDetails()}
    </div>
  );
}
