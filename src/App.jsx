import { useState, useEffect } from 'react'
import './App.css'
import FoodCard from './components/FoodCard'
import DailyStats from './components/DailyStats'
import MealPlan from './components/MealPlan'
import BudgetInput from './components/BudgetInput'
import LLMRecommendation from './components/LLMRecommendation'

// Philippine Economy-Based Food Database with Prices in PHP
const philippineWeightGainFoods = [
  // Breakfast Options
  {
    id: 1,
    name: "Tapsilog (Beef Tapa + Rice + Egg)",
    calories: 650,
    protein: 32,
    carbs: 68,
    fats: 28,
    image: "🍳",
    category: "breakfast",
    description: "Marinated beef tapa with garlic fried rice and sunny-side-up egg",
    pricePHP: 120,
    location: "Carinderia/Fast Food",
    aiRecommendation: "High-protein Filipino breakfast staple, excellent for muscle building"
  },
  {
    id: 2,
    name: "Longsilog (Longganisa + Rice + Egg)",
    calories: 580,
    protein: 24,
    carbs: 62,
    fats: 26,
    image: "🥓",
    category: "breakfast",
    description: "Sweet Filipino sausage with garlic rice and fried egg",
    pricePHP: 95,
    location: "Local Carinderia",
    aiRecommendation: "Traditional breakfast with balanced macros for steady weight gain"
  },
  {
    id: 3,
    name: "Pandesal with Peanut Butter & Banana",
    calories: 420,
    protein: 14,
    carbs: 58,
    fats: 16,
    image: "🍞",
    category: "breakfast",
    description: "3 pieces pandesal with generous peanut butter and sliced banana",
    pricePHP: 55,
    location: "Bakery/Supermarket",
    aiRecommendation: "Affordable calorie-dense option, perfect for budget-conscious bulking"
  },
  {
    id: 4,
    name: "Champorado with Tuyo",
    calories: 480,
    protein: 16,
    carbs: 72,
    fats: 14,
    image: "🥣",
    category: "breakfast",
    description: "Chocolate rice porridge with dried salted fish",
    pricePHP: 65,
    location: "Carinderia/Home",
    aiRecommendation: "Carb-heavy meal ideal for morning energy and weight gain"
  },
  // Lunch Options
  {
    id: 5,
    name: "Adobo Rice Bowl with Egg",
    calories: 620,
    protein: 38,
    carbs: 58,
    fats: 26,
    image: "🍗",
    category: "lunch",
    description: "Chicken/Pork adobo over rice with hard-boiled egg",
    pricePHP: 110,
    location: "Carinderia/Mang Inasal",
    aiRecommendation: "Protein-rich Filipino classic with healthy fats from adobo sauce"
  },
  {
    id: 6,
    name: "Sinigang na Baboy with Rice",
    calories: 540,
    protein: 34,
    carbs: 48,
    fats: 24,
    image: "🍲",
    category: "lunch",
    description: "Pork sour soup with vegetables and steamed rice",
    pricePHP: 130,
    location: "Carinderia/Restaurant",
    aiRecommendation: "Nutrient-dense with vitamins from vegetables and protein from pork"
  },
  {
    id: 7,
    name: "Lechon Kawali with Rice",
    calories: 720,
    protein: 36,
    carbs: 52,
    fats: 42,
    image: "🥩",
    category: "lunch",
    description: "Crispy deep-fried pork belly with rice and mang tomas",
    pricePHP: 150,
    location: "Carinderia",
    aiRecommendation: "Very high calorie, excellent for hard gainers (consume moderately)"
  },
  {
    id: 8,
    name: "Bangus Belly with Rice",
    calories: 480,
    protein: 38,
    carbs: 45,
    fats: 18,
    image: "🐟",
    category: "lunch",
    description: "Grilled milkfish belly with calamansi and rice",
    pricePHP: 140,
    location: "Seafood Restaurant",
    aiRecommendation: "Omega-3 rich protein source, healthier fat profile"
  },
  // Dinner Options
  {
    id: 9,
    name: "Bistek Tagalog with Rice",
    calories: 580,
    protein: 42,
    carbs: 48,
    fats: 24,
    image: "🥩",
    category: "dinner",
    description: "Beef steak with onions, calamansi, and soy sauce over rice",
    pricePHP: 160,
    location: "Carinderia/Restaurant",
    aiRecommendation: "High-quality beef protein with savory flavor profile"
  },
  {
    id: 10,
    name: "Kare-Kare with Rice",
    calories: 640,
    protein: 32,
    carbs: 52,
    fats: 34,
    image: "🥜",
    category: "dinner",
    description: "Oxtail and tripe in peanut sauce with vegetables and rice",
    pricePHP: 180,
    location: "Restaurant",
    aiRecommendation: "Rich in protein and healthy fats from peanut sauce"
  },
  {
    id: 11,
    name: "Grilled Liempo with Rice",
    calories: 680,
    protein: 38,
    carbs: 50,
    fats: 36,
    image: "🍖",
    category: "dinner",
    description: "Grilled pork belly with rice and dipping sauce",
    pricePHP: 145,
    location: "Mang Inasal/BBQ stalls",
    aiRecommendation: "Popular budget-friendly option with good protein content"
  },
  {
    id: 12,
    name: "Tinolang Manok with Rice",
    calories: 460,
    protein: 36,
    carbs: 44,
    fats: 16,
    image: "🍗",
    category: "dinner",
    description: "Chicken ginger soup with papaya and chili leaves over rice",
    pricePHP: 115,
    location: "Carinderia/Home",
    aiRecommendation: "Lighter option for dinner, easily digestible protein"
  },
  // Snacks & Extras
  {
    id: 13,
    name: "Peanut Butter Banana Shake",
    calories: 450,
    protein: 18,
    carbs: 52,
    fats: 20,
    image: "🥤",
    category: "snack",
    description: "Homemade shake with banana, peanut butter, milk, and oats",
    pricePHP: 85,
    location: "Home/Smoothie Bar",
    aiRecommendation: "Perfect post-workout snack with fast and slow-digesting nutrients"
  },
  {
    id: 14,
    name: "Turon with Langka (3 pcs)",
    calories: 380,
    protein: 4,
    carbs: 58,
    fats: 16,
    image: "🍌",
    category: "snack",
    description: "Fried banana rolls with jackfruit",
    pricePHP: 45,
    location: "Street Food/Vendor",
    aiRecommendation: "Quick energy boost, best consumed around workout time"
  },
  {
    id: 15,
    name: "Boiled Peanuts (1 cup)",
    calories: 320,
    protein: 14,
    carbs: 24,
    fats: 22,
    image: "🥜",
    category: "snack",
    description: "Manibalang - boiled peanuts with salt",
    pricePHP: 35,
    location: "Street Vendor/Supermarket",
    aiRecommendation: "Affordable protein and healthy fats, great anytime snack"
  },
  {
    id: 16,
    name: "Halo-Halo with Leche Flan",
    calories: 420,
    protein: 12,
    carbs: 68,
    fats: 14,
    image: "🍧",
    category: "snack",
    description: "Mixed dessert with milk, beans, fruits, and custard",
    pricePHP: 75,
    location: "Mang Inasal/Chowking",
    aiRecommendation: "Calorie-dense dessert option for extra daily calories"
  },
  {
    id: 17,
    name: "Taho (Large cup with extra sago)",
    calories: 280,
    protein: 16,
    carbs: 42,
    fats: 6,
    image: "🥛",
    category: "snack",
    description: "Silken tofu with syrup and tapioca pearls",
    pricePHP: 30,
    location: "Street Vendor",
    aiRecommendation: "Budget-friendly soy protein, ideal for mid-morning snack"
  },
  {
    id: 18,
    name: "Puto Bumbong with Butter (3 pcs)",
    calories: 340,
    protein: 6,
    carbs: 56,
    fats: 12,
    image: "🍡",
    category: "snack",
    description: "Purple rice cake with butter, sugar, and coconut",
    pricePHP: 50,
    location: "Street Vendor/During Christmas",
    aiRecommendation: "Traditional snack with complex carbohydrates"
  },
  {
    id: 19,
    name: "Arroz Caldo with Egg",
    calories: 420,
    protein: 18,
    carbs: 58,
    fats: 14,
    image: "🥣",
    category: "snack",
    description: "Chicken rice porridge with ginger, garlic, and egg",
    pricePHP: 70,
    location: "Street Vendor/Carinderia",
    aiRecommendation: "Comfort food that's easy to digest and calorie-dense"
  },
  {
    id: 20,
    name: "Giniling with Rice",
    calories: 520,
    protein: 28,
    carbs: 58,
    fats: 20,
    image: "🍛",
    category: "lunch",
    description: "Ground pork with potatoes, carrots, and tomato sauce over rice",
    pricePHP: 100,
    location: "Carinderia",
    aiRecommendation: "Affordable complete meal with protein and vegetables"
  },
  {
    id: 21,
    name: "Inihaw na Pusit with Rice",
    calories: 340,
    protein: 42,
    carbs: 38,
    fats: 6,
    image: "🦑",
    category: "dinner",
    description: "Grilled squid with calamansi, tomatoes, and rice",
    pricePHP: 165,
    location: "Seafood Restaurant",
    aiRecommendation: "Lean protein source, low fat but nutrient-dense"
  },
  {
    id: 22,
    name: "Beef Pares with Garlic Rice",
    calories: 640,
    protein: 38,
    carbs: 64,
    fats: 26,
    image: "🍲",
    category: "dinner",
    description: "Braised beef with sweet-savory sauce and fried garlic rice",
    pricePHP: 135,
    location: "Pares House/Carinderia",
    aiRecommendation: "Midnight snack favorite, very high in calories and protein"
  },
  {
    id: 23,
    name: "Chicken Inasal with Rice",
    calories: 560,
    protein: 42,
    carbs: 52,
    fats: 20,
    image: "🍗",
    category: "lunch",
    description: "Grilled chicken with annatto oil, calamansi, and rice",
    pricePHP: 145,
    location: "Mang Inasal",
    aiRecommendation: "Balanced macros with signature Filipino grilled flavor"
  },
  {
    id: 24,
    name: "Lumpiang Shanghai (8 pcs) with Rice",
    calories: 520,
    protein: 22,
    carbs: 54,
    fats: 24,
    image: "🥟",
    category: "lunch",
    description: "Deep-fried meat spring rolls with sweet chili sauce and rice",
    pricePHP: 110,
    location: "Carinderia/Fast Food",
    aiRecommendation: "Party favorite turned meal, good for variety in diet"
  }
]

