import React, { useEffect, useMemo, useState } from 'react';
import catalog from '../services/catalogService';
import ItemCard from './ItemCard';

export default function SearchBar({ initialType, onAdd, onBuyNow }){
  const [type, setType] = useState(initialType || 'all'); // 'all' | 'food' | 'grocery'
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [restaurant, setRestaurant] = useState('All');
  const [restaurants, setRestaurants] = useState(['All']);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    let mounted = true;
    (async ()=>{
      try{
        if(type==='all'){
          // categories not applicable
          setCategories(['All']);
          setCategory('All');
          setRestaurants(['All']);
          setRestaurant('All');
        } else {
          const cats = await catalog.getCategories(type);
          if(!mounted) return;
          setCategories(cats || ['All']);
          if(!cats.includes(category)) setCategory('All');
          // if food, load restaurants (hotels) present in the items
          if(type === 'food'){
            try{
              const its = await catalog.getItems('food','All');
              const hotels = Array.from(new Set((its||[]).map(i=> i.hotel && i.hotel.name).filter(Boolean)));
              const list = ['All', ...hotels];
              if(mounted) setRestaurants(list);
              if(!list.includes(restaurant)) setRestaurant('All');
            }catch(e){ /* ignore */ }
          } else {
            setRestaurants(['All']);
            setRestaurant('All');
          }
        }
      }catch(e){ /* ignore */ }
    })();
    return ()=>{ mounted=false; };
  },[type]);

  // debounce search
  useEffect(()=>{
    const q = (query || '').trim();
    if(q.length < 1){ setResults([]); return; }
    let cancelled = false;
    setLoading(true);
    const id = setTimeout(async ()=>{
      try{
        const types = type==='all' ? ['food','grocery'] : [type];
        const all = [];
        for(const t of types){
          const items = await catalog.getItems(t, category || 'All');
          if(items && items.length) all.push(...items.map(i=> ({ ...i, source: t })));
        }
        const ql = q.toLowerCase();
        const filtered = all.filter(i=> {
          const matchesQuery = (i.name||'').toLowerCase().includes(ql) || (i.category||'').toLowerCase().includes(ql) || (i.hotel && (i.hotel.name||'').toLowerCase().includes(ql));
          const matchesRestaurant = (restaurant === 'All') || (i.hotel && i.hotel.name === restaurant) || (type !== 'food');
          return matchesQuery && matchesRestaurant;
        });
        if(!cancelled) setResults(filtered);
      }catch(err){ if(!cancelled) setResults([]); }
      finally{ if(!cancelled) setLoading(false); }
    }, 300);
    return ()=>{ cancelled=true; clearTimeout(id); };
  },[query, type, category]);

  const showCategory = useMemo(()=> type==='food' || type==='grocery', [type]);

  return (
    <div style={{
      marginBottom: 24,
      padding: '1.5rem',
      background: 'var(--glass-bg-light)',
      backdropFilter: 'blur(20px) saturate(180%)',
      borderRadius: 20,
      border: '1px solid var(--glass-border-light)',
      boxShadow: 'var(--shadow-md)'
    }}>
      <div style={{
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <input 
          aria-label="search" 
          placeholder="Search items or categories..." 
          value={query} 
          onChange={(e)=> setQuery(e.target.value)} 
          style={{
            flex: 1,
            minWidth: 250,
            padding: '12px 16px',
            borderRadius: 12,
            border: '2px solid var(--glass-border-light)',
            background: 'rgba(255, 255, 255, 0.9)',
            fontSize: '1rem',
            fontFamily: 'var(--font-primary)',
            transition: 'var(--transition-normal)',
            boxShadow: 'var(--shadow-sm)',
            '&:focus': {
              borderColor: 'var(--primary-color)',
              boxShadow: 'var(--shadow-glow)'
            }
          }} 
        />
        <select 
          value={type} 
          onChange={(e)=> setType(e.target.value)} 
          style={{
            padding: '12px 16px',
            borderRadius: 12,
            border: '2px solid var(--glass-border-light)',
            background: 'rgba(255, 255, 255, 0.9)',
            fontSize: '1rem',
            fontFamily: 'var(--font-primary)',
            cursor: 'pointer',
            transition: 'var(--transition-normal)',
            minWidth: 120
          }}
        >
          <option value="all">All</option>
          <option value="food">Food</option>
          <option value="grocery">Grocery</option>
        </select>
        {showCategory && (
          <>
            <select 
              value={category} 
              onChange={(e)=> setCategory(e.target.value)}
              style={{
                padding: '12px 16px',
                borderRadius: 12,
                border: '2px solid var(--glass-border-light)',
                background: 'rgba(255, 255, 255, 0.9)',
                fontSize: '1rem',
                fontFamily: 'var(--font-primary)',
                cursor: 'pointer',
                transition: 'var(--transition-normal)',
                minWidth: 150
              }}
            >
              {categories.map(c=> (<option key={c} value={c}>{c}</option>))}
            </select>
            {type === 'food' && (
              <select 
                value={restaurant} 
                onChange={(e)=> setRestaurant(e.target.value)}
                style={{
                  padding: '12px 16px',
                  borderRadius: 12,
                  border: '2px solid var(--glass-border-light)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-primary)',
                  cursor: 'pointer',
                  transition: 'var(--transition-normal)',
                  minWidth: 180
                }}
              >
                {restaurants.map(r=> (<option key={r} value={r}>{r}</option>))}
              </select>
            )}
          </>
        )}
      </div>

      <div style={{marginTop: 16}}>
        {loading && (
          <div style={{
            color: 'var(--dark-gray)',
            fontSize: '0.95rem',
            opacity: 0.7,
            fontFamily: 'var(--font-primary)'
          }}>
            Searching...
          </div>
        )}
        {!loading && query && results.length===0 && (
          <div style={{
            color: 'var(--dark-gray)',
            fontSize: '0.95rem',
            opacity: 0.7,
            fontFamily: 'var(--font-primary)'
          }}>
            No results found
          </div>
        )}
        {!loading && results.length>0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
            marginTop: 8
          }}>
            {results.map(r=> (
              <ItemCard 
                key={`${r.id}_${r.source}`} 
                item={r} 
                onAdd={(it)=> onAdd && onAdd(it)} 
                onBuyNow={(it)=> onBuyNow && onBuyNow(it)} 
                type={r.source} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
