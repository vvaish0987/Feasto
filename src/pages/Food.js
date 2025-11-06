import React, { useEffect, useState } from 'react';
import catalog from '../services/catalogService';
import ItemCard from '../components/ItemCard';
import SearchBar from '../components/SearchBar';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Food(){
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('All');
  const [items, setItems] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [loadingItems, setLoadingItems] = useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();


  useEffect(()=>{(async ()=>{ setLoadingCats(true); const cats = await catalog.getCategories('food'); setCategories(cats); setLoadingCats(false); })();},[]);
  useEffect(()=>{(async ()=>{ setLoadingItems(true); const its = await catalog.getItems('food', category); setItems(its); setLoadingItems(false); })();},[category]);

  function handleAdd(item){ addItem(item,1,'food'); }
  function handleBuyNow(item){ addItem(item,1,'food'); navigate('/checkout',{ state:{ type:'food' } }); }

  return (
    <div style={{display:'grid', gridTemplateColumns:'1fr 320px', gap:20}}>
      <section>
        <SearchBar initialType="food" onAdd={(it)=> handleAdd(it)} onBuyNow={(it)=> handleBuyNow(it)} />
        <h2>Food ordering</h2>
        <div style={{display:'flex', gap:8, marginBottom:12}}>
          {loadingCats ? <div className="muted">Loading categories...</div> : categories.map(c=> (
            <button key={c} className={`btn`} style={{background: c===category? 'var(--feasto-dark)': 'var(--feasto-orange)', opacity:c===category?1:0.9, padding:'6px 10px'}} onClick={()=> setCategory(c)}>{c}</button>
          ))}
        </div>

        {loadingItems ? <div className="muted">Loading items...</div> : (
          <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12}}>
            {items.map(i=> (
              <ItemCard key={i.id} item={i} onAdd={(it, qty, t)=> handleAdd(it)} onBuyNow={(it)=> handleBuyNow(it)} type="food" />
            ))}
          </div>
        )}
      </section>

      <aside>
        <div className="card">
          <h3>Nearby delivery</h3>
          <p className="muted">Each food item shows the kitchen/hotel it will be delivered from. Delivery time and distance are simulated in this demo.</p>
        </div>
      </aside>
    </div>
  );
}
