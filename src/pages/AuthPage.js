import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AuthPage(){
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault(); setErr('');
    try{
      setLoading(true);
      if(mode==='login') await login(email.trim(), password);
      else {
        const res = await register(email.trim(), password, { name: name.trim(), phone: phone.trim() });
        // ensure profile is created using usersService (best-effort)
        try{
          const { createUserProfile } = await import('../services/usersService');
          await createUserProfile(email.trim(), res.uid, { name: name.trim(), phone: phone.trim() });
        }catch(e){
          console.warn('Could not create profile via usersService', e);
          // surface a non-blocking message to user
          setErr('Registered but failed to create profile in database: ' + (e.message || e));
        }
      }
      nav('/');
    }catch(er){ setErr(er.message || 'Failed'); }
    finally{ setLoading(false); }
  }

  return (
    <div style={{maxWidth:420, margin:'24px auto'}}>
      <div className="card">
        <h3>{mode==='login' ? 'Login' : 'Register'}</h3>
        <form onSubmit={submit} style={{display:'grid', gap:8}}>
          {mode==='register' && <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />}
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          {mode==='register' && <input placeholder="Phone number" value={phone} onChange={e=>setPhone(e.target.value)} />}
          <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          {err && <div style={{color:'crimson'}}>{err}</div>}
          <div style={{display:'flex', gap:8}}>
            <button className="btn" type="submit" disabled={loading}>{loading ? (mode==='login'? 'Logging in...' : 'Creating...') : (mode==='login' ? 'Login' : 'Create account')}</button>
            <button type="button" onClick={()=> setMode(mode==='login' ? 'register' : 'login')}>{mode==='login' ? 'Switch to Register' : 'Switch to Login'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
