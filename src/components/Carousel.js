import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';

const carouselImages = [
  {
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200',
    alt: 'Delicious Restaurant Food'
  },
  {
    url: 'https://images.unsplash.com/photo-1543352634-99a5d50ae78e?auto=format&fit=crop&q=80&w=1200',
    alt: 'Gourmet Meals'
  },
  {
    url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200',
    alt: 'Fresh Groceries'
  },
  {
    url: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&q=80&w=1200',
    alt: 'Quality Essentials'
  },
  {
    url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=1200',
    alt: 'Fresh Food Delivery'
  }
];

export default function Carousel({ onAdd, onBuyNow }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const carouselStyle = {
    position: 'relative',
    width: '100vw',
    height: '75vh',
    overflow: 'hidden',
    background: '#000',
    marginLeft: 'calc(-50vw + 50%)',
    marginRight: 'calc(-50vw + 50%)',
    marginBottom: '2rem'
  };

  const slideStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    transition: 'opacity 0.5s ease-in-out',
  };

  const searchContainerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '800px',
    zIndex: 3,
    padding: '0 1rem'
  };

  const indicatorContainerStyle = {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '8px',
    zIndex: 2,
  };

  const indicatorStyle = (isActive) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: isActive ? '#FFB800' : 'rgba(255, 255, 255, 0.5)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  });

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%)',
    zIndex: 1,
  };

  return (
    <div style={carouselStyle}>
      <div style={overlayStyle} />
      {carouselImages.map((slide, index) => (
        <div
          key={index}
          style={{
            ...slideStyle,
            opacity: currentSlide === index ? 1 : 0,
          }}
        >
          <img
            src={slide.url}
            alt={slide.alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            loading="eager"
            onError={(e) => {
              e.target.style.display = 'none';
              console.error(`Failed to load image: ${slide.url}`);
            }}
          />
        </div>
      ))}
      <div style={searchContainerStyle} className="fade-in">
        <SearchBar 
          onAdd={onAdd} 
          onBuyNow={onBuyNow}
        />
      </div>
      <div style={{...indicatorContainerStyle, bottom: '1rem'}}>
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={indicatorStyle(currentSlide === index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}