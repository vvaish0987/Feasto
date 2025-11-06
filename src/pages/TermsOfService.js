import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TermsOfService() {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Acceptance of Terms',
      content: [
        'By accessing or using Feasto\'s services, you agree to be bound by these Terms of Service',
        'If you do not agree with any part of these terms, you may not use our services',
        'We reserve the right to modify these terms at any time with notice',
        'Continued use of our services after changes constitutes acceptance of new terms',
        'You must be at least 18 years old to use our services'
      ]
    },
    {
      title: 'User Account',
      content: [
        'You are responsible for maintaining the confidentiality of your account credentials',
        'You must provide accurate and complete information when creating an account',
        'You are responsible for all activities that occur under your account',
        'Notify us immediately of any unauthorized use of your account',
        'We reserve the right to suspend or terminate accounts that violate our terms',
        'One account per person; multiple accounts may result in suspension'
      ]
    },
    {
      title: 'Orders and Payments',
      content: [
        'All orders are subject to acceptance and availability',
        'Prices are subject to change without prior notice',
        'We reserve the right to refuse or cancel orders at our discretion',
        'Payment must be made at the time of order placement',
        'All prices include applicable taxes unless otherwise stated',
        'Refunds will be processed according to our refund policy'
      ]
    },
    {
      title: 'Delivery Terms',
      content: [
        'Delivery times are estimates and not guaranteed',
        'You must provide accurate delivery information',
        'We are not responsible for delays due to circumstances beyond our control',
        'Failed deliveries due to incorrect information may not be eligible for refunds',
        'You must be available to receive deliveries during the specified time',
        'Delivery charges are separate from product prices'
      ]
    },
    {
      title: 'Cancellation and Refunds',
      content: [
        'Orders can be cancelled within specified time frames',
        'Cancellation fees may apply depending on order status',
        'Refunds will be processed to the original payment method',
        'Processing time for refunds may vary by payment method',
        'Partial refunds may be issued for partial order cancellations',
        'Contact customer support for cancellation requests'
      ]
    },
    {
      title: 'Product Information',
      content: [
        'We strive to provide accurate product descriptions and images',
        'Actual products may vary slightly from images shown',
        'Product availability is subject to change without notice',
        'We are not responsible for minor variations in product specifications',
        'Allergen and nutritional information is provided by restaurant and grocery partners',
        'Always check product details before ordering'
      ]
    },
    {
      title: 'User Conduct',
      content: [
        'You agree not to use our platform for any unlawful purposes',
        'You must not abuse, harass, or threaten delivery personnel or support staff',
        'Fraudulent activities will result in account termination and legal action',
        'You must not attempt to interfere with the platform\'s functionality',
        'Respect intellectual property rights of all content on the platform',
        'Reviews and ratings must be honest and not misleading'
      ]
    },
    {
      title: 'Intellectual Property',
      content: [
        'All content on Feasto is owned by us or our licensors',
        'You may not reproduce, distribute, or modify our content without permission',
        'Trademarks, logos, and service marks are protected',
        'User-generated content may be used by Feasto for promotional purposes',
        'You retain ownership of content you submit but grant us a license to use it',
        'Report any intellectual property violations to our legal team'
      ]
    },
    {
      title: 'Limitation of Liability',
      content: [
        'Feasto is not liable for indirect, incidental, or consequential damages',
        'Our liability is limited to the amount paid for the specific order',
        'We are not responsible for issues arising from third-party products or services',
        'Food quality and safety are the responsibility of restaurant partners',
        'We do not guarantee uninterrupted or error-free service',
        'Use our services at your own risk'
      ]
    },
    {
      title: 'Indemnification',
      content: [
        'You agree to indemnify Feasto against claims arising from your use of the service',
        'This includes legal fees and damages resulting from your violations',
        'You are responsible for any claims related to your account activity',
        'Indemnification obligations survive termination of these terms'
      ]
    },
    {
      title: 'Third-Party Links',
      content: [
        'Our platform may contain links to third-party websites or services',
        'We are not responsible for content on external websites',
        'Your use of third-party services is subject to their own terms',
        'We do not endorse or guarantee third-party products or services'
      ]
    },
    {
      title: 'Dispute Resolution',
      content: [
        'Any disputes will be governed by the laws of our jurisdiction',
        'We encourage resolving disputes through customer support first',
        'Arbitration may be required for unresolved disputes',
        'Class action lawsuits are waived by using our services',
        'Legal proceedings must be filed within one year of the dispute arising'
      ]
    },
    {
      title: 'Termination',
      content: [
        'We may terminate or suspend your account at any time for violations',
        'You may close your account at any time through account settings',
        'Upon termination, your right to use the service ceases immediately',
        'Provisions that should survive termination will remain in effect',
        'Outstanding balances must be settled before account closure'
      ]
    },
    {
      title: 'Contact Information',
      content: [
        'For questions about these Terms of Service, contact us at:',
        'Email: legal@feasto.com',
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
            <i className="fa-solid fa-file-contract"></i>
            Terms of Service
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
            Welcome to Feasto! These Terms of Service ("Terms") govern your use of our food and grocery delivery platform. By using our services, you enter into a legally binding agreement with Feasto. Please read these terms carefully before using our platform.
          </p>
        </div>
      </div>

      {/* Terms Sections */}
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

        {/* Acceptance Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
          padding: '2rem',
          borderRadius: 16,
          textAlign: 'center'
        }}>
          <i className="fa-solid fa-handshake" style={{
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
            By Using Feasto, You Agree to These Terms
          </h3>
          <p style={{
            fontSize: '1rem',
            color: '#0D0D0D',
            opacity: 0.9,
            maxWidth: 600,
            margin: '0 auto'
          }}>
            If you have any questions about these terms, please contact our legal team. Thank you for choosing Feasto!
          </p>
        </div>
      </div>
    </div>
  );
}
