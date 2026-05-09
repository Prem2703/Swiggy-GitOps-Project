import React, { useState } from 'react';
import './RestaurentOnline.css';

const allRestaurants = [
  {
    id: 1, name: "Pizza Palace", emoji: "🍕", rating: "4.5",
    time: "25-30", price: "₹200", tags: "Pizza, Italian, Pasta",
    offer: "20% OFF", category: "Pizza", color: "#fff3e8",
    menu: [
      {
        section: "Bestsellers", items: [
          { name: "Margherita Pizza", desc: "Classic tomato sauce, mozzarella", price: 199, emoji: "🍕", veg: true },
          { name: "Pepperoni Pizza", desc: "Loaded with pepperoni slices", price: 299, emoji: "🍕", veg: false },
          { name: "BBQ Chicken Pizza", desc: "Grilled chicken, BBQ sauce", price: 349, emoji: "🍕", veg: false },
          { name: "Paneer Tikka Pizza", desc: "Spicy paneer, capsicum", price: 279, emoji: "🍕", veg: true },
        ]
      },
      {
        section: "Sides", items: [
          { name: "Garlic Bread", desc: "Crispy with herb butter", price: 99, emoji: "🍞", veg: true },
          { name: "Penne Arrabiata", desc: "Spicy tomato pasta", price: 179, emoji: "🍝", veg: true },
        ]
      }
    ]
  },
  {
    id: 2, name: "Burger Barn", emoji: "🍔", rating: "4.3",
    time: "20-25", price: "₹150", tags: "Burger, American, Fries",
    offer: "Buy 2 Get 1", category: "Burger", color: "#fff0f0",
    menu: [
      {
        section: "Burgers", items: [
          { name: "Classic Chicken Burger", desc: "Juicy chicken patty, lettuce, mayo", price: 149, emoji: "🍔", veg: false },
          { name: "Veggie Delight Burger", desc: "Crispy veg patty, fresh veggies", price: 119, emoji: "🍔", veg: true },
          { name: "Double Cheese Burger", desc: "Double patty, extra cheese", price: 199, emoji: "🍔", veg: false },
          { name: "Paneer Burger", desc: "Grilled paneer, spicy sauce", price: 139, emoji: "🍔", veg: true },
        ]
      },
      {
        section: "Sides & Drinks", items: [
          { name: "Crispy Fries", desc: "Salted golden fries", price: 79, emoji: "🍟", veg: true },
          { name: "Coleslaw", desc: "Creamy coleslaw", price: 59, emoji: "🥗", veg: true },
        ]
      }
    ]
  },
  {
    id: 3, name: "Biryani House", emoji: "🍛", rating: "4.7",
    time: "35-40", price: "₹300", tags: "Biryani, Mughlai, North Indian",
    offer: "FREE Delivery", category: "Biryani", color: "#f0fff4",
    menu: [
      {
        section: "Biryani", items: [
          { name: "Chicken Dum Biryani", desc: "Slow cooked, aromatic spices", price: 249, emoji: "🍛", veg: false },
          { name: "Mutton Biryani", desc: "Tender mutton, saffron rice", price: 329, emoji: "🍛", veg: false },
          { name: "Veg Dum Biryani", desc: "Mixed veggies, basmati rice", price: 199, emoji: "🍛", veg: true },
          { name: "Paneer Biryani", desc: "Soft paneer, fragrant rice", price: 219, emoji: "🍛", veg: true },
        ]
      },
      {
        section: "Starters", items: [
          { name: "Chicken 65", desc: "Spicy deep fried chicken", price: 179, emoji: "🍗", veg: false },
          { name: "Veg Seekh Kebab", desc: "Minced veggies, spices", price: 149, emoji: "🍢", veg: true },
        ]
      }
    ]
  },
  {
    id: 4, name: "Dragon Chinese", emoji: "🍜", rating: "4.2",
    time: "30-35", price: "₹250", tags: "Chinese, Asian, Noodles",
    offer: "15% OFF on ₹300+", category: "Chinese", color: "#f0f8ff",
    menu: [
      {
        section: "Noodles & Rice", items: [
          { name: "Chicken Hakka Noodles", desc: "Wok tossed with veggies", price: 179, emoji: "🍜", veg: false },
          { name: "Veg Fried Rice", desc: "Mixed veggies, soy sauce", price: 149, emoji: "🍚", veg: true },
          { name: "Chicken Fried Rice", desc: "Egg, chicken, spring onion", price: 189, emoji: "🍚", veg: false },
        ]
      },
      {
        section: "Starters", items: [
          { name: "Chicken Manchurian", desc: "Crispy in manchurian sauce", price: 199, emoji: "🍗", veg: false },
          { name: "Crispy Spring Rolls", desc: "Golden fried spring rolls", price: 129, emoji: "🥟", veg: true },
          { name: "Chilli Paneer", desc: "Spicy paneer tossed in sauce", price: 169, emoji: "🧀", veg: true },
        ]
      }
    ]
  },
  {
    id: 5, name: "Sweet Treats", emoji: "🍰", rating: "4.6",
    time: "20-25", price: "₹200", tags: "Desserts, Cakes, Ice Cream",
    offer: "Free ice cream on ₹250+", category: "Dessert", color: "#fff8e1",
    menu: [
      {
        section: "Cakes & Pastries", items: [
          { name: "Chocolate Truffle Cake", desc: "Rich dark chocolate", price: 89, emoji: "🎂", veg: true },
          { name: "Red Velvet Pastry", desc: "Creamy cheese frosting", price: 79, emoji: "🍰", veg: true },
          { name: "Black Forest Slice", desc: "Cherries and cream", price: 69, emoji: "🍰", veg: true },
        ]
      },
      {
        section: "Ice Creams", items: [
          { name: "Belgian Choco Scoop", desc: "Double scoop", price: 99, emoji: "🍦", veg: true },
          { name: "Mango Kulfi", desc: "Traditional Indian style", price: 79, emoji: "🍧", veg: true },
        ]
      }
    ]
  },
  {
    id: 6, name: "Dosa Darbar", emoji: "🥘", rating: "4.4",
    time: "25-30", price: "₹180", tags: "South Indian, Dosa, Idli",
    offer: "10% OFF", category: "South Indian", color: "#f5fff0",
    menu: [
      {
        section: "Dosas", items: [
          { name: "Masala Dosa", desc: "Crispy dosa with potato masala", price: 89, emoji: "🥘", veg: true },
          { name: "Ghee Roast Dosa", desc: "Buttery crisp dosa", price: 99, emoji: "🥘", veg: true },
          { name: "Onion Rava Dosa", desc: "Crispy semolina dosa", price: 109, emoji: "🥘", veg: true },
        ]
      },
      {
        section: "Idli & Vada", items: [
          { name: "Idli Sambar (3 pcs)", desc: "Soft idlis with sambar & chutney", price: 69, emoji: "🍽️", veg: true },
          { name: "Medu Vada (2 pcs)", desc: "Crispy lentil donuts", price: 59, emoji: "🍩", veg: true },
          { name: "Pongal", desc: "Rice & lentil comfort bowl", price: 79, emoji: "🍲", veg: true },
        ]
      }
    ]
  },
];

