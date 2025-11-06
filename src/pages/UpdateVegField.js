import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import foodItemsData from '../data/food-items.json';
import groceryItemsData from '../data/grocery-items.json';

export default function UpdateVegField() {
  const [status, setStatus] = useState(null);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState('');

  const foodSeed = Object.values(foodItemsData || {});
  const grocerySeed = Object.values(groceryItemsData || {});

  async function updateVegField() {
    setRunning(true);
    setStatus(null);
    setProgress('Starting to update isVeg field...');

    try {
      let updatedCount = 0;
      let totalCount = 0;

      // Update Food items
      setProgress('🍕 Updating food items...');
      const foodCollection = collection(db, 'food');
      const foodSnapshot = await getDocs(foodCollection);
      
      for (const docSnap of foodSnapshot.docs) {
        const docData = docSnap.data();
        const updatedItem = foodSeed.find(item => item.id === docData.id);
        
        if (updatedItem && updatedItem.hasOwnProperty('isVeg')) {
          // Update the document with isVeg field
          await updateDoc(doc(db, 'food', docData.id), {
            isVeg: updatedItem.isVeg
          });
          updatedCount++;
        }
        totalCount++;
      }

      setProgress('🥕 Updating grocery items...');
      // Update Grocery items
      const groceryCollection = collection(db, 'grocery');
      const grocerySnapshot = await getDocs(groceryCollection);
      
      for (const docSnap of grocerySnapshot.docs) {
        const docData = docSnap.data();
        const updatedItem = grocerySeed.find(item => item.id === docData.id);
        
        if (updatedItem && updatedItem.hasOwnProperty('isVeg')) {
          // Update the document with isVeg field
          await updateDoc(doc(db, 'grocery', docData.id), {
            isVeg: updatedItem.isVeg
          });
          updatedCount++;
        }
        totalCount++;
      }

      setStatus({
        success: true,
        message: `Successfully updated ${updatedCount} out of ${totalCount} items with isVeg field`,
        stats: {
          totalItems: totalCount,
          updatedItems: updatedCount,
          foodItems: foodSnapshot.size,
          groceryItems: grocerySnapshot.size
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
        <h2 style={{color:'var(--primary-color)', marginBottom:'10px'}}>🌱 Update Veg/Non-Veg Field</h2>
        <p style={{color:'var(--text-muted)', fontSize:'16px'}}>
          Add isVeg field to all existing Firebase documents
        </p>
      </div>
      
      <div style={{
        background:'var(--glass-bg)', 
        border:'1px solid var(--glass-border)', 
        borderRadius:'15px', 
        padding:'25px',
        marginBottom:'20px'
      }}>
        <h3 style={{marginBottom:'15px', color:'var(--text-primary)'}}>📊 Update Overview</h3>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'15px'}}>
          <div style={{textAlign:'center', padding:'15px', background:'rgba(46,204,113,0.1)', borderRadius:'10px'}}>
            <div style={{fontSize:'20px', fontWeight:'bold', color:'#2ecc71'}}>🥬 Vegetarian</div>
            <div style={{color:'var(--text-muted)'}}>Most items will be marked as veg</div>
          </div>
          <div style={{textAlign:'center', padding:'15px', background:'rgba(231,76,60,0.1)', borderRadius:'10px'}}>
            <div style={{fontSize:'20px', fontWeight:'bold', color:'#e74c3c'}}>🍖 Non-Vegetarian</div>
            <div style={{color:'var(--text-muted)'}}>Items with meat/seafood</div>
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
        <h3 style={{marginBottom:'15px', color:'var(--text-primary)'}}>⚠️ Important Notes</h3>
        <ul style={{listStyle:'none', padding:0, color:'var(--text-primary)'}}>
          <li style={{padding:'8px 0', borderBottom:'1px solid var(--glass-border)'}}>
            ✅ This will add <strong>isVeg: true/false</strong> field to all existing documents
          </li>
          <li style={{padding:'8px 0', borderBottom:'1px solid var(--glass-border)'}}>
            🍕 Food items already have this field with proper veg/non-veg classification
          </li>
          <li style={{padding:'8px 0', borderBottom:'1px solid var(--glass-border)'}}>
            🥕 Grocery items will be marked as vegetarian (most groceries are veg)
          </li>
          <li style={{padding:'8px 0'}}>
            💾 This operation will update existing Firebase documents
          </li>
        </ul>
      </div>

      <div style={{textAlign:'center', marginBottom:'20px'}}>
        <button 
          onClick={updateVegField}
          disabled={running}
          style={{
            background: running ? 'var(--text-muted)' : 'linear-gradient(135deg, #2ecc71, #27ae60)',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '25px',
            fontSize: '16px',
            cursor: running ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(46,204,113,0.4)'
          }}
        >
          {running ? '⏳ Updating...' : '🌱 Update All Items with Veg Field'}
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
                ✅ {status.message}
              </div>
              {status.stats && (
                <div style={{color:'var(--text-primary)', fontSize:'14px'}}>
                  <div>📊 Total Items: {status.stats.totalItems}</div>
                  <div>✅ Updated Items: {status.stats.updatedItems}</div>
                  <div>🍕 Food Items: {status.stats.foodItems}</div>
                  <div>🥕 Grocery Items: {status.stats.groceryItems}</div>
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