import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createUserProfile, getUserProfileByUid, getUserProfileByEmail } from '../services/usersService';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function Profile(){
  const { user, refreshProfile } = useAuth();
  const [profile, setProfile] = useState({ name:'', email:'', phone:'', location:'', address:'' });
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
  },[user?.uid, user?.email]);

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
        const created = await createUserProfile(user.email, user.uid, { name: profile.name, phone: profile.phone, location: profile.location, address: profile.address });
        setProfile(created);
        setFetchError('Profile created');
      }
    }catch(e){ setFetchError('Failed to create profile: ' + (e.message || e)); }
    setLoading(false);
  }

  if(!user) return <div style={{maxWidth:700, margin:'12px auto'}}><div className="card">Please <a href="/auth">login</a> to view your profile.</div></div>;

  return (
    <div style={{maxWidth:700, margin:'20px auto', padding: '0 20px'}}>
      <div style={{
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <h2 style={{
          color: '#0D0D0D',
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '10px',
          background: 'linear-gradient(135deg, #FFB800, #FFA000)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>👤 Your Profile</h2>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>Manage your personal information and delivery preferences</p>
      </div>
      
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 184, 0, 0.2)',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease'
      }}>
        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#FFB800',
            fontSize: '1.2rem'
          }}>
            <div style={{ marginBottom: '10px' }}>⏳</div>
            Loading your profile...
          </div>
        ) : (
          <div style={{display:'grid', gap:'20px'}}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#0D0D0D',
                fontSize: '14px'
              }}>📝 Full Name</label>
              <input 
                value={profile.name||''} 
                onChange={e=> setProfile(p=> ({ ...p, name: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid rgba(255, 184, 0, 0.2)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontFamily: 'inherit',
                  transition: 'all 0.3s ease',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#FFB800';
                  e.target.style.boxShadow = '0 0 15px rgba(255, 184, 0, 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 184, 0, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#0D0D0D',
                fontSize: '14px'
              }}>📧 Email (cannot be changed)</label>
              <input 
                value={user.email} 
                disabled 
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontFamily: 'inherit',
                  backgroundColor: '#f5f5f5',
                  color: '#666'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#0D0D0D',
                fontSize: '14px'
              }}>📞 Phone Number</label>
              <input 
                value={profile.phone||''} 
                onChange={e=> setProfile(p=> ({ ...p, phone: e.target.value }))}
                placeholder="Enter your phone number"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid rgba(255, 184, 0, 0.2)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontFamily: 'inherit',
                  transition: 'all 0.3s ease',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#FFB800';
                  e.target.style.boxShadow = '0 0 15px rgba(255, 184, 0, 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 184, 0, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#0D0D0D',
                fontSize: '14px'
              }}>📍 Location/City</label>
              <input 
                value={profile.location||''} 
                onChange={e=> setProfile(p=> ({ ...p, location: e.target.value }))} 
                placeholder="Enter your city or location"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid rgba(255, 184, 0, 0.2)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontFamily: 'inherit',
                  transition: 'all 0.3s ease',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#FFB800';
                  e.target.style.boxShadow = '0 0 15px rgba(255, 184, 0, 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 184, 0, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#0D0D0D',
                fontSize: '14px'
              }}>🏠 Full Delivery Address</label>
              <textarea 
                value={profile.address||''} 
                onChange={e=> setProfile(p=> ({ ...p, address: e.target.value }))} 
                placeholder="Enter your complete address for delivery (include landmarks, floor, apartment number)"
                rows="4"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid rgba(255, 184, 0, 0.2)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  minHeight: '100px',
                  transition: 'all 0.3s ease',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#FFB800';
                  e.target.style.boxShadow = '0 0 15px rgba(255, 184, 0, 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 184, 0, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{display:'flex', gap:'15px', alignItems: 'center', marginTop: '10px'}}>
              <button 
                onClick={save} 
                disabled={saving}
                style={{
                  background: saving ? '#ccc' : 'linear-gradient(135deg, #FFB800, #FFA000)',
                  color: saving ? '#666' : '#0D0D0D',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: saving ? 'none' : '0 4px 15px rgba(255, 184, 0, 0.3)',
                  transform: saving ? 'none' : 'translateY(0)',
                }}
                onMouseEnter={(e) => {
                  if (!saving) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(255, 184, 0, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!saving) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(255, 184, 0, 0.3)';
                  }
                }}
              >
                {saving ? '💾 Saving...' : '💾 Save Profile'}
              </button>
              {msg && (
                <div style={{
                  color: msg.includes('saved') ? '#28a745' : '#FFB800',
                  fontWeight: '600',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  {msg.includes('saved') ? '✅' : 'ℹ️'} {msg}
                </div>
              )}
            </div>
          </div>
        )}
        {fetchError && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: 'rgba(220, 53, 69, 0.1)',
            border: '1px solid rgba(220, 53, 69, 0.3)',
            borderRadius: '12px'
          }}>
            <div style={{color:'#dc3545', fontWeight: '600', marginBottom: '10px'}}>
              ⚠️ {fetchError}
            </div>
            <button 
              onClick={ensureProfile}
              style={{
                background: 'linear-gradient(135deg, #dc3545, #c82333)',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              🔧 Ensure Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
