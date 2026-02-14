import './DailyStats.css'

function DailyStats({ 
  totalCalories, 
  consumedCalories, 
  totalProtein, 
  totalCarbs, 
  totalFats,
  completedCount,
  totalMeals,
  totalCost,
  budget
}) {
  const progressPercentage = totalCalories > 0 ? (consumedCalories / totalCalories) * 100 : 0
  const mealProgress = totalMeals > 0 ? (completedCount / totalMeals) * 100 : 0
  const budgetUsed = totalCost || 0
  const budgetPercentage = budget > 0 ? (budgetUsed / budget) * 100 : 0
  const budgetRemaining = budget - budgetUsed

  return (
    <section className="daily-stats">
      <div className="stats-container">
        <div className="main-stat">
          <div className="progress-ring">
            <svg viewBox="0 0 100 100">
              <circle 
                className="progress-ring-bg" 
                cx="50" cy="50" r="45"
              />
              <circle 
                className="progress-ring-fill" 
                cx="50" cy="50" r="45"
                style={{
                  strokeDasharray: `${2 * Math.PI * 45}`,
                  strokeDashoffset: `${2 * Math.PI * 45 * (1 - progressPercentage / 100)}`
                }}
              />
            </svg>
            <div className="progress-text">
              <span className="progress-value">{Math.round(progressPercentage)}%</span>
              <span className="progress-label">Done</span>
            </div>
          </div>
          
          <div className="calorie-info">
            <div className="calorie-main">
              <span className="calorie-consumed">{consumedCalories}</span>
              <span className="calorie-separator">/</span>
              <span className="calorie-total">{totalCalories}</span>
            </div>
            <span className="calorie-label">calories</span>
          </div>
        </div>

        <div className="macro-stats">
          <div className="macro-item protein">
            <div className="macro-icon">💪</div>
            <div className="macro-info">
              <span className="macro-value">{totalProtein}g</span>
              <span className="macro-label">Protein</span>
            </div>
          </div>
          
          <div className="macro-item carbs">
            <div className="macro-icon">🌾</div>
            <div className="macro-info">
              <span className="macro-value">{totalCarbs}g</span>
              <span className="macro-label">Carbs</span>
            </div>
          </div>
          
          <div className="macro-item fats">
            <div className="macro-icon">🥑</div>
            <div className="macro-info">
              <span className="macro-value">{totalFats}g</span>
              <span className="macro-label">Fats</span>
            </div>
          </div>
        </div>

        <div className="budget-section">
          <div className="budget-header">
            <span className="budget-title">💰 Budget Tracker</span>
            <span className="budget-amount">₱{budgetUsed} / ₱{budget}</span>
          </div>
          <div className="budget-progress-bar">
            <div 
              className={`budget-progress-fill ${budgetPercentage > 100 ? 'over-budget' : ''}`}
              style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
            />
          </div>
          <div className="budget-details">
            <span className="budget-remaining">
              {budgetRemaining >= 0 ? (
                <><span className="remaining-amount">₱{budgetRemaining}</span> remaining</>
              ) : (
                <><span className="over-amount">₱{Math.abs(budgetRemaining)}</span> over budget</>
              )}
            </span>
            <span className="budget-percentage">{budgetPercentage.toFixed(0)}% used</span>
          </div>
        </div>

        <div className="meals-progress">
          <div className="meals-progress-header">
            <span className="meals-progress-label">Meals Completed</span>
            <span className="meals-progress-value">{completedCount}/{totalMeals}</span>
          </div>
          <div className="meals-progress-bar">
            <div 
              className="meals-progress-fill" 
              style={{ width: `${mealProgress}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default DailyStats