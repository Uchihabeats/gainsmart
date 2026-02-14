import './BudgetInput.css'

function BudgetInput({ budget, setBudget, targetCalories, setTargetCalories }) {
  const budgetPresets = [250, 350, 500, 750, 1000]
  const caloriePresets = [2000, 2500, 3000, 3500, 4000]

  return (
    <section className="budget-input">
      <div className="budget-container">
        <div className="input-group">
          <label className="input-label">
            <span className="label-icon">💰</span>
            Daily Budget (PHP)
          </label>
          <div className="input-wrapper">
            <span className="currency">₱</span>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="budget-field"
              min="100"
              max="5000"
            />
          </div>
          <div className="preset-buttons">
            {budgetPresets.map(preset => (
              <button
                key={preset}
                className={`preset-btn ${budget === preset ? 'active' : ''}`}
                onClick={() => setBudget(preset)}
              >
                ₱{preset}
              </button>
            ))}
          </div>
          <p className="input-hint">Average Filipino daily food budget: ₱200-400</p>
        </div>

        <div className="input-group">
          <label className="input-label">
            <span className="label-icon">🔥</span>
            Target Calories
          </label>
          <div className="input-wrapper calories">
            <input
              type="number"
              value={targetCalories}
              onChange={(e) => setTargetCalories(Number(e.target.value))}
              className="budget-field"
              min="1500"
              max="5000"
            />
            <span className="unit">cal</span>
          </div>
          <div className="preset-buttons">
            {caloriePresets.map(preset => (
              <button
                key={preset}
                className={`preset-btn ${targetCalories === preset ? 'active' : ''}`}
                onClick={() => setTargetCalories(preset)}
              >
                {preset}
              </button>
            ))}
          </div>
          <p className="input-hint">Recommended for weight gain: 2500-3500 cal/day</p>
        </div>
      </div>
    </section>
  )
}

export default BudgetInput