import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function Profile(){
  const { user } = useAuth();
  const [profile, setProfile] = useState({ name:'', email:'', phone:'' });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [fetchError, setFetchError] = useState('');

  useEffect(()=>{
    (async ()=>{
      if(!user?.uid) return;
      setLoading(true);
      try{
        // try fetch via usersService (uid-first)
        let data = null;
        try{
          const { getUserProfileByUid, getUserProfileByEmail } = await import('../services/usersService');
          if(user.uid) data = await getUserProfileByUid(user.uid);
          if(!data && user.email) data = await getUserProfileByEmail(user.email);
        }catch(e){
          console.warn('usersService not available, falling back', e);
          setFetchError('Could not load usersService: ' + (e.message || e));
        }
        if(data){
          console.log('Profile loaded', data);
          setProfile(data);
        } else {
          setFetchError('No profile document found for this user.');
        }
      }catch(e){ console.warn('Profile load error', e); setFetchError(e.message || String(e)); }
      setLoading(false);
    })();
  },[user?.uid]);

  async function save(){
    if(!user?.email) return setMsg('Please login first');
    setSaving(true); setMsg('');
    try{
      const profileToSave = { ...profile, email: user.email, updatedAt: new Date().toISOString(), uid: user.uid };
      // write both places for compatibility with registration
      await setDoc(doc(db, 'users', user.email), profileToSave, { merge:true });
      if(user.uid) await setDoc(doc(db, 'users_uid', user.uid), profileToSave, { merge:true });
      setMsg('Profile saved');
    }catch(e){ setMsg(e.message || 'Failed to save'); }
    setSaving(false);
  }

  if(!user) return <div style={{maxWidth:700, margin:'12px auto'}}><div className="card">Please <a href="/auth">login</a> to view your profile.</div></div>;

  return (
    <div style={{maxWidth:700, margin:'12px auto'}}>
      <h2>Your Profile</h2>
      <div className="card">
        {loading ? <div className="muted">Loading...</div> : (
          <div style={{display:'grid', gap:8}}>
            <label>Full name</label>
            <input value={profile.name||''} onChange={e=> setProfile(p=> ({ ...p, name: e.target.value }))} />
            <label>Email (cannot change)</label>
            <input value={user.email} disabled />
            <label>Phone</label>
            <input value={profile.phone||''} onChange={e=> setProfile(p=> ({ ...p, phone: e.target.value }))} />
            <div style={{display:'flex', gap:8}}>
              <button className="btn" onClick={save} disabled={saving}>{saving? 'Saving...':'Save profile'}</button>
              {msg && <div className="muted">{msg}</div>}
            </div>
          </div>
        )}
        {fetchError && <div style={{color:'crimson', marginTop:8}}>{fetchError}</div>}
      </div>
    </div>
  );
}
