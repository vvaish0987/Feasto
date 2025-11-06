import React, { useState, useEffect } from 'react';

const FilterSortBar = ({ 
  items, 
  onFilteredItems, 
  type = 'food',
  categories = [],
  restaurants = [] 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filters, setFilters] = useState({
    vegType: 'all', // all, veg, non-veg
    priceRange: 'all', // all, under100, under150, under200, above200
    category: 'all',
    restaurant: 'all', // only for food items
    offers: 'all' // all, with-offers, without-offers
  });
  const [showFilters, setShowFilters] = useState(false);

  // Apply search, sort, and filters
  useEffect(() => {
    let filteredItems = [...items];

    // Search filter
    if (searchTerm.trim()) {
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.hotel && item.hotel.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.brand && item.brand.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Veg/Non-veg filter
    if (filters.vegType !== 'all') {
      filteredItems = filteredItems.filter(item => {
        if (filters.vegType === 'veg') return item.isVeg === true;
        if (filters.vegType === 'non-veg') return item.isVeg === false;
        return true;
      });
    }

    // Price range filter
    if (filters.priceRange !== 'all') {
      filteredItems = filteredItems.filter(item => {
        const price = item.price;
        switch (filters.priceRange) {
          case 'under100': return price < 100;
          case 'under150': return price < 150;
          case 'under200': return price < 200;
          case 'above200': return price >= 200;
          default: return true;
        }
      });
    }

    // Category filter
    if (filters.category !== 'all') {
      filteredItems = filteredItems.filter(item => item.category === filters.category);
    }

    // Restaurant filter (only for food items)
    if (type === 'food' && filters.restaurant !== 'all') {
      filteredItems = filteredItems.filter(item => 
        item.hotel && item.hotel.name === filters.restaurant
      );
    }

    // Offers filter
    if (filters.offers !== 'all') {
      filteredItems = filteredItems.filter(item => {
        const hasOffer = item.offer && item.offer.hasOffer === true;
        if (filters.offers === 'with-offers') return hasOffer;
        if (filters.offers === 'without-offers') return !hasOffer;
        return true;
      });
    }

    // Sorting
    filteredItems.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'stock':
          aValue = a.stock || 0;
          bValue = b.stock || 0;
          break;
        case 'rating':
          aValue = a.rating || 0;
          bValue = b.rating || 0;
          break;
        case 'name':
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    onFilteredItems(filteredItems);
  }, [items, searchTerm, sortBy, sortOrder, filters, onFilteredItems, type]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSortBy('name');
    setSortOrder('asc');
    setFilters({
      vegType: 'all',
      priceRange: 'all',
      category: 'all',
      restaurant: 'all',
      offers: 'all'
    });
  };

  const filterBarStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 184, 0, 0.2)',
    borderRadius: '20px',
    padding: '1.5rem',
    marginBottom: '2rem',
    boxShadow: '0 8px 32px rgba(255, 184, 0, 0.1)',
    position: 'sticky',
    top: '100px',
    zIndex: 10
  };

  const searchInputStyle = {
    width: '100%',
    padding: '12px 20px 12px 45px',
    fontSize: '16px',
    border: '2px solid rgba(255, 184, 0, 0.3)',
    borderRadius: '25px',
    background: 'rgba(255, 255, 255, 0.9)',
    transition: 'all 0.3s ease',
    fontFamily: 'Poppins, sans-serif'
  };

  const selectStyle = {
    padding: '8px 15px',
    borderRadius: '15px',
    border: '2px solid rgba(255, 184, 0, 0.3)',
    background: 'rgba(255, 255, 255, 0.9)',
    color: '#0D0D0D',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const buttonStyle = {
    padding: '8px 16px',
    borderRadius: '15px',
    border: 'none',
    background: 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
    color: '#0D0D0D',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(255, 184, 0, 0.4)'
  };

  const filterToggleStyle = {
    ...buttonStyle,
    background: showFilters ? 'linear-gradient(135deg, #e74c3c, #c0392b)' : 'linear-gradient(135deg, #3498db, #2980b9)'
  };

  // Get unique restaurants from food items
  const uniqueRestaurants = type === 'food' 
    ? [...new Set(items.filter(item => item.hotel).map(item => item.hotel.name))]
    : [];

  return (
    <div style={filterBarStyle}>
      {/* Search Bar */}
      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <div style={{
          position: 'absolute',
          left: '15px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '20px',
          color: '#FFB800'
        }}>
          🔍
        </div>
        <input
          type="text"
          placeholder={`Search ${type}... (name, category, ${type === 'food' ? 'restaurant' : 'brand'})`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
          onFocus={(e) => {
            e.target.style.borderColor = '#FFB800';
            e.target.style.boxShadow = '0 0 15px rgba(255, 184, 0, 0.3)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(255, 184, 0, 0.3)';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>

      {/* Sort and Filter Controls */}
      <div style={{ 
        display: 'flex', 
        gap: '15px', 
        alignItems: 'center', 
        flexWrap: 'wrap',
        marginBottom: showFilters ? '1rem' : '0'
      }}>
        {/* Sort By */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontWeight: 600, color: '#0D0D0D', fontSize: '14px' }}>Sort:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={selectStyle}
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="stock">Stock</option>
            <option value="rating">Rating</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={selectStyle}
          >
            <option value="asc">{sortBy === 'name' ? 'A-Z' : 'Low to High'}</option>
            <option value="desc">{sortBy === 'name' ? 'Z-A' : 'High to Low'}</option>
          </select>
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={filterToggleStyle}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          {showFilters ? '🔽 Hide Filters' : '🔼 Show Filters'}
        </button>

        {/* Clear Filters */}
        <button
          onClick={clearAllFilters}
          style={{
            ...buttonStyle,
            background: 'linear-gradient(135deg, #95a5a6, #7f8c8d)'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          🗑️ Clear All
        </button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          padding: '1rem',
          background: 'rgba(255, 184, 0, 0.05)',
          borderRadius: '15px',
          border: '1px solid rgba(255, 184, 0, 0.2)'
        }}>
          {/* Veg/Non-Veg Filter */}
          <div>
            <label style={{ fontWeight: 600, color: '#0D0D0D', fontSize: '14px', display: 'block', marginBottom: '5px' }}>
              🌱 Diet Type:
            </label>
            <select
              value={filters.vegType}
              onChange={(e) => handleFilterChange('vegType', e.target.value)}
              style={selectStyle}
            >
              <option value="all">All Items</option>
              <option value="veg">🟢 Vegetarian Only</option>
              <option value="non-veg">🔴 Non-Vegetarian Only</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label style={{ fontWeight: 600, color: '#0D0D0D', fontSize: '14px', display: 'block', marginBottom: '5px' }}>
              💰 Price Range:
            </label>
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              style={selectStyle}
            >
              <option value="all">All Prices</option>
              <option value="under100">Under ₹100</option>
              <option value="under150">Under ₹150</option>
              <option value="under200">Under ₹200</option>
              <option value="above200">Above ₹200</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label style={{ fontWeight: 600, color: '#0D0D0D', fontSize: '14px', display: 'block', marginBottom: '5px' }}>
              📂 Category:
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              style={selectStyle}
            >
              <option value="all">All Categories</option>
              {categories.filter(cat => cat !== 'All').map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Restaurant Filter (Food only) */}
          {type === 'food' && uniqueRestaurants.length > 0 && (
            <div>
              <label style={{ fontWeight: 600, color: '#0D0D0D', fontSize: '14px', display: 'block', marginBottom: '5px' }}>
                🏪 Restaurant:
              </label>
              <select
                value={filters.restaurant}
                onChange={(e) => handleFilterChange('restaurant', e.target.value)}
                style={selectStyle}
              >
                <option value="all">All Restaurants</option>
                {uniqueRestaurants.map(restaurant => (
                  <option key={restaurant} value={restaurant}>{restaurant}</option>
                ))}
              </select>
            </div>
          )}

          {/* Offers Filter */}
          <div>
            <label style={{ fontWeight: 600, color: '#0D0D0D', fontSize: '14px', display: 'block', marginBottom: '5px' }}>
              🏷️ Offers:
            </label>
            <select
              value={filters.offers}
              onChange={(e) => handleFilterChange('offers', e.target.value)}
              style={selectStyle}
            >
              <option value="all">All Items</option>
              <option value="with-offers">🎯 With Offers Only</option>
              <option value="without-offers">🚫 Without Offers</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSortBar;