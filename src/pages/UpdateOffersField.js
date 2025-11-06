import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import foodItemsData from '../data/food-items.json';
import groceryItemsData from '../data/grocery-items.json';

export default function UpdateOffersField() {
  const [status, setStatus] = useState(null);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState('');

  const foodSeed = Object.values(foodItemsData || {});
  const grocerySeed = Object.values(groceryItemsData || {});

  async function addOffersToDatabase() {
    setRunning(true);
    setStatus(null);
    setProgress('Starting to add offers field to all items...');

    try {
      let updatedCount = 0;
      let totalCount = 0;

      // Update Food items
      setProgress('🍕 Adding offers to food items...');
      const foodCollection = collection(db, 'food');
      const foodSnapshot = await getDocs(foodCollection);
      
      for (const docSnap of foodSnapshot.docs) {
        const docData = docSnap.data();
        const updatedItem = foodSeed.find(item => item.id === docData.id);
        
        if (updatedItem && updatedItem.offer) {
          await updateDoc(doc(db, 'food', docData.id), {
            offer: updatedItem.offer
          });
          updatedCount++;
        }
        totalCount++;
      }

      setProgress('🥕 Adding offers to grocery items...');
      // Update Grocery items
      const groceryCollection = collection(db, 'grocery');
      const grocerySnapshot = await getDocs(groceryCollection);
      
      for (const docSnap of grocerySnapshot.docs) {
        const docData = docSnap.data();
        const updatedItem = grocerySeed.find(item => item.id === docData.id);
        
        if (updatedItem && updatedItem.offer) {
          await updateDoc(doc(db, 'grocery', docData.id), {
            offer: updatedItem.offer
          });
          updatedCount++;
        }
        totalCount++;
      }

      // Calculate statistics
      const foodWithOffers = foodSeed.filter(item => item.offer && item.offer.hasOffer).length;
      const groceryWithOffers = grocerySeed.filter(item => item.offer && item.offer.hasOffer).length;
      const offerCoverage = Math.round(((foodWithOffers + groceryWithOffers) / (foodSeed.length + grocerySeed.length)) * 100);

      setStatus({
        success: true,
        message: `Successfully added offers field to ${updatedCount} out of ${totalCount} items`,
        stats: {
          totalItems: totalCount,
          updatedItems: updatedCount,
          foodItems: foodSnapshot.size,
          groceryItems: grocerySnapshot.size,
          foodWithOffers: foodWithOffers,
          groceryWithOffers: groceryWithOffers,
          offerCoverage: offerCoverage
        }
      });

    } catch (error) {
      console.error('Update failed:', error);
      setStatus({
        success: false,
        error: error.message
      });
    } finally {
      setRunning(false);
      setProgress('');
    }
  }

  return (
    <div style={{maxWidth:900, margin:'20px auto', padding:'20px'}}>
      <div style={{textAlign:'center', marginBottom:'30px'}}>
        <h2 style={{color:'var(--primary-color)', marginBottom:'10px'}}>🎉 Add Offers & Discounts</h2>
        <p style={{color:'var(--text-muted)', fontSize:'16px'}}>
          Add exciting offers and discount fields to all existing Firebase documents
        </p>
      </div>
      
      <div style={{
        background:'var(--glass-bg)', 
        border:'1px solid var(--glass-border)', 
        borderRadius:'15px', 
        padding:'25px',
        marginBottom:'20px'
      }}>
        <h3 style={{marginBottom:'15px', color:'var(--text-primary)'}}>🏷️ Offer Types</h3>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'15px'}}>
          <div style={{textAlign:'center', padding:'15px', background:'rgba(231,76,60,0.1)', borderRadius:'10px'}}>
            <div style={{fontSize:'20px', fontWeight:'bold', color:'#e74c3c'}}>🎯 Percentage</div>
            <div style={{color:'var(--text-muted)'}}>10%, 15%, 20%, 25%, 30% OFF</div>
          </div>
          <div style={{textAlign:'center', padding:'15px', background:'rgba(46,204,113,0.1)', borderRadius:'10px'}}>
            <div style={{fontSize:'20px', fontWeight:'bold', color:'#2ecc71'}}>💰 Special</div>
            <div style={{color:'var(--text-muted)'}}>BOGO, Free Delivery, Chef's Special</div>
          </div>
          <div style={{textAlign:'center', padding:'15px', background:'rgba(52,152,219,0.1)', borderRadius:'10px'}}>
            <div style={{fontSize:'20px', fontWeight:'bold', color:'#3498db'}}>🔥 Flat</div>
            <div style={{color:'var(--text-muted)'}}>Flat ₹50 OFF, New Item Special</div>
          </div>
          <div style={{textAlign:'center', padding:'15px', background:'rgba(155,89,182,0.1)', borderRadius:'10px'}}>
            <div style={{fontSize:'20px', fontWeight:'bold', color:'#9b59b6'}}>📈 Smart</div>
            <div style={{color:'var(--text-muted)'}}>Category-based & Price-aware</div>
          </div>
        </div>
      </div>

      <div style={{
        background:'var(--glass-bg)', 
        border:'1px solid var(--glass-border)', 
        borderRadius:'15px', 
        padding:'25px',
        marginBottom:'20px'
      }}>
        <h3 style={{marginBottom:'15px', color:'var(--text-primary)'}}>⚡ Features</h3>
        <ul style={{listStyle:'none', padding:0, color:'var(--text-primary)'}}>
          <li style={{padding:'8px 0', borderBottom:'1px solid var(--glass-border)'}}>
            ✅ Smart offer distribution: <strong>~65% items</strong> will have offers
          </li>
          <li style={{padding:'8px 0', borderBottom:'1px solid var(--glass-border)'}}>
            🎯 Category-specific offers (Pizza → BOGO, Desserts → 25% OFF, etc.)
          </li>
          <li style={{padding:'8px 0', borderBottom:'1px solid var(--glass-border)'}}>
            💰 Price-aware discounting (expensive items → %, cheap items → flat)
          </li>
          <li style={{padding:'8px 0', borderBottom:'1px solid var(--glass-border)'}}>
            🏷️ Visual offer badges with animated effects
          </li>
          <li style={{padding:'8px 0'}}>
            💾 Complete offer data structure with original/discounted prices
          </li>
        </ul>
      </div>

      <div style={{textAlign:'center', marginBottom:'20px'}}>
        <button 
          onClick={addOffersToDatabase}
          disabled={running}
          style={{
            background: running ? 'var(--text-muted)' : 'linear-gradient(135deg, #e74c3c, #c0392b)',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '25px',
            fontSize: '16px',
            cursor: running ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(231,76,60,0.4)'
          }}
        >
          {running ? '⏳ Adding Offers...' : '🎉 Add Offers to All Items'}
        </button>
      </div>

      {progress && (
        <div style={{
          background:'rgba(255,184,0,0.1)', 
          border:'2px solid var(--primary-color)', 
          borderRadius:'10px', 
          padding:'15px',
          marginBottom:'15px',
          textAlign:'center'
        }}>
          <div style={{color:'var(--primary-color)', fontWeight:'bold'}}>{progress}</div>
        </div>
      )}

      {status && (
        <div style={{
          background: status.success ? 'rgba(46,204,113,0.1)' : 'rgba(231,76,60,0.1)',
          border: `2px solid ${status.success ? '#2ecc71' : '#e74c3c'}`,
          borderRadius:'15px', 
          padding:'20px',
          textAlign:'center'
        }}>
          {status.success ? (
            <div>
              <div style={{color:'#2ecc71', fontSize:'18px', fontWeight:'bold', marginBottom:'10px'}}>
                🎉 {status.message}
              </div>
              {status.stats && (
                <div style={{color:'var(--text-primary)', fontSize:'14px'}}>
                  <div>📊 Total Items: {status.stats.totalItems}</div>
                  <div>✅ Updated Items: {status.stats.updatedItems}</div>
                  <div>🍕 Food Items: {status.stats.foodItems} (🎯 {status.stats.foodWithOffers} with offers)</div>
                  <div>🥕 Grocery Items: {status.stats.groceryItems} (🎯 {status.stats.groceryWithOffers} with offers)</div>
                  <div>📈 Offer Coverage: {status.stats.offerCoverage}%</div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div style={{color:'#e74c3c', fontSize:'18px', fontWeight:'bold', marginBottom:'10px'}}>
                ❌ Update Failed
              </div>
              <div style={{color:'var(--text-primary)', fontSize:'14px', background:'rgba(0,0,0,0.1)', padding:'10px', borderRadius:'5px'}}>
                {status.error}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}