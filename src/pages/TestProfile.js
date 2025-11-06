import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserProfileByUid, getUserProfileByEmail } from '../services/usersService';

export default function TestProfile() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);

  const testFetchProfile = async () => {
    if (!user?.uid) return;
    setLoading(true);
    try {
      let data = await getUserProfileByUid(user.uid);
      if (!data && user.email) {
        data = await getUserProfileByEmail(user.email);
      }
      setProfileData(data);
    } catch (e) {
      console.error('Test fetch error:', e);
      setProfileData({ error: e.message });
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 800, margin: '20px auto', padding: '20px' }}>
      <h2>🧪 Profile Data Test</h2>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        border: '1px solid rgba(255, 184, 0, 0.2)',
        borderRadius: '15px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <button 
          onClick={testFetchProfile}
          disabled={loading || !user}
          style={{
            background: 'linear-gradient(135deg, #FFB800, #FFA000)',
            color: '#0D0D0D',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: loading || !user ? 'not-allowed' : 'pointer',
            marginBottom: '20px'
          }}
        >
          {loading ? '⏳ Loading...' : '🔍 Fetch Current Profile Data'}
        </button>

        {!user && (
          <div style={{ color: '#dc3545', fontWeight: '600' }}>
            ⚠️ Please login first to test profile data
          </div>
        )}

        {profileData && (
          <div>
            <h3>📊 Profile Data Structure:</h3>
            <pre style={{
              background: '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              padding: '15px',
              fontSize: '14px',
              overflow: 'auto',
              maxHeight: '400px'
            }}>
              {JSON.stringify(profileData, null, 2)}
            </pre>
            
            <div style={{ marginTop: '15px' }}>
              <h4>✅ Fields Check:</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>📝 Name: {profileData.name ? '✅' : '❌'} {profileData.name || 'Not set'}</li>
                <li>📧 Email: {profileData.email ? '✅' : '❌'} {profileData.email || 'Not set'}</li>
                <li>📞 Phone: {profileData.phone ? '✅' : '❌'} {profileData.phone || 'Not set'}</li>
                <li>📍 Location: {profileData.location ? '✅' : '❌'} {profileData.location || 'Not set'}</li>
                <li>🏠 Address: {profileData.address ? '✅' : '❌'} {profileData.address || 'Not set'}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}