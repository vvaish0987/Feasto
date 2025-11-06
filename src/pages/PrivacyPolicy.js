import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Information We Collect',
      content: [
        'Personal information you provide when creating an account (name, email, phone number, address)',
        'Order and delivery information including items purchased, delivery locations, and preferences',
        'Payment information processed through secure payment gateways',
        'Device information and usage data to improve our services',
        'Location data when you use our delivery services'
      ]
    },
    {
      title: 'How We Use Your Information',
      content: [
        'Process and fulfill your food and grocery orders',
        'Communicate with you about orders, deliveries, and account updates',
        'Improve our platform, services, and customer experience',
        'Send promotional offers and personalized recommendations (with your consent)',
        'Ensure platform security and prevent fraudulent activities',
        'Comply with legal obligations and resolve disputes'
      ]
    },
    {
      title: 'Information Sharing',
      content: [
        'Restaurant and grocery partners to fulfill your orders',
        'Delivery personnel to complete deliveries',
        'Payment processors to handle transactions securely',
        'Service providers who assist in operating our platform',
        'Law enforcement or regulatory authorities when legally required',
        'We never sell your personal information to third parties'
      ]
    },
    {
      title: 'Data Security',
      content: [
        'We implement industry-standard security measures to protect your data',
        'Encryption of sensitive information during transmission',
        'Regular security audits and updates to our systems',
        'Restricted access to personal information on a need-to-know basis',
        'Secure storage of payment information with PCI-DSS compliant processors'
      ]
    },
    {
      title: 'Your Rights',
      content: [
        'Access and review your personal information',
        'Request correction of inaccurate or incomplete data',
        'Delete your account and associated data',
        'Opt-out of marketing communications',
        'Request a copy of your data in a portable format',
        'Withdraw consent for data processing where applicable'
      ]
    },
    {
      title: 'Cookies and Tracking',
      content: [
        'We use cookies to enhance your browsing experience',
        'Analytics cookies help us understand how users interact with our platform',
        'Preference cookies remember your settings and choices',
        'You can control cookie preferences through your browser settings',
        'Some features may not function properly if cookies are disabled'
      ]
    },
    {
      title: 'Data Retention',
      content: [
        'We retain your information for as long as your account is active',
        'Order history is maintained for accounting and customer service purposes',
        'You can request deletion of your data at any time',
        'Some information may be retained to comply with legal obligations',
        'Anonymized data may be retained for analytics and service improvement'
      ]
    },
    {
      title: 'Children\'s Privacy',
      content: [
        'Our services are not intended for children under 13 years of age',
        'We do not knowingly collect information from children',
        'If we become aware of data collected from children, we will delete it promptly',
        'Parents or guardians can contact us if they believe their child has provided information'
      ]
    },
    {
      title: 'Changes to This Policy',
      content: [
        'We may update this privacy policy from time to time',
        'We will notify you of significant changes via email or platform notification',
        'Continued use of our services after changes indicates acceptance',
        'The "Last Updated" date at the top reflects the most recent revision'
      ]
    },
    {
      title: 'Contact Us',
      content: [
        'If you have questions about this privacy policy, please contact us at:',
        'Email: privacy@feasto.com',
        'Phone: +91 123-456-7890',
        'Address: 123 Food Street, City, State, ZIP'
      ]
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
        <div style={{maxWidth:1000, margin:'0 auto', position: 'relative', zIndex: 1}}>
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
            <i className="fa-solid fa-shield-halved"></i>
            Privacy Policy
          </h1>
          <p style={{color: '#0D0D0D', fontSize: '1.1rem', margin:0, opacity: 0.9}}>
            Last Updated: January 2024
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div style={{maxWidth:1000, margin:'0 auto 3rem', padding:'0 2rem'}}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <p style={{
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: '#333',
            margin: 0
          }}>
            At Feasto, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our food and grocery delivery platform. Please read this policy carefully to understand our practices regarding your data.
          </p>
        </div>
      </div>

      {/* Policy Sections */}
      <div style={{maxWidth:1000, margin:'0 auto', padding:'0 2rem'}}>
        {sections.map((section, idx) => (
          <div
            key={idx}
            style={{
              background: 'white',
              padding: '2rem',
              borderRadius: 16,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              marginBottom: '2rem',
              borderLeft: '5px solid #FFB800'
            }}
          >
            <h2 style={{
              fontSize: '1.6rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
              color: '#0D0D0D',
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}>
              <span style={{
                width: 35,
                height: 35,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                color: '#0D0D0D',
                fontWeight: 800
              }}>
                {idx + 1}
              </span>
              {section.title}
            </h2>

            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {section.content.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  style={{
                    padding: '0.8rem 0',
                    color: '#555',
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    display: 'flex',
                    gap: 12,
                    alignItems: 'flex-start'
                  }}
                >
                  <i className="fa-solid fa-circle-check" style={{
                    color: '#FFB800',
                    fontSize: '1.1rem',
                    marginTop: 4,
                    flexShrink: 0
                  }}></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Footer Note */}
        <div style={{
          background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
          padding: '2rem',
          borderRadius: 16,
          textAlign: 'center'
        }}>
          <i className="fa-solid fa-lock" style={{
            fontSize: '3rem',
            color: '#0D0D0D',
            marginBottom: '1rem'
          }}></i>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '0.5rem',
            color: '#0D0D0D'
          }}>
            Your Privacy Matters
          </h3>
          <p style={{
            fontSize: '1rem',
            color: '#0D0D0D',
            opacity: 0.9,
            maxWidth: 600,
            margin: '0 auto'
          }}>
            We are committed to maintaining the highest standards of data protection. If you have any concerns about your privacy, please don't hesitate to contact us.
          </p>
        </div>
      </div>
    </div>
  );
}
