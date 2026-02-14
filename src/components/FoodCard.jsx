import './FoodCard.css'

function FoodCard({ food, isCompleted, onToggle }) {
  const categoryColors = {
    breakfast: '#FF9F43',
    lunch: '#2ECC71',
    dinner: '#9B59B6',
    snack: '#F39C12'
  }

  const valueScore = (food.calories / food.pricePHP).toFixed(1)

  return (
    <div className={`food-card ${isCompleted ? 'completed' : ''}`}>
      <div className="food-image">
        <span className="emoji">{food.image}</span>
        <span 
          className="category-badge" 
          style={{ backgroundColor: categoryColors[food.category] }}
        >
          {food.category}
        </span>
        <span className="price-badge">
          ₱{food.pricePHP}
        </span>
      </div>
      
      <div className="food-content">
        <div className="food-header">
          <h3 className="food-name">{food.name}</h3>
          <span className="location-tag">{food.location}</span>
        </div>
        <p className="food-description">{food.description}</p>
        
        {food.aiRecommendation && (
          <div className="ai-recommendation-box">
            <span className="ai-icon">🤖</span>
            <p className="ai-text">{food.aiRecommendation}</p>
          </div>
        )}
        
        <div className="nutrition-grid">
          <div className="nutrition-item">
            <span className="nutrition-value">{food.calories}</span>
            <span className="nutrition-label">cal</span>
          </div>
          <div className="nutrition-item">
            <span className="nutrition-value">{food.protein}g</span>
            <span className="nutrition-label">protein</span>
          </div>
          <div className="nutrition-item">
            <span className="nutrition-value">{food.carbs}g</span>
            <span className="nutrition-label">carbs</span>
          </div>
          <div className="nutrition-item">
            <span className="nutrition-value">{food.fats}g</span>
            <span className="nutrition-label">fats</span>
          </div>
        </div>
        
        <div className="value-score">
          <span className="value-label">Value Score:</span>
          <span className="value-number">{valueScore}</span>
          <span className="value-unit">cal/₱</span>
        </div>
        
        <button 
          className={`complete-btn ${isCompleted ? 'completed' : ''}`}
          onClick={onToggle}
        >
          {isCompleted ? '✓ Completed' : 'Mark as Eaten'}
        </button>
      </div>
    </div>
  )
}

export default FoodCard