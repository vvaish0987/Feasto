import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const { login, register, loginWithGoogle, resetPassword } = useAuth();
  const nav = useNavigate();

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

  async function submit(e){
    e.preventDefault(); 
    setErr('');
    setSuccess('');
    try{
      setLoading(true);
      if(mode==='login') {
        const res = await login(email.trim(), password);
        if(!res.emailVerified){
          setSuccess('Login successful! Please verify your email to access all features.');
        }
      } else {
        const res = await register(email.trim(), password, { name: name.trim(), phone: phone.trim() });
        setSuccess('Account created successfully! Please check your email to verify your account.');
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
      setTimeout(() => nav('/'), 2000);
    }catch(er){ 
      setErr(er.message || 'Failed'); 
    } finally{ 
      setLoading(false); 
    }
  }

  async function handleGoogleSignIn(){
    setErr('');
    setSuccess('');
    try{
      setLoading(true);
      await loginWithGoogle();
      setSuccess('Successfully signed in with Google!');
      setTimeout(() => nav('/'), 1500);
    }catch(er){
      setErr(er.message || 'Google sign-in failed');
    } finally{
      setLoading(false);
    }
  }

  async function handleForgotPassword(e){
    e.preventDefault();
    setErr('');
    setSuccess('');
    try{
      setLoading(true);
      await resetPassword(resetEmail.trim());
      setSuccess('Password reset email sent! Please check your inbox.');
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetEmail('');
      }, 2000);
    }catch(er){
      setErr(er.message || 'Failed to send reset email');
    } finally{
      setLoading(false);
    }
  }

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
            <i className={`fa-solid fa-${mode==='login' ? 'right-to-bracket' : 'user-plus'}`} style={{marginRight:'0.5rem'}}></i>
            {mode==='login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.9)', 
            fontSize: '1.1rem',
            animation: 'fadeInUp 0.8s ease-out',
            textShadow: '0 1px 5px rgba(0,0,0,0.1)'
          }}>
            {mode==='login' ? 'Login to continue your food journey' : 'Join us for amazing food and groceries'}
          </p>
        </div>
      </div>

      <div style={{maxWidth:420, margin:'0 auto', padding:'0 2rem'}}>
        {/* Forgot Password Modal */}
        {showForgotPassword && (
          <div style={{
            position:'fixed',
            top:0,
            left:0,
            right:0,
            bottom:0,
            background:'rgba(0,0,0,0.5)',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            zIndex:1000,
            padding:'2rem'
          }}>
            <div style={{
              background: '#fff',
              borderRadius: 20,
              padding: '2rem',
              maxWidth: '400px',
              width: '100%',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
            }}>
              <h3 style={{
                color:'#0D0D0D',
                marginBottom:'1rem',
                display:'flex',
                alignItems:'center',
                gap:'0.5rem'
              }}>
                <i className="fa-solid fa-key" style={{color:'#FFB800'}}></i>
                Reset Password
              </h3>
              <p style={{color:'rgba(13, 13, 13, 0.7)', marginBottom:'1.5rem', fontSize:'0.9rem'}}>
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <form onSubmit={handleForgotPassword}>
                <input 
                  type="email"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={e => setResetEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid rgba(255, 184, 0, 0.2)',
                    borderRadius: '12px',
                    fontSize: '16px',
                    marginBottom:'1rem',
                    fontFamily: 'inherit'
                  }}
                />
                <div style={{display:'flex', gap:'0.8rem'}}>
                  <button 
                    type="submit"
                    disabled={loading}
                    style={{
                      flex:1,
                      background: loading ? '#ccc' : 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
                      color: loading ? '#666' : '#0D0D0D',
                      border: 'none',
                      padding: '0.8rem',
                      borderRadius: 12,
                      fontWeight: 600,
                      cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setResetEmail('');
                      setErr('');
                      setSuccess('');
                    }}
                    style={{
                      flex:1,
                      background: 'transparent',
                      color: '#666',
                      border: '2px solid #e0e0e0',
                      padding: '0.8rem',
                      borderRadius: 12,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid rgba(255, 184, 0, 0.2)',
          borderRadius: 20,
          padding: '2rem',
          boxShadow: '0 8px 32px rgba(255, 184, 0, 0.1)'
        }}>
          <form onSubmit={submit} style={{display:'grid', gap:'1.2rem'}}>
            {mode==='register' && (
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#0D0D0D',
                  fontSize: '14px'
                }}>
                  <i className="fa-solid fa-user" style={{marginRight:'0.5rem', color:'#FFB800'}}></i>
                  Full Name
                </label>
                <input 
                  placeholder="Enter your full name" 
                  value={name} 
                  onChange={e=>setName(e.target.value)}
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
            )}
            
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#0D0D0D',
                fontSize: '14px'
              }}>
                <i className="fa-solid fa-envelope" style={{marginRight:'0.5rem', color:'#FFB800'}}></i>
                Email Address
              </label>
              <input 
                placeholder="Enter your email" 
                value={email} 
                onChange={e=>setEmail(e.target.value)}
                type="email"
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
            
            {mode==='register' && (
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
                  placeholder="Enter your phone number" 
                  value={phone} 
                  onChange={e=>setPhone(e.target.value)}
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
            )}
            
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#0D0D0D',
                fontSize: '14px'
              }}>
                <i className="fa-solid fa-lock" style={{marginRight:'0.5rem', color:'#FFB800'}}></i>
                Password
              </label>
              <input 
                placeholder="Enter your password" 
                type="password" 
                value={password} 
                onChange={e=>setPassword(e.target.value)}
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
            
            {err && (
              <div style={{
                color:'#EF4444',
                background:'rgba(239, 68, 68, 0.1)',
                border:'1px solid rgba(239, 68, 68, 0.3)',
                padding:'0.8rem',
                borderRadius:'12px',
                display:'flex',
                alignItems:'center',
                gap:'0.5rem',
                fontSize:'0.9rem'
              }}>
                <i className="fa-solid fa-circle-exclamation"></i>
                {err}
              </div>
            )}
            
            {success && (
              <div style={{
                color:'#10B981',
                background:'rgba(16, 185, 129, 0.1)',
                border:'1px solid rgba(16, 185, 129, 0.3)',
                padding:'0.8rem',
                borderRadius:'12px',
                display:'flex',
                alignItems:'center',
                gap:'0.5rem',
                fontSize:'0.9rem'
              }}>
                <i className="fa-solid fa-circle-check"></i>
                {success}
              </div>
            )}
            
            <div style={{display:'flex', flexDirection:'column', gap:'0.8rem', marginTop:'0.5rem'}}>
              <button 
                type="submit" 
                disabled={loading}
                style={{
                  width: '100%',
                  background: loading ? '#ccc' : 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
                  color: loading ? '#666' : '#0D0D0D',
                  border: 'none',
                  padding: '1rem',
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: loading ? 'none' : '0 4px 15px rgba(255, 184, 0, 0.4)',
                  transition: 'all 0.3s ease',
                  fontFamily: 'Poppins, sans-serif'
                }}
                onMouseEnter={(e) => {
                  if(!loading){
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(255, 184, 0, 0.6)';
                  }
                }}
                onMouseLeave={(e) => {
                  if(!loading){
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(255, 184, 0, 0.4)';
                  }
                }}
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin" style={{marginRight:'0.5rem'}}></i>
                    {mode==='login'? 'Logging in...' : 'Creating account...'}
                  </>
                ) : (
                  <>
                    <i className={`fa-solid fa-${mode==='login' ? 'right-to-bracket' : 'user-plus'}`} style={{marginRight:'0.5rem'}}></i>
                    {mode==='login' ? 'Login' : 'Create Account'}
                  </>
                )}
              </button>

              {/* Forgot Password Link - Only show in login mode */}
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#FFB800',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    textAlign: 'center',
                    padding: '0.5rem',
                    fontWeight: 500
                  }}
                >
                  <i className="fa-solid fa-key" style={{marginRight:'0.5rem'}}></i>
                  Forgot Password?
                </button>
              )}

              {/* Divider */}
              <div style={{
                display:'flex',
                alignItems:'center',
                gap:'1rem',
                margin:'0.5rem 0'
              }}>
                <div style={{flex:1, height:'1px', background:'rgba(255, 184, 0, 0.2)'}}></div>
                <span style={{color:'rgba(13, 13, 13, 0.5)', fontSize:'0.9rem'}}>OR</span>
                <div style={{flex:1, height:'1px', background:'rgba(255, 184, 0, 0.2)'}}></div>
              </div>

              {/* Google Sign In Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                style={{
                  width: '100%',
                  background: '#fff',
                  color: '#444',
                  border: '2px solid #e0e0e0',
                  padding: '0.9rem',
                  borderRadius: 12,
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'Poppins, sans-serif',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  gap:'0.8rem'
                }}
                onMouseEnter={(e) => {
                  if(!loading){
                    e.target.style.background = '#f8f9fa';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if(!loading){
                    e.target.style.background = '#fff';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path fill="#4285F4" d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z"/>
                  <path fill="#34A853" d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z"/>
                  <path fill="#FBBC05" d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z"/>
                  <path fill="#EA4335" d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z"/>
                </svg>
                {mode === 'login' ? 'Sign in with Google' : 'Sign up with Google'}
              </button>
              
              <button 
                type="button" 
                onClick={()=> setMode(mode==='login' ? 'register' : 'login')}
                style={{
                  width: '100%',
                  background: 'transparent',
                  color: '#FFB800',
                  border: '2px solid rgba(255, 184, 0, 0.3)',
                  padding: '0.8rem',
                  borderRadius: 12,
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'Poppins, sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 184, 0, 0.1)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <i className={`fa-solid fa-${mode==='login' ? 'user-plus' : 'right-to-bracket'}`} style={{marginRight:'0.5rem'}}></i>
                {mode==='login' ? 'Create New Account' : 'Already have an account? Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
