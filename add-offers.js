// Script to add offers field to all food and grocery items
const fs = require('fs');
const path = require('path');

// Read the current data files
const foodFilePath = path.join(__dirname, 'src', 'data', 'food-items.json');
const groceryFilePath = path.join(__dirname, 'src', 'data', 'grocery-items.json');

const foodData = JSON.parse(fs.readFileSync(foodFilePath, 'utf8'));
const groceryData = JSON.parse(fs.readFileSync(groceryFilePath, 'utf8'));

// Define offer patterns
const offerTypes = [
  { discount: 10, text: "10% OFF", type: "percentage" },
  { discount: 15, text: "15% OFF", type: "percentage" },
  { discount: 20, text: "20% OFF", type: "percentage" },
  { discount: 25, text: "25% OFF", type: "percentage" },
  { discount: 30, text: "30% OFF", type: "percentage" },
  { discount: 0, text: "Buy 1 Get 1 FREE", type: "bogo" },
  { discount: 0, text: "Free Delivery", type: "free_delivery" },
  { discount: 0, text: "Chef's Special", type: "special" },
  { discount: 50, text: "Flat ₹50 OFF", type: "flat_amount" },
  { discount: 0, text: "New Item Special", type: "new_item" }
];

// Special category-based offers
const categoryOffers = {
  "Pizza": [
    { discount: 20, text: "20% OFF", type: "percentage" },
    { discount: 0, text: "Buy 1 Get 1 FREE", type: "bogo" }
  ],
  "North Indian": [
    { discount: 15, text: "15% OFF", type: "percentage" },
    { discount: 0, text: "Chef's Special", type: "special" }
  ],
  "Desserts": [
    { discount: 25, text: "25% OFF", type: "percentage" },
    { discount: 0, text: "Sweet Deal", type: "special" }
  ],
  "Fruits": [
    { discount: 10, text: "10% OFF", type: "percentage" },
    { discount: 0, text: "Fresh Deal", type: "special" }
  ],
  "Dairy": [
    { discount: 15, text: "15% OFF", type: "percentage" },
    { discount: 0, text: "Daily Fresh", type: "special" }
  ],
  "Spices": [
    { discount: 20, text: "20% OFF", type: "percentage" },
    { discount: 0, text: "Flavor Boost", type: "special" }
  ]
};

// Function to get random offer for an item
function getRandomOffer(item) {
  // 70% chance of having an offer, 30% no offer
  if (Math.random() < 0.3) {
    return null; // No offer
  }

  let availableOffers = [];
  
  // Check for category-specific offers first
  if (categoryOffers[item.category]) {
    availableOffers = [...categoryOffers[item.category]];
  } else {
    availableOffers = [...offerTypes];
  }

  // For expensive items (>200), prefer percentage discounts
  if (item.price > 200) {
    availableOffers = availableOffers.filter(offer => 
      offer.type === 'percentage' || offer.type === 'special'
    );
  }

  // For cheaper items (<100), prefer flat discounts or special offers
  if (item.price < 100) {
    availableOffers = availableOffers.filter(offer => 
      offer.type !== 'percentage' || offer.discount <= 15
    );
  }

  // Select random offer
  const randomOffer = availableOffers[Math.floor(Math.random() * availableOffers.length)];
  
  return {
    hasOffer: true,
    offerText: randomOffer.text,
    discountType: randomOffer.type,
    discountValue: randomOffer.discount,
    originalPrice: item.price,
    // Calculate discounted price for percentage discounts
    discountedPrice: randomOffer.type === 'percentage' 
      ? Math.round(item.price * (1 - randomOffer.discount / 100))
      : randomOffer.type === 'flat_amount'
      ? Math.max(item.price - randomOffer.discount, Math.round(item.price * 0.5)) // Min 50% of original price
      : item.price
  };
}

// Update food items with offers
console.log('🍕 Adding offers to food items...');
Object.keys(foodData).forEach(key => {
  const item = foodData[key];
  const offer = getRandomOffer(item);
  
  if (offer) {
    foodData[key].offer = offer;
  } else {
    foodData[key].offer = {
      hasOffer: false,
      offerText: null,
      discountType: null,
      discountValue: 0,
      originalPrice: item.price,
      discountedPrice: item.price
    };
  }
});

// Update grocery items with offers
console.log('🥕 Adding offers to grocery items...');
Object.keys(groceryData).forEach(key => {
  const item = groceryData[key];
  const offer = getRandomOffer(item);
  
  if (offer) {
    groceryData[key].offer = offer;
  } else {
    groceryData[key].offer = {
      hasOffer: false,
      offerText: null,
      discountType: null,
      discountValue: 0,
      originalPrice: item.price,
      discountedPrice: item.price
    };
  }
});

// Write updated data back to files
fs.writeFileSync(foodFilePath, JSON.stringify(foodData, null, 2));
fs.writeFileSync(groceryFilePath, JSON.stringify(groceryData, null, 2));

// Calculate statistics
const foodWithOffers = Object.values(foodData).filter(item => item.offer.hasOffer).length;
const groceryWithOffers = Object.values(groceryData).filter(item => item.offer.hasOffer).length;
const totalFoodItems = Object.keys(foodData).length;
const totalGroceryItems = Object.keys(groceryData).length;

console.log('✅ Successfully added offers to all items!');
console.log('📊 Statistics:');
console.log(`   🍕 Food Items: ${foodWithOffers}/${totalFoodItems} have offers`);
console.log(`   🥕 Grocery Items: ${groceryWithOffers}/${totalGroceryItems} have offers`);
console.log(`   💰 Total Items with Offers: ${foodWithOffers + groceryWithOffers}`);
console.log(`   📈 Offer Coverage: ${Math.round(((foodWithOffers + groceryWithOffers) / (totalFoodItems + totalGroceryItems)) * 100)}%`);

// Show some examples
console.log('\n🎯 Sample Offers:');
const sampleFoodOffers = Object.values(foodData).filter(item => item.offer.hasOffer).slice(0, 3);
const sampleGroceryOffers = Object.values(groceryData).filter(item => item.offer.hasOffer).slice(0, 3);

sampleFoodOffers.forEach(item => {
  console.log(`   🍽️ ${item.name}: ${item.offer.offerText} (₹${item.offer.originalPrice} → ₹${item.offer.discountedPrice})`);
});

sampleGroceryOffers.forEach(item => {
  console.log(`   🛒 ${item.name}: ${item.offer.offerText} (₹${item.offer.originalPrice} → ₹${item.offer.discountedPrice})`);
});