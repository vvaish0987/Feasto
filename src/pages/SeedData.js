import React, { useState } from 'react';
import catalog from '../services/catalogService';

export default function SeedData(){
  const [status, setStatus] = useState(null);
  const [running, setRunning] = useState(false);

  async function runSeed(force){
    setRunning(true);
    setStatus(null);
    try{
      const res = await catalog.seedAll(force);
      setStatus(res);
    }catch(e){
      setStatus({ success:false, error: String(e) });
    }finally{ setRunning(false); }
  }

  return (
    <div style={{maxWidth:900, margin:'20px auto'}}>
      <h2>Seed Firestore demo data</h2>
      <p className="muted">This page will write demo `food` and `grocery` documents into Firestore using the frontend Firebase config. Use <strong>Force</strong> to overwrite existing docs.</p>
      <div style={{display:'flex', gap:8}}>
        <button className="btn" onClick={()=> runSeed(false)} disabled={running}>Create missing items</button>
        <button className="btn" onClick={()=> runSeed(true)} disabled={running}>Force overwrite all items</button>
      </div>
      <div style={{marginTop:12}}>
        {running && <div className="muted">Seeding...</div>}
        {status && (
          <div style={{marginTop:8}}>
            {status.success ? <div style={{color:'green'}}>Seed completed successfully.</div> : <div style={{color:'crimson'}}>Seed failed: {status.error}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
