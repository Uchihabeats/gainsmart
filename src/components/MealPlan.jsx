import { useState } from 'react'
import './MealPlan.css'

function MealPlan({ foods, dailyBudget }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isExpanded, setIsExpanded] = useState(false)
  const [priceFilter, setPriceFilter] = useState('all')

  const categories = ['all', 'breakfast', 'lunch', 'dinner', 'snack']
  
  const priceRanges = [
    { key: 'all', label: 'All Prices' },
    { key: 'budget', label: `Under ₱${Math.round(dailyBudget * 0.25)}` },
    { key: 'mid', label: `₱${Math.round(dailyBudget * 0.25)} - ₱${Math.round(dailyBudget * 0.4)}` },
    { key: 'premium', label: `Above ₱${Math.round(dailyBudget * 0.4)}` }
  ]

  const getPriceRange = (price) => {
    if (price < dailyBudget * 0.25) return 'budget'
    if (price <= dailyBudget * 0.4) return 'mid'
    return 'premium'
  }
  
  const filteredFoods = foods.filter(food => {
    const categoryMatch = selectedCategory === 'all' || food.category === selectedCategory
    const priceMatch = priceFilter === 'all' || getPriceRange(food.pricePHP) === priceFilter
    return categoryMatch && priceMatch
  })

  const categoryColors = {
    all: '#6366F1',
    breakfast: '#FF9F43',
    lunch: '#2ECC71',
    dinner: '#9B59B6',
    snack: '#F39C12'
  }

  return (
    <section className="meal-plan">
      <div className="meal-plan-header">
        <h2 className="section-title">🇵🇭 Filipino Food Database</h2>
        <button 
          className="toggle-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Hide Foods' : `View All ${foods.length} Foods`}
        </button>
      </div>

      {isExpanded && (
        <>
          <div className="filters-container">
            <div className="category-filter">
              <span className="filter-label">Meal Type:</span>
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    backgroundColor: selectedCategory === category ? categoryColors[category] : 'transparent',
                    color: selectedCategory === category ? 'white' : categoryColors[category]
                  }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            <div className="price-filter">
              <span className="filter-label">Price Range:</span>
              {priceRanges.map(range => (
                <button
                  key={range.key}
                  className={`filter-btn ${priceFilter === range.key ? 'active' : ''}`}
                  onClick={() => setPriceFilter(range.key)}
                  style={{
                    backgroundColor: priceFilter === range.key ? '#10B981' : 'transparent',
                    color: priceFilter === range.key ? 'white' : '#10B981'
                  }}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          <div className="food-stats">
            <span className="stats-text">Showing {filteredFoods.length} of {foods.length} foods</span>
            <span className="budget-context">Optimized for ₱{dailyBudget} daily budget</span>
          </div>

          <div className="food-grid">
            {filteredFoods.map(food => (
              <div key={food.id} className="food-mini-card">
                <span className="food-mini-emoji">{food.image}</span>
                <div className="food-mini-info">
                  <span className="food-mini-name">{food.name}</span>
                  <div className="food-mini-details">
                    <span className="food-mini-cals">{food.calories} cal</span>
                    <span className="food-mini-price">₱{food.pricePHP}</span>
                    <span className="food-mini-value">{(food.calories/food.pricePHP).toFixed(1)} cal/₱</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default MealPlan