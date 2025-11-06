import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HelpCenter() {
  const navigate = useNavigate();

  const categories = [
    {
      icon: 'fa-utensils',
      title: 'Food Orders',
      topics: ['Place an order', 'Modify order', 'Track delivery', 'Restaurant menus', 'Special requests']
    },
    {
      icon: 'fa-basket-shopping',
      title: 'Grocery Orders',
      topics: ['Browse products', 'Product quality', 'Bulk orders', 'Substitutions', 'Fresh produce']
    },
    {
      icon: 'fa-credit-card',
      title: 'Payments & Refunds',
      topics: ['Payment methods', 'Failed payments', 'Refund process', 'Offers & coupons', 'Billing issues']
    },
    {
      icon: 'fa-user-circle',
      title: 'Account & Profile',
      topics: ['Create account', 'Login issues', 'Update profile', 'Address management', 'Delete account']
    },
    {
      icon: 'fa-truck',
      title: 'Delivery',
      topics: ['Delivery areas', 'Delivery charges', 'Track order', 'Contactless delivery', 'Delivery issues']
    },
    {
      icon: 'fa-percent',
      title: 'Offers & Rewards',
      topics: ['Current offers', 'Promo codes', 'Loyalty program', 'Referral rewards', 'Cashback']
    }
  ];

  return (
    <div style={{background:'#f8f9fa', minHeight:'100vh', paddingBottom:'4rem'}}>
      {/* Header Section */}
      <div style={{
        background: 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
        padding: '3rem 2rem',
        marginBottom: '3rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '0 0 30px 30px'
      }}>
        <div style={{maxWidth:1200, margin:'0 auto', position: 'relative', zIndex: 1}}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'rgba(0,0,0,0.2)',
              border: 'none',
              color: '#0D0D0D',
              padding: '0.6rem 1.2rem',
              borderRadius: 10,
              cursor: 'pointer',
              fontWeight: 600,
              marginBottom: '1.5rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(0,0,0,0.3)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(0,0,0,0.2)'}
          >
            <i className="fa-solid fa-arrow-left" style={{marginRight: 8}}></i>
            Back
          </button>
          
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            fontFamily: 'Montserrat, sans-serif',
            color: '#0D0D0D',
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <i className="fa-solid fa-circle-info"></i>
            Help Center
          </h1>
          <p style={{color: '#0D0D0D', fontSize: '1.1rem', margin:0, opacity: 0.9}}>
            Find answers to common questions
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{maxWidth:1200, margin:'0 auto 3rem', padding:'0 2rem'}}>
        <div style={{
          background: 'white',
          padding: '1rem 1.5rem',
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <i className="fa-solid fa-search" style={{color: '#FFB800', fontSize: '1.2rem'}}></i>
          <input
            type="text"
            placeholder="Search for help topics..."
            style={{
              border: 'none',
              outline: 'none',
              flex: 1,
              fontSize: '1rem',
              fontFamily: 'Poppins, sans-serif'
            }}
          />
        </div>
      </div>

      {/* Help Categories */}
      <div style={{maxWidth:1200, margin:'0 auto', padding:'0 2rem'}}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: '2rem',
          color: '#0D0D0D'
        }}>
          Browse by Category
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: 20
        }}>
          {categories.map((category, idx) => (
            <div key={idx} style={{
              background: 'white',
              padding: '2rem',
              borderRadius: 16,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
            }}
            >
              <div style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                fontSize: '1.8rem',
                color: '#0D0D0D'
              }}>
                <i className={`fa-solid ${category.icon}`}></i>
              </div>

              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: 700,
                marginBottom: '1rem',
                color: '#0D0D0D'
              }}>
                {category.title}
              </h3>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {category.topics.map((topic, topicIdx) => (
                  <li key={topicIdx} style={{
                    padding: '0.5rem 0',
                    color: '#666',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    fontSize: '0.95rem'
                  }}>
                    <i className="fa-solid fa-chevron-right" style={{color: '#FFB800', fontSize: '0.7rem'}}></i>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Still Need Help */}
        <div style={{
          background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
          padding: '3rem',
          borderRadius: 16,
          marginTop: '3rem',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: '1rem',
            color: '#0D0D0D'
          }}>
            Still Need Help?
          </h2>
          <p style={{
            fontSize: '1.1rem',
            marginBottom: '2rem',
            color: '#0D0D0D',
            opacity: 0.9
          }}>
            Our support team is available 24/7 to assist you
          </p>
          <button
            onClick={() => navigate('/contact-us')}
            style={{
              background: 'white',
              color: '#FFB800',
              border: 'none',
              padding: '1rem 2.5rem',
              borderRadius: 12,
              fontSize: '1.1rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            }}
          >
            <i className="fa-solid fa-headset" style={{marginRight: 10}}></i>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