function RestaurentOnline({ searchQuery, categoryFilter, cart, onAddToCart, onChangeQty, onCartOpen }) {
  const [selectedRest, setSelectedRest] = useState(null);

  const filtered = allRestaurants.filter(r => {
    const matchSearch = !searchQuery ||
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = !categoryFilter || categoryFilter === 'all' ||
      r.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const getCartItem = (restId, name) =>
    cart.find(c => c.name === name && c.restId === restId);

  const handleAddClick = (e, restId, name, emoji, price) => {
    e.stopPropagation();
    onAddToCart(restId, name, emoji, price);
  };

  const handleQtyClick = (e, restId, name, price, delta) => {
    e.stopPropagation();
    onChangeQty(restId, name, price, delta);
  };

  return (
    <div className="restaurants-section">
      <h2 className="section-title">
        {categoryFilter && categoryFilter !== 'all'
          ? `${categoryFilter} Restaurants`
          : 'Top Restaurants Near You'}
      </h2>

      {filtered.length === 0 ? (
        <div className="no-results">
          😔 No restaurants found. Try a different search!
        </div>
      ) : (
        <div className="restaurants-grid">
          {filtered.map(r => (
            <div
              key={r.id}
              className="restaurant-card"
              onClick={() => setSelectedRest(r)}
            >
              <div className="restaurant-img" style={{ background: r.color }}>
                <span className="restaurant-emoji">{r.emoji}</span>
                <span className="restaurant-badge">{r.offer}</span>
              </div>
              <div className="restaurant-info">
                <div className="restaurant-name">{r.name}</div>
                <div className="restaurant-meta">
                  <span className="rating">★ {r.rating}</span>
                  <span>🕒 {r.time} mins</span>
                  <span>💰 {r.price}</span>
                </div>
                <div className="restaurant-tags">{r.tags}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MENU MODAL */}
      {selectedRest && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedRest(null)}
        >
          <div
            className="modal"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2>{selectedRest.emoji} {selectedRest.name}</h2>
                <p>★ {selectedRest.rating} • {selectedRest.time} mins • {selectedRest.price} for two</p>
              </div>
              <button
                className="modal-close"
                onClick={() => setSelectedRest(null)}
              >✕</button>
            </div>

            <div className="modal-body">
              {selectedRest.menu.map(section => (
                <div key={section.section} className="menu-section">
                  <div className="menu-section-title">{section.section}</div>
                  {section.items.map(item => {
                    const cartItem = getCartItem(selectedRest.id, item.name);
                    return (
                      <div key={item.name} className="menu-item">
                        <div className="menu-item-info">
                          <div className="menu-item-name">
                            <span className={item.veg ? 'veg-icon' : 'nonveg-icon'}>
                              <span className={item.veg ? 'veg-dot' : 'nonveg-dot'}></span>
                            </span>
                            {item.name}
                          </div>
                          <div className="menu-item-desc">{item.desc}</div>
                          <div className="menu-item-price">₹{item.price}</div>
                        </div>
                        <div className="menu-item-right">
                          <div className="menu-item-emoji">{item.emoji}</div>
                          {cartItem ? (
                            <div className="qty-controls">
                              <button
                                className="qty-btn"
                                onClick={e => handleQtyClick(e, selectedRest.id, item.name, item.price, -1)}
                              >-</button>
                              <span className="qty-num">{cartItem.qty}</span>
                              <button
                                className="qty-btn"
                                onClick={e => handleQtyClick(e, selectedRest.id, item.name, item.price, 1)}
                              >+</button>
                            </div>
                          ) : (
                            <button
                              className="add-btn"
                              onClick={e => handleAddClick(e, selectedRest.id, item.name, item.emoji, item.price)}
                            >ADD</button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* CART SUMMARY IN MODAL */}
            {cart.filter(c => c.restId === selectedRest.id).length > 0 && (
              <div className="modal-cart-bar">
                <span>
                  {cart.filter(c => c.restId === selectedRest.id).reduce((a, c) => a + c.qty, 0)} items
                  | ₹{cart.filter(c => c.restId === selectedRest.id).reduce((a, c) => a + c.price * c.qty, 0)}
                </span>
                <button
                  className="view-cart-btn"
                  onClick={() => {
                    setSelectedRest(null);
                    onCartOpen();
                  }}
                >
                  View Cart →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default RestaurentOnline;