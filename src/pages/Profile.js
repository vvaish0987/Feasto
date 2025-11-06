import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createUserProfile, getUserProfileByUid, getUserProfileByEmail } from '../services/usersService';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function Profile(){
  const { user, refreshProfile } = useAuth();
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
      // refresh auth context so header (and other consumers) pick up the new name immediately
      if(typeof refreshProfile === 'function'){
        try{ await refreshProfile(); }catch(e){ console.warn('refreshProfile after save failed', e); }
      }
    }catch(e){ setMsg(e.message || 'Failed to save'); }
    setSaving(false);
  }

  async function ensureProfile(){
    if(!user?.email) return setFetchError('Please login');
    setLoading(true); setFetchError('');
    try{
      const existing = await getUserProfileByUid(user.uid);
      if(existing){ setProfile(existing); setFetchError('Profile already exists'); }
      else{
        const created = await createUserProfile(user.email, user.uid, { name: profile.name, phone: profile.phone });
        setProfile(created);
        setFetchError('Profile created');
      }
    }catch(e){ setFetchError('Failed to create profile: ' + (e.message || e)); }
    setLoading(false);
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
        {fetchError && (
          <div style={{marginTop:8}}>
            <div style={{color:'crimson'}}>{fetchError}</div>
            <div style={{height:8}} />
            <button className="btn" onClick={ensureProfile}>Ensure profile</button>
          </div>
        )}
      </div>
    </div>
  );
}
