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
    <div style={{marginBottom:18}}>
      <div style={{display:'flex', gap:8, alignItems:'center'}}>
        <input aria-label="search" placeholder="Search items or categories..." value={query} onChange={(e)=> setQuery(e.target.value)} style={{flex:1, padding:'8px 10px', borderRadius:6, border:'1px solid #ddd'}} />
        <select value={type} onChange={(e)=> setType(e.target.value)} style={{padding:8, borderRadius:6}}>
          <option value="all">All</option>
          <option value="food">Food</option>
          <option value="grocery">Grocery</option>
        </select>
        {showCategory && (
          <>
            <select value={category} onChange={(e)=> setCategory(e.target.value)} style={{padding:8, borderRadius:6}}>
              {categories.map(c=> (<option key={c} value={c}>{c}</option>))}
            </select>
            {type === 'food' && (
              <select value={restaurant} onChange={(e)=> setRestaurant(e.target.value)} style={{padding:8, borderRadius:6}}>
                {restaurants.map(r=> (<option key={r} value={r}>{r}</option>))}
              </select>
            )}
          </>
        )}
      </div>

      <div style={{marginTop:12}}>
        {loading && <div className="muted">Searching...</div>}
        {!loading && query && results.length===0 && <div className="muted">No results</div>}
        {!loading && results.length>0 && (
          <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12}}>
            {results.map(r=> (
              <ItemCard key={`${r.id}_${r.source}`} item={r} onAdd={(it)=> onAdd && onAdd(it)} onBuyNow={(it)=> onBuyNow && onBuyNow(it)} type={r.source} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
