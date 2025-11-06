import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import catalog from '../services/catalogService';
import HorizontalScroller from '../components/HorizontalScroller';

export default function Inventory(){
  const [foodFeatured, setFoodFeatured] = useState([]);
  const [grocFeatured, setGrocFeatured] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{(async ()=>{ const f = await catalog.getFeatured('food'); setFoodFeatured(f); const g = await catalog.getFeatured('grocery'); setGrocFeatured(g); })();},[]);

  return (
    <div style={{maxWidth:1100, margin:'0 auto'}}>
      <h2>Explore Feasto</h2>

      <section style={{marginBottom:18}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h3>Food ordering</h3>
          <div>
            <Link to="/food" className="btn">Open Food Menu</Link>
          </div>
        </div>
        <HorizontalScroller items={foodFeatured} onSelect={(it)=> navigate('/food')} title="Popular near you" />
      </section>

      <section>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h3>Groceries</h3>
          <div>
            <Link to="/grocery" className="btn">Open Grocery</Link>
          </div>
        </div>
        <HorizontalScroller items={grocFeatured} onSelect={(it)=> navigate('/grocery')} title="Essentials" />
      </section>
    </div>
  );
}
