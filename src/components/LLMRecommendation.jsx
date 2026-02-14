import './LLMRecommendation.css'

function LLMRecommendation({ onGetRecommendations, isLoading, aiAnalysis }) {
  return (
    <section className="llm-recommendation">
      <div className="llm-header">
        <div className="llm-icon">
          <span className="ai-emoji">🤖</span>
        </div>
        <div className="llm-title">
          <h3>Kimi AI Meal Planner</h3>
          <p>Smart recommendations based on your budget & goals</p>
        </div>
      </div>

      {!aiAnalysis && !isLoading && (
        <div className="llm-intro">
          <p className="intro-text">
            Let our AI analyze your budget and recommend the best Filipino foods for healthy weight gain. 
            We consider nutritional value, local prices, and your calorie targets.
          </p>
          <button 
            className="generate-ai-btn"
            onClick={onGetRecommendations}
            disabled={isLoading}
          >
            <span className="btn-icon">✨</span>
            Generate AI Meal Plan
          </button>
        </div>
      )}

      {isLoading && (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p className="loading-text">Kimi AI is analyzing Philippine food prices...</p>
          <p className="loading-subtext">Optimizing for maximum nutrition per peso</p>
        </div>
      )}

      {aiAnalysis && !isLoading && (
        <div className="analysis-result">
          <div className="analysis-header">
            <span className="analysis-badge">AI Analysis</span>
            <button 
              className="regenerate-btn"
              onClick={onGetRecommendations}
            >
              🔄 Regenerate
            </button>
          </div>
          <p className="analysis-text">{aiAnalysis}</p>
          <div className="ai-features">
            <div className="feature-tag">
              <span>🇵🇭</span> Local Prices
            </div>
            <div className="feature-tag">
              <span>💪</span> High Protein
            </div>
            <div className="feature-tag">
              <span>📊</span> Budget Optimized
            </div>
            <div className="feature-tag">
              <span>🎯</span> Calorie Target
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default LLMRecommendation