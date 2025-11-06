import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ContactUs() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

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
            <i className="fa-solid fa-envelope"></i>
            Contact Us
          </h1>
          <p style={{color: '#0D0D0D', fontSize: '1.1rem', margin:0, opacity: 0.9}}>
            We'd love to hear from you
          </p>
        </div>
      </div>

      <div style={{maxWidth:1200, margin:'0 auto', padding:'0 2rem'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap: 30}}>
          
          {/* Contact Form */}
          <div style={{gridColumn: 'span 2'}}>
            <div style={{
              background: 'white',
              padding: '2.5rem',
              borderRadius: 16,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <h2 style={{
                fontSize: '1.8rem',
                fontWeight: 700,
                marginBottom: '1.5rem',
                color: '#0D0D0D'
              }}>
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit}>
                <div style={{marginBottom: '1.5rem'}}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                    color: '#0D0D0D'
                  }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      border: '2px solid #e0e0e0',
                      borderRadius: 10,
                      fontSize: '1rem',
                      fontFamily: 'Poppins, sans-serif',
                      outline: 'none',
                      transition: 'border 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.border = '2px solid #FFB800'}
                    onBlur={(e) => e.target.style.border = '2px solid #e0e0e0'}
                  />
                </div>

                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem'}}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: 600,
                      color: '#0D0D0D'
                    }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        border: '2px solid #e0e0e0',
                        borderRadius: 10,
                        fontSize: '1rem',
                        fontFamily: 'Poppins, sans-serif',
                        outline: 'none',
                        transition: 'border 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.border = '2px solid #FFB800'}
                      onBlur={(e) => e.target.style.border = '2px solid #e0e0e0'}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: 600,
                      color: '#0D0D0D'
                    }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        border: '2px solid #e0e0e0',
                        borderRadius: 10,
                        fontSize: '1rem',
                        fontFamily: 'Poppins, sans-serif',
                        outline: 'none',
                        transition: 'border 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.border = '2px solid #FFB800'}
                      onBlur={(e) => e.target.style.border = '2px solid #e0e0e0'}
                    />
                  </div>
                </div>

                <div style={{marginBottom: '1.5rem'}}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                    color: '#0D0D0D'
                  }}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      border: '2px solid #e0e0e0',
                      borderRadius: 10,
                      fontSize: '1rem',
                      fontFamily: 'Poppins, sans-serif',
                      outline: 'none',
                      transition: 'border 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.border = '2px solid #FFB800'}
                    onBlur={(e) => e.target.style.border = '2px solid #e0e0e0'}
                  />
                </div>

                <div style={{marginBottom: '1.5rem'}}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                    color: '#0D0D0D'
                  }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      border: '2px solid #e0e0e0',
                      borderRadius: 10,
                      fontSize: '1rem',
                      fontFamily: 'Poppins, sans-serif',
                      outline: 'none',
                      resize: 'vertical',
                      transition: 'border 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.border = '2px solid #FFB800'}
                    onBlur={(e) => e.target.style.border = '2px solid #e0e0e0'}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
                    color: '#0D0D0D',
                    border: 'none',
                    padding: '1rem 2.5rem',
                    borderRadius: 12,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    width: '100%',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(255,184,0,0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(255,184,0,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(255,184,0,0.3)';
                  }}
                >
                  <i className="fa-solid fa-paper-plane" style={{marginRight: 10}}></i>
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: 16,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '1.5rem',
                color: '#0D0D0D'
              }}>
                Get in Touch
              </h3>

              <div style={{marginBottom: '1.5rem'}}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 15,
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: 45,
                    height: 45,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    color: '#0D0D0D'
                  }}>
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div>
                    <p style={{margin: 0, fontWeight: 600, color: '#0D0D0D'}}>Email</p>
                    <p style={{margin: 0, color: '#666', fontSize: '0.9rem'}}>support@feasto.com</p>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 15,
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: 45,
                    height: 45,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    color: '#0D0D0D'
                  }}>
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div>
                    <p style={{margin: 0, fontWeight: 600, color: '#0D0D0D'}}>Phone</p>
                    <p style={{margin: 0, color: '#666', fontSize: '0.9rem'}}>+91 123-456-7890</p>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 15
                }}>
                  <div style={{
                    width: 45,
                    height: 45,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    color: '#0D0D0D'
                  }}>
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div>
                    <p style={{margin: 0, fontWeight: 600, color: '#0D0D0D'}}>Address</p>
                    <p style={{margin: 0, color: '#666', fontSize: '0.9rem'}}>123 Food Street, City</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: 16,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '1.5rem',
                color: '#0D0D0D'
              }}>
                Follow Us
              </h3>

              <div style={{
                display: 'flex',
                gap: 15,
                flexWrap: 'wrap'
              }}>
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <div
                    key={social}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.3rem',
                      color: '#0D0D0D',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(255,184,0,0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <i className={`fa-brands fa-${social}`}></i>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
