import React, { useEffect, useState } from 'react';
import { getCategories, getItems } from '../services/mockApi';
import ItemCard from '../components/ItemCard';
import { useCart } from '../context/CartContext';

export default function Inventory(){
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('All');
  const [items, setItems] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [loadingItems, setLoadingItems] = useState(false);
  const { addItem } = useCart();

  useEffect(()=>{
    (async ()=>{
      setLoadingCats(true);
      const cats = await getCategories();
      setCategories(cats);
      setLoadingCats(false);
    })();
  },[]);

  useEffect(()=>{
    (async ()=>{
      setLoadingItems(true);
      const its = await getItems(category);
      setItems(its);
      setLoadingItems(false);
    })();
  },[category]);

  return (
    <div style={{display:'grid', gridTemplateColumns:'1fr 320px', gap:20}}>
      <section>
        <h2>Browse items</h2>
        <div style={{display:'flex', gap:8, marginBottom:12}}>
          {loadingCats ? <div className="muted">Loading categories...</div> : categories.map(c=> (
            <button key={c} className={`btn`} style={{background: c===category? 'var(--feasto-dark)': 'var(--feasto-orange)', opacity:c===category?1:0.9, padding:'6px 10px'}} onClick={()=> setCategory(c)}>{c}</button>
          ))}
        </div>

        {loadingItems ? <div className="muted">Loading items...</div> : (
          <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12}}>
            {items.map(i=> (
              <ItemCard key={i.id} item={i} onAdd={(it)=> addItem(it,1)} />
            ))}
          </div>
        )}
      </section>

      <aside>
        <div className="card">
          <h3>About Feasto</h3>
          <p className="muted">A demo food ordering frontend. Select items and save them to cart. Checkout will validate stock and create an order ID on success.</p>
        </div>
      </aside>
    </div>
  );
}
