import React, { useState } from 'react';
import { seedAll } from '../services/catalogService';

export default function SeedData(){
  const [status, setStatus] = useState(null);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState('');

  async function runSeed(force){
    setRunning(true);
    setStatus(null);
    setProgress('Initializing database seeding...');
    
    try {
      // Capture console logs for progress
      const originalLog = console.log;
      console.log = (...args) => {
        const message = args.join(' ');
        if (message.includes('🌱') || message.includes('📝') || message.includes('✅') || message.includes('🍕') || message.includes('🥕') || message.includes('📂') || message.includes('⚙️') || message.includes('🎉')) {
          setProgress(message);
        }
        originalLog(...args);
      };
      
      const res = await seedAll(force);
      
      // Restore console.log
      console.log = originalLog;
      
      setStatus(res);
    } catch(e) {
      setStatus({ success: false, error: String(e) });
    } finally { 
      setRunning(false); 
      setProgress('');
    }
  }

  return (
    <div style={{maxWidth:900, margin:'20px auto', padding:'20px'}}>
      <div style={{textAlign:'center', marginBottom:'30px'}}>
        <h2 style={{color:'var(--primary-color)', marginBottom:'10px'}}>🗄️ FEASTO Database Seeder</h2>
        <p style={{color:'var(--text-muted)', fontSize:'16px'}}>
          Upload comprehensive product data to Firebase Firestore
        </p>
      </div>
      
      <div style={{
        background:'var(--glass-bg)', 
        border:'1px solid var(--glass-border)', 
        borderRadius:'15px', 
        padding:'25px',
        marginBottom:'20px'
      }}>
        <h3 style={{marginBottom:'15px', color:'var(--text-primary)'}}>📊 Data Overview</h3>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'15px'}}>
          <div style={{textAlign:'center', padding:'15px', background:'rgba(255,184,0,0.1)', borderRadius:'10px'}}>
            <div style={{fontSize:'24px', fontWeight:'bold', color:'var(--primary-color)'}}>25</div>
            <div style={{color:'var(--text-muted)'}}>Food Items</div>
          </div>
          <div style={{textAlign:'center', padding:'15px', background:'rgba(255,184,0,0.1)', borderRadius:'10px'}}>
            <div style={{fontSize:'24px', fontWeight:'bold', color:'var(--primary-color)'}}>30</div>
            <div style={{color:'var(--text-muted)'}}>Grocery Items</div>
          </div>
          <div style={{textAlign:'center', padding:'15px', background:'rgba(255,184,0,0.1)', borderRadius:'10px'}}>
            <div style={{fontSize:'24px', fontWeight:'bold', color:'var(--primary-color)'}}>27</div>
            <div style={{color:'var(--text-muted)'}}>Categories</div>
          </div>
          <div style={{textAlign:'center', padding:'15px', background:'rgba(255,184,0,0.1)', borderRadius:'10px'}}>
            <div style={{fontSize:'24px', fontWeight:'bold', color:'var(--primary-color)'}}>4</div>
            <div style={{color:'var(--text-muted)'}}>Collections</div>
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
        <h3 style={{marginBottom:'15px', color:'var(--text-primary)'}}>🎯 Collections to Create</h3>
        <ul style={{listStyle:'none', padding:0}}>
          <li style={{padding:'8px 0', borderBottom:'1px solid var(--glass-border)'}}>
            <strong>🍕 food</strong> - Restaurant dishes with hotel info, ratings, preparation times
          </li>
          <li style={{padding:'8px 0', borderBottom:'1px solid var(--glass-border)'}}>
            <strong>🥕 grocery</strong> - Grocery items with brands, nutrition info, units
          </li>
          <li style={{padding:'8px 0', borderBottom:'1px solid var(--glass-border)'}}>
            <strong>📂 categories</strong> - Food and grocery categories with icons and descriptions
          </li>
          <li style={{padding:'8px 0'}}>
            <strong>⚙️ app-data</strong> - Delivery partners, settings, and business configuration
          </li>
        </ul>
      </div>

      <div style={{display:'flex', gap:'15px', justifyContent:'center', marginBottom:'20px'}}>
        <button 
          className="btn btn-primary"
          onClick={() => runSeed(false)} 
          disabled={running}
          style={{
            background: running ? 'var(--text-muted)' : 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '25px',
            fontSize: '16px',
            cursor: running ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          {running ? '⏳ Seeding...' : '🌱 Create Missing Items'}
        </button>
        <button 
          className="btn btn-secondary"
          onClick={() => runSeed(true)} 
          disabled={running}
          style={{
            background: running ? 'var(--text-muted)' : 'linear-gradient(135deg, #e74c3c, #c0392b)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '25px',
            fontSize: '16px',
            cursor: running ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          {running ? '⏳ Forcing...' : '🔄 Force Overwrite All'}
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
                🎉 Database Seeding Completed Successfully!
              </div>
              {status.stats && (
                <div style={{color:'var(--text-primary)', fontSize:'14px'}}>
                  <div>✅ Food Items: {status.stats.foodItems}</div>
                  <div>✅ Grocery Items: {status.stats.groceryItems}</div>
                  <div>✅ Total Products: {status.stats.totalItems}</div>
                  <div>✅ Collections Created: {status.stats.collections.join(', ')}</div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div style={{color:'#e74c3c', fontSize:'18px', fontWeight:'bold', marginBottom:'10px'}}>
                ❌ Seeding Failed
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
