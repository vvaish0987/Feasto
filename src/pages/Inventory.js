import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import catalog from '../services/catalogService';
import HorizontalScroller from '../components/HorizontalScroller';

export default function Inventory(){
  const [foodFeatured, setFoodFeatured] = useState([]);
  const [grocFeatured, setGrocFeatured] = useState([]);
  const [selected, setSelected] = useState(null); // 'food' | 'grocery' | null
  const navigate = useNavigate();

  useEffect(()=>{
    (async ()=>{
      const f = await catalog.getFeatured('food');
      setFoodFeatured(f || []);
      const g = await catalog.getFeatured('grocery');
      setGrocFeatured(g || []);
    })();
  },[]);

  function renderSelector(){
    return (
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, marginTop:32}}>
        <div onClick={()=> setSelected('food')} role="button" tabIndex={0} onKeyDown={(e)=> e.key==='Enter' && setSelected('food')}
             style={{cursor:'pointer', padding:28, borderRadius:12, border:'1px solid #ddd', minHeight:220, display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
          <div>
            <h2 style={{margin:0}}>Food Delivery</h2>
            <div style={{marginTop:8, color:'#666'}}>Order food from restaurants</div>
          </div>
          <div style={{alignSelf:'flex-end'}}>
            <button className="btn">Open</button>
          </div>
        </div>

        <div onClick={()=> setSelected('grocery')} role="button" tabIndex={0} onKeyDown={(e)=> e.key==='Enter' && setSelected('grocery')}
             style={{cursor:'pointer', padding:28, borderRadius:12, border:'1px solid #ddd', minHeight:220, display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
          <div>
            <h2 style={{margin:0}}>Instamart / Grocery</h2>
            <div style={{marginTop:8, color:'#666'}}>Instant grocery & essentials</div>
          </div>
          <div style={{alignSelf:'flex-end'}}>
            <button className="btn">Open</button>
          </div>
        </div>
      </div>
    );
  }

  function renderDetails(){
    if(selected==='food'){
      return (
        <section style={{marginTop:20}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h3>Food ordering</h3>
            <div>
              <button className="btn" onClick={()=> setSelected(null)}>Back</button>
            </div>
          </div>
          <HorizontalScroller items={foodFeatured} onSelect={(it)=> navigate('/food')} title="Popular near you" />
        </section>
      );
    }

    if(selected==='grocery'){
      return (
        <section style={{marginTop:20}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h3>Groceries</h3>
            <div>
              <button className="btn" onClick={()=> setSelected(null)}>Back</button>
            </div>
          </div>
          <HorizontalScroller items={grocFeatured} onSelect={(it)=> navigate('/grocery')} title="Essentials" />
        </section>
      );
    }

    return null;
  }

  return (
    <div style={{maxWidth:1100, margin:'0 auto'}}>
      <h2>Explore Feasto</h2>

      {/* Two large neutral cards as the main entry */}
      {!selected && renderSelector()}

      {/* Details view for selected category */}
      {renderDetails()}
    </div>
  );
}
