import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const footerStyle = {
    background: 'linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 100%)',
    color: '#fff',
    padding: '4rem 2rem 2rem',
    marginTop: '4rem'
  };

  const containerStyle = {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem'
  };

  const sectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  };

  const titleStyle = {
    fontSize: '1.3rem',
    fontWeight: 700,
    color: 'var(--primary-color)',
    fontFamily: 'Montserrat, sans-serif',
    marginBottom: '0.5rem'
  };

  const linkStyle = {
    color: 'rgba(255, 255, 255, 0.7)',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    padding: '0.3rem 0',
    fontSize: '0.95rem'
  };

  const socialIconStyle = {
    width: 45,
    height: 45,
    borderRadius: '50%',
    background: 'rgba(255, 184, 0, 0.1)',
    border: '2px solid rgba(255, 184, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    color: 'var(--primary-color)',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const newsletterInputStyle = {
    padding: '0.8rem 1rem',
    borderRadius: 25,
    border: '2px solid rgba(255, 184, 0, 0.3)',
    background: 'rgba(255, 255, 255, 0.05)',
    color: '#fff',
    fontSize: '1rem',
    marginBottom: '1rem',
    width: '100%'
  };

  const subscribeButtonStyle = {
    background: 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
    color: '#0D0D0D',
    border: 'none',
    padding: '0.8rem 2rem',
    borderRadius: 25,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(255, 184, 0, 0.4)',
    fontSize: '1rem',
    fontFamily: 'Poppins, sans-serif'
  };

  const deliveryPartnerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    border: '1px solid rgba(255, 184, 0, 0.2)',
    marginBottom: '0.5rem',
    transition: 'all 0.3s ease'
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        {/* Company Info */}
        <div style={sectionStyle}>
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
            <div style={{
              fontSize: '2rem',
              background: 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
              padding: '0.5rem',
              borderRadius: 12,
              width: 50,
              height: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <i className="fa-solid fa-utensils" style={{color: '#0D0D0D'}}></i>
            </div>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: 'Montserrat, sans-serif'
            }}>
              FEASTO
            </h3>
          </div>
          <p style={{color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6, marginBottom: '1.5rem'}}>
            Your favorite food & groceries, delivered instantly to your doorstep. 
            Experience the future of food delivery with FEASTO.
          </p>
          <div style={{display: 'flex', gap: '1rem'}}>
            <div 
              style={socialIconStyle}
              onMouseEnter={(e) => {
                e.target.style.background = 'var(--primary-color)';
                e.target.style.color = '#0D0D0D';
                e.target.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 184, 0, 0.1)';
                e.target.style.color = 'var(--primary-color)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <i className="fa-brands fa-facebook-f"></i>
            </div>
            <div 
              style={socialIconStyle}
              onMouseEnter={(e) => {
                e.target.style.background = 'var(--primary-color)';
                e.target.style.color = '#0D0D0D';
                e.target.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 184, 0, 0.1)';
                e.target.style.color = 'var(--primary-color)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <i className="fa-brands fa-twitter"></i>
            </div>
            <div 
              style={socialIconStyle}
              onMouseEnter={(e) => {
                e.target.style.background = 'var(--primary-color)';
                e.target.style.color = '#0D0D0D';
                e.target.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 184, 0, 0.1)';
                e.target.style.color = 'var(--primary-color)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <i className="fa-brands fa-instagram"></i>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div style={sectionStyle}>
          <h4 style={titleStyle}>Quick Links</h4>
          <a 
            href="/food" 
            style={linkStyle}
            onMouseEnter={(e) => {
              e.target.style.color = 'var(--primary-color)';
              e.target.style.paddingLeft = '0.5rem';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'rgba(255, 255, 255, 0.7)';
              e.target.style.paddingLeft = '0';
            }}
          >
            Food Delivery
          </a>
          <a 
            href="/grocery" 
            style={linkStyle}
            onMouseEnter={(e) => {
              e.target.style.color = 'var(--primary-color)';
              e.target.style.paddingLeft = '0.5rem';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'rgba(255, 255, 255, 0.7)';
              e.target.style.paddingLeft = '0';
            }}
          >
            Grocery & Essentials
          </a>
          <a 
            href="/orders" 
            style={linkStyle}
            onMouseEnter={(e) => {
              e.target.style.color = 'var(--primary-color)';
              e.target.style.paddingLeft = '0.5rem';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'rgba(255, 255, 255, 0.7)';
              e.target.style.paddingLeft = '0';
            }}
          >
            Track Your Order
          </a>
          <a 
            href="/profile" 
            style={linkStyle}
            onMouseEnter={(e) => {
              e.target.style.color = 'var(--primary-color)';
              e.target.style.paddingLeft = '0.5rem';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'rgba(255, 255, 255, 0.7)';
              e.target.style.paddingLeft = '0';
            }}
          >
            My Profile
          </a>
        </div>

        {/* Customer Support */}
        <div style={sectionStyle}>
          <h4 style={titleStyle}>Support</h4>
          <Link 
            to="/support" 
            style={linkStyle}
            onMouseEnter={(e) => {
              e.target.style.color = 'var(--primary-color)';
              e.target.style.paddingLeft = '0.5rem';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'rgba(255, 255, 255, 0.7)';
              e.target.style.paddingLeft = '0';
            }}
          >
            Support
          </Link>
          <Link 
            to="/help-center" 
            style={linkStyle}
            onMouseEnter={(e) => {
              e.target.style.color = 'var(--primary-color)';
              e.target.style.paddingLeft = '0.5rem';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'rgba(255, 255, 255, 0.7)';
              e.target.style.paddingLeft = '0';
            }}
          >
            Help Center
          </Link>
          <Link 
            to="/contact-us" 
            style={linkStyle}
            onMouseEnter={(e) => {
              e.target.style.color = 'var(--primary-color)';
              e.target.style.paddingLeft = '0.5rem';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'rgba(255, 255, 255, 0.7)';
              e.target.style.paddingLeft = '0';
            }}
          >
            Contact Us
          </Link>
          <Link 
            to="/privacy-policy" 
            style={linkStyle}
            onMouseEnter={(e) => {
              e.target.style.color = 'var(--primary-color)';
              e.target.style.paddingLeft = '0.5rem';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'rgba(255, 255, 255, 0.7)';
              e.target.style.paddingLeft = '0';
            }}
          >
            Privacy Policy
          </Link>
          <Link 
            to="/terms-of-service" 
            style={linkStyle}
            onMouseEnter={(e) => {
              e.target.style.color = 'var(--primary-color)';
              e.target.style.paddingLeft = '0.5rem';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'rgba(255, 255, 255, 0.7)';
              e.target.style.paddingLeft = '0';
            }}
          >
            Terms of Service
          </Link>
        </div>

        {/* Newsletter */}
        <div style={sectionStyle}>
          <h4 style={titleStyle}>Stay Updated</h4>
          <p style={{color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1rem'}}>
            Subscribe to get special offers, free giveaways, and updates!
          </p>
          <input 
            type="email" 
            placeholder="Enter your email"
            style={newsletterInputStyle}
          />
          <button 
            style={subscribeButtonStyle}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(255, 184, 0, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(255, 184, 0, 0.4)';
            }}
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Delivery Partners Section */}
      <div style={{
        borderTop: '1px solid rgba(255, 184, 0, 0.2)',
        marginTop: '3rem',
        paddingTop: '2rem',
        maxWidth: 1200,
        margin: '3rem auto 0',
        textAlign: 'center'
      }}>
        <h4 style={{...titleStyle, marginBottom: '1.5rem'}}>Our Delivery Partners</h4>
        <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap'}}>
          <div 
            style={deliveryPartnerStyle}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 184, 0, 0.1)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <i className="fa-solid fa-motorcycle" style={{fontSize: '1.2rem', color: 'var(--primary-color)'}}></i>
            <span>FastTrack Delivery</span>
          </div>
          <div 
            style={deliveryPartnerStyle}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 184, 0, 0.1)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <i className="fa-solid fa-truck-fast" style={{fontSize: '1.2rem', color: 'var(--primary-color)'}}></i>
            <span>QuickRush</span>
          </div>
          <div 
            style={deliveryPartnerStyle}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 184, 0, 0.1)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <i className="fa-solid fa-bolt" style={{fontSize: '1.2rem', color: 'var(--primary-color)'}}></i>
            <span>Lightning Express</span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={{
        borderTop: '1px solid rgba(255, 184, 0, 0.2)',
        marginTop: '2rem',
        paddingTop: '1.5rem',
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.5)'
      }}>
        <p>
          © 2025 FEASTO. All rights reserved. Made with <i className="fa-solid fa-heart" style={{color: '#FF6B6B', margin: '0 4px'}}></i> for food lovers everywhere.
        </p>
      </div>
    </footer>
  );
}