import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createUserProfile, getUserProfileByUid, getUserProfileByEmail } from '../services/usersService';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function Profile(){
  const { user, refreshProfile, resendVerificationEmail } = useAuth();
  const [profile, setProfile] = useState({ name:'', email:'', phone:'', location:'', address:'' });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [fetchError, setFetchError] = useState('');
  const [verificationMsg, setVerificationMsg] = useState('');
  const [sendingVerification, setSendingVerification] = useState(false);

  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  if (!document.head.contains(style)) {
    document.head.appendChild(style);
  }

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

  async function handleResendVerification(){
    setVerificationMsg('');
    setSendingVerification(true);
    try{
      await resendVerificationEmail();
      setVerificationMsg('Verification email sent! Please check your inbox.');
    }catch(e){
      setVerificationMsg(e.message || 'Failed to send verification email');
    }
    setSendingVerification(false);
  }

  if(!user) return (
    <div style={{background:'#f8f9fa', minHeight:'100vh', paddingBottom:'4rem'}}>
      <div style={{maxWidth:700, margin:'0 auto', padding:'2rem'}}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid rgba(255, 184, 0, 0.2)',
          borderRadius: 20,
          padding: '2rem',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(255, 184, 0, 0.1)'
        }}>
          <i className="fa-solid fa-user-lock" style={{fontSize:'3rem', color:'#FFB800', marginBottom:'1rem', display:'block'}}></i>
          <p style={{fontSize:'1.1rem', color:'#0D0D0D'}}>
            Please <a href="/auth" style={{color:'var(--primary-color)', fontWeight:600, textDecoration:'none'}}>
              <i className="fa-solid fa-right-to-bracket" style={{marginRight:'0.3rem'}}></i>
              login
            </a> to view your profile.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{background:'#f8f9fa', minHeight:'100vh', paddingBottom:'4rem'}}>
      {/* Header Section with Animation */}
      <div style={{
        background: 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
        padding: '3rem 2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '0 0 30px 30px'
      }}>
        {/* Animated Background Circles */}
        <div style={{position:'absolute', top:'-50px', right:'10%', width:'200px', height:'200px', borderRadius:'50%', background:'rgba(255,255,255,0.1)', animation:'float 6s ease-in-out infinite'}}></div>
        <div style={{position:'absolute', bottom:'-30px', left:'15%', width:'150px', height:'150px', borderRadius:'50%', background:'rgba(255,255,255,0.1)', animation:'float 7s ease-in-out infinite'}}></div>
        <div style={{position:'absolute', top:'50%', left:'5%', width:'100px', height:'100px', borderRadius:'50%', background:'rgba(255,255,255,0.1)', animation:'float 8s ease-in-out infinite'}}></div>

        <div style={{position:'relative', zIndex:1, textAlign:'center'}}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 900,
            fontFamily: 'Montserrat, sans-serif',
            color: '#fff',
            marginBottom: '0.5rem',
            animation: 'fadeInUp 0.6s ease-out',
            textShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <i className="fa-solid fa-user" style={{marginRight:'0.5rem'}}></i>
            Your Profile
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.9)', 
            fontSize: '1.1rem',
            animation: 'fadeInUp 0.8s ease-out',
            textShadow: '0 1px 5px rgba(0,0,0,0.1)'
          }}>
            Manage your personal information and delivery preferences
          </p>
        </div>
      </div>

      <div style={{maxWidth:700, margin:'0 auto', padding:'0 2rem'}}>
        {/* Email Verification Banner */}
        {user && !user.emailVerified && (
          <div style={{
            background: 'rgba(255, 152, 0, 0.1)',
            border: '2px solid rgba(255, 152, 0, 0.4)',
            borderRadius: 20,
            padding: '1.5rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <div style={{flex: 1}}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
                color: '#FF9800',
                fontWeight: 700
              }}>
                <i className="fa-solid fa-envelope" style={{fontSize: '1.2rem'}}></i>
                Email Not Verified
              </div>
              <p style={{color: 'rgba(13, 13, 13, 0.8)', fontSize: '0.9rem', margin: 0}}>
                Please verify your email address to access all features.
              </p>
              {verificationMsg && (
                <p style={{
                  color: verificationMsg.includes('sent') ? '#10B981' : '#EF4444',
                  fontSize: '0.85rem',
                  marginTop: '0.5rem',
                  marginBottom: 0
                }}>
                  <i className={`fa-solid fa-${verificationMsg.includes('sent') ? 'circle-check' : 'circle-exclamation'}`} style={{marginRight: '0.3rem'}}></i>
                  {verificationMsg}
                </p>
              )}
            </div>
            <button
              onClick={handleResendVerification}
              disabled={sendingVerification}
              style={{
                background: sendingVerification ? '#ccc' : 'linear-gradient(135deg, #FF9800, #F57C00)',
                color: sendingVerification ? '#666' : '#fff',
                border: 'none',
                padding: '0.8rem 1.5rem',
                borderRadius: 12,
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: sendingVerification ? 'not-allowed' : 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if(!sendingVerification){
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 15px rgba(255, 152, 0, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if(!sendingVerification){
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              {sendingVerification ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin" style={{marginRight: '0.5rem'}}></i>
                  Sending...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane" style={{marginRight: '0.5rem'}}></i>
                  Resend Verification
                </>
              )}
            </button>
          </div>
        )}

        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid rgba(255, 184, 0, 0.2)',
          borderRadius: 20,
          padding: '2rem',
          boxShadow: '0 8px 32px rgba(255, 184, 0, 0.1)'
        }}>
          {loading ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#FFB800',
              fontSize: '1.2rem'
            }}>
              <i className="fa-solid fa-spinner fa-spin" style={{fontSize:'2rem', marginBottom:'1rem', display:'block'}}></i>
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
                }}>
                  <i className="fa-solid fa-user-pen" style={{marginRight:'0.5rem', color:'#FFB800'}}></i>
                  Full Name
                </label>
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
                }}>
                  <i className="fa-solid fa-envelope" style={{marginRight:'0.5rem', color:'#FFB800'}}></i>
                  Email (cannot be changed)
                </label>
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
                }}>
                  <i className="fa-solid fa-phone" style={{marginRight:'0.5rem', color:'#FFB800'}}></i>
                  Phone Number
                </label>
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
                }}>
                  <i className="fa-solid fa-location-dot" style={{marginRight:'0.5rem', color:'#FFB800'}}></i>
                  Location/City
                </label>
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
                }}>
                  <i className="fa-solid fa-house" style={{marginRight:'0.5rem', color:'#FFB800'}}></i>
                  Full Delivery Address
                </label>
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
                  <i className="fa-solid fa-floppy-disk" style={{marginRight:'0.5rem'}}></i>
                  {saving ? 'Saving...' : 'Save Profile'}
                </button>
                {msg && (
                  <div style={{
                    color: msg.includes('saved') ? '#10B981' : '#FFB800',
                    fontWeight: '600',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <i className={`fa-solid fa-${msg.includes('saved') ? 'circle-check' : 'circle-info'}`}></i>
                    {msg}
                  </div>
                )}
              </div>
            </div>
          )}
          {fetchError && (
            <div style={{
              marginTop: '20px',
              padding: '15px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '12px'
            }}>
              <div style={{color:'#EF4444', fontWeight: '600', marginBottom: '10px', display:'flex', alignItems:'center', gap:'0.5rem'}}>
                <i className="fa-solid fa-triangle-exclamation"></i>
                {fetchError}
              </div>
              <button 
                onClick={ensureProfile}
                style={{
                  background: 'linear-gradient(135deg, #EF4444, #DC2626)',
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
                <i className="fa-solid fa-wrench" style={{marginRight:'0.5rem'}}></i>
                Ensure Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
