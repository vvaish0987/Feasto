import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Support() {
  const navigate = useNavigate();

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
        {/* Animated background circles */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          animation: 'float 6s ease-in-out infinite'
        }}></div>

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
            <i className="fa-solid fa-headset"></i>
            Customer Support
          </h1>
          <p style={{color: '#0D0D0D', fontSize: '1.1rem', margin:0, opacity: 0.9}}>
            We're here to help you 24/7
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div style={{maxWidth:1200, margin:'0 auto', padding:'0 2rem'}}>
        
        {/* Contact Methods */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
          marginBottom: '3rem'
        }}>
          {/* Email */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: 16,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            textAlign: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{
              width: 70,
              height: 70,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '2rem',
              color: '#0D0D0D'
            }}>
              <i className="fa-solid fa-envelope"></i>
            </div>
            <h3 style={{fontSize: '1.3rem', marginBottom: '0.5rem', color: '#0D0D0D'}}>Email Us</h3>
            <p style={{color: '#666', marginBottom: '1rem'}}>We'll respond within 24 hours</p>
            <a href="mailto:support@feasto.com" style={{
              color: '#FFB800',
              fontWeight: 600,
              textDecoration: 'none'
            }}>
              support@feasto.com
            </a>
          </div>

          {/* Phone */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: 16,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            textAlign: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{
              width: 70,
              height: 70,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '2rem',
              color: '#0D0D0D'
            }}>
              <i className="fa-solid fa-phone"></i>
            </div>
            <h3 style={{fontSize: '1.3rem', marginBottom: '0.5rem', color: '#0D0D0D'}}>Call Us</h3>
            <p style={{color: '#666', marginBottom: '1rem'}}>Available 24/7</p>
            <a href="tel:+911234567890" style={{
              color: '#FFB800',
              fontWeight: 600,
              textDecoration: 'none'
            }}>
              +91 123-456-7890
            </a>
          </div>

          {/* Live Chat */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: 16,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            textAlign: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{
              width: 70,
              height: 70,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '2rem',
              color: '#0D0D0D'
            }}>
              <i className="fa-solid fa-comments"></i>
            </div>
            <h3 style={{fontSize: '1.3rem', marginBottom: '0.5rem', color: '#0D0D0D'}}>Live Chat</h3>
            <p style={{color: '#666', marginBottom: '1rem'}}>Get instant support</p>
            <button style={{
              background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
              color: '#0D0D0D',
              border: 'none',
              padding: '0.6rem 1.5rem',
              borderRadius: 10,
              fontWeight: 600,
              cursor: 'pointer'
            }}>
              Start Chat
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{
          background: 'white',
          padding: '2.5rem',
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          marginBottom: '3rem'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: '2rem',
            color: '#0D0D0D',
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <i className="fa-solid fa-circle-question" style={{color: '#FFB800'}}></i>
            Frequently Asked Questions
          </h2>

          <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            {[
              {
                q: 'How do I track my order?',
                a: 'You can track your order in real-time from the Orders page. We send you updates via SMS and email at each stage of delivery.'
              },
              {
                q: 'What is the delivery time?',
                a: 'Food delivery typically takes 30-45 minutes, while grocery delivery takes 45-60 minutes depending on your location.'
              },
              {
                q: 'Can I cancel my order?',
                a: 'Yes, you can cancel your order before it is prepared. Once preparation begins, cancellation may not be possible.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit/debit cards, UPI, net banking, and cash on delivery for orders above ₹100.'
              },
              {
                q: 'Do you have a minimum order value?',
                a: 'Yes, the minimum order value is ₹99 for food and ₹149 for groceries.'
              }
            ].map((faq, idx) => (
              <div key={idx} style={{
                padding: '1.5rem',
                background: '#f8f9fa',
                borderRadius: 12,
                borderLeft: '4px solid #FFB800'
              }}>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: '#0D0D0D'
                }}>
                  {faq.q}
                </h4>
                <p style={{color: '#666', margin: 0, lineHeight: 1.6}}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Operating Hours */}
        <div style={{
          background: 'white',
          padding: '2.5rem',
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: '2rem',
            color: '#0D0D0D',
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <i className="fa-solid fa-clock" style={{color: '#FFB800'}}></i>
            Support Hours
          </h2>
          <div style={{fontSize: '1.1rem', color: '#666', lineHeight: 2}}>
            <p><strong style={{color: '#0D0D0D'}}>Customer Support:</strong> 24/7 (All days)</p>
            <p><strong style={{color: '#0D0D0D'}}>Food Delivery:</strong> 7:00 AM - 11:00 PM</p>
            <p><strong style={{color: '#0D0D0D'}}>Grocery Delivery:</strong> 6:00 AM - 10:00 PM</p>
          </div>
        </div>

      </div>
    </div>
  );
}