// LLM-style recommendation engine
const getAIRecommendations = (budget, targetCalories, mealType = null) => {
  const foods = mealType 
    ? philippineWeightGainFoods.filter(f => f.category === mealType)
    : philippineWeightGainFoods

  // Calculate value score (calories per peso)
  const foodsWithScore = foods.map(food => ({
    ...food,
    valueScore: food.calories / food.pricePHP,
    withinBudget: food.pricePHP <= budget * 0.4 // Each meal should be within 40% of daily budget
  }))

  // Sort by value score and protein content
  foodsWithScore.sort((a, b) => {
    if (a.withinBudget && !b.withinBudget) return -1
    if (!a.withinBudget && b.withinBudget) return 1
    return (b.valueScore + b.protein * 0.5) - (a.valueScore + a.protein * 0.5)
  })

  return foodsWithScore.slice(0, 5)
}

function App() {
  const [dailyPlan, setDailyPlan] = useState([])
  const [completedMeals, setCompletedMeals] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [dailyBudget, setDailyBudget] = useState(350)
  const [targetCalories, setTargetCalories] = useState(2500)
  const [aiSuggestions, setAiSuggestions] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    generateDailyPlan()
  }, [currentDate, dailyBudget])

  // Simulate LLM API call
  const getLLMRecommendations = async () => {
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200))
    
    const breakfast = getAIRecommendations(dailyBudget * 0.25, targetCalories * 0.25, 'breakfast')[0]
    const lunch = getAIRecommendations(dailyBudget * 0.30, targetCalories * 0.30, 'lunch')[0]
    const dinner = getAIRecommendations(dailyBudget * 0.35, targetCalories * 0.35, 'dinner')[0]
    const snack = getAIRecommendations(dailyBudget * 0.10, targetCalories * 0.10, 'snack')[0]
    
    const suggestions = {
      plan: [breakfast, lunch, dinner, snack],
      totalCost: breakfast.pricePHP + lunch.pricePHP + dinner.pricePHP + snack.pricePHP,
      aiAnalysis: generateAIAnalysis([breakfast, lunch, dinner, snack], dailyBudget, targetCalories)
    }
    
    setAiSuggestions(suggestions)
    setDailyPlan(suggestions.plan)
    setCompletedMeals([])
    setIsLoading(false)
  }

  const generateAIAnalysis = (meals, budget, targetCal) => {
    const totalCals = meals.reduce((sum, m) => sum + m.calories, 0)
    const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0)
    const totalCost = meals.reduce((sum, m) => sum + m.pricePHP, 0)
    const budgetUtilization = (totalCost / budget * 100).toFixed(1)
    
    let analysis = `Based on your ₱${budget} daily budget and ${targetCal} calorie target, I've optimized your meal plan for maximum value. `
    
    analysis += `This plan provides ${totalCals} calories (${(totalCals/targetCal*100).toFixed(0)}% of target) and ${totalProtein}g protein at ₱${totalCost} (${budgetUtilization}% of budget). `
    
    if (totalCost <= budget * 0.9) {
      analysis += `You're under budget by ₱${budget - totalCost}, leaving room for additional snacks or drinks. `
    }
    
    analysis += `The meals are selected for high protein content and calorie density typical of Filipino cuisine, perfect for healthy weight gain on a Philippine economy budget. `
    
    if (totalProtein >= targetCal * 0.0015) {
      analysis += `Protein intake is excellent for muscle building. `
    }
    
    analysis += `Key recommendations: ${meals[0].name} provides excellent morning energy, while ${meals[2].name} offers substantial protein for recovery. `
    
    return analysis
  }

  const generateDailyPlan = () => {
    if (aiSuggestions) {
      setDailyPlan(aiSuggestions.plan)
      return
    }
    
    // Fallback to smart selection if no AI suggestions yet
    const breakfast = getAIRecommendations(dailyBudget * 0.25, targetCalories * 0.25, 'breakfast')[0]
    const lunch = getAIRecommendations(dailyBudget * 0.30, targetCalories * 0.30, 'lunch')[0]
    const dinner = getAIRecommendations(dailyBudget * 0.35, targetCalories * 0.35, 'dinner')[0]
    const snack = getAIRecommendations(dailyBudget * 0.10, targetCalories * 0.10, 'snack')[0]
    
    setDailyPlan([breakfast, lunch, dinner, snack])
    setCompletedMeals([])
  }

  const toggleMealComplete = (mealId) => {
    setCompletedMeals(prev => 
      prev.includes(mealId) 
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    )
  }

  const totalCalories = dailyPlan.reduce((sum, meal) => sum + meal.calories, 0)
  const consumedCalories = dailyPlan
    .filter(meal => completedMeals.includes(meal.id))
    .reduce((sum, meal) => sum + meal.calories, 0)

  const totalProtein = dailyPlan.reduce((sum, meal) => sum + meal.protein, 0)
  const totalCarbs = dailyPlan.reduce((sum, meal) => sum + meal.carbs, 0)
  const totalFats = dailyPlan.reduce((sum, meal) => sum + meal.fats, 0)
  const totalCost = dailyPlan.reduce((sum, meal) => sum + (meal?.pricePHP || 0), 0)

  const formatDate = (date) => {
    return date.toLocaleDateString('en-PH', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">GainSmart PH</h1>
          <p className="tagline">AI-Powered Weight Gain for the Filipino Budget</p>
        </div>
      </header>

      <main className="main">
        <section className="hero">
          <div className="date-display">
            <span className="date-text">{formatDate(currentDate)}</span>
          </div>
          <div className="budget-badge">
            <span className="budget-label">Daily Budget:</span>
            <span className="budget-value">₱{dailyBudget}</span>
          </div>
        </section>

        <BudgetInput 
          budget={dailyBudget}
          setBudget={setDailyBudget}
          targetCalories={targetCalories}
          setTargetCalories={setTargetCalories}
        />

        <LLMRecommendation 
          onGetRecommendations={getLLMRecommendations}
          isLoading={isLoading}
          aiAnalysis={aiSuggestions?.aiAnalysis}
        />

        <DailyStats 
          totalCalories={totalCalories}
          consumedCalories={consumedCalories}
          totalProtein={totalProtein}
          totalCarbs={totalCarbs}
          totalFats={totalFats}
          completedCount={completedMeals.length}
          totalMeals={dailyPlan.length}
          totalCost={totalCost}
          budget={dailyBudget}
        />

        <section className="meals-section">
          <div className="section-header">
            <h2 className="section-title">Today's AI-Recommended Meal Plan</h2>
            <span className="cost-summary">Total: ₱{totalCost}</span>
          </div>
          <div className="meals-grid">
            {dailyPlan.map((meal) => (
              meal && <FoodCard 
                key={meal.id}
                food={meal}
                isCompleted={completedMeals.includes(meal.id)}
                onToggle={() => toggleMealComplete(meal.id)}
              />
            ))}
          </div>
        </section>

        <MealPlan foods={philippineWeightGainFoods} dailyBudget={dailyBudget} />
      </main>

      <footer className="footer">
        <p>© 2026 GainSmart PH - AI-Powered Weight Gain for Filipinos</p>
        <p className="footer-note">Prices based on Philippine economy • Powered by Kimi AI Recommendations</p>
      </footer>
    </div>
  )
}

export default App