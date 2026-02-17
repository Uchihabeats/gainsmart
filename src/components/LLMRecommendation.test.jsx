import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LLMRecommendation from './LLMRecommendation'

describe('LLMRecommendation', () => {
  it('renders title and intro when no analysis', () => {
    const onGetRecommendations = vi.fn()
    render(
      <LLMRecommendation onGetRecommendations={onGetRecommendations} isLoading={false} aiAnalysis={null} />
    )
    expect(screen.getByText('Kimi AI Meal Planner')).toBeInTheDocument()
    expect(screen.getByText(/Smart recommendations based on your budget/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Generate AI Meal Plan/ })).toBeInTheDocument()
  })

  it('calls onGetRecommendations when button clicked', async () => {
    const user = userEvent.setup()
    const onGetRecommendations = vi.fn()
    render(
      <LLMRecommendation onGetRecommendations={onGetRecommendations} isLoading={false} aiAnalysis={null} />
    )
    await user.click(screen.getByRole('button', { name: /Generate AI Meal Plan/ }))
    expect(onGetRecommendations).toHaveBeenCalledTimes(1)
  })

  it('shows loading state when isLoading', () => {
    render(
      <LLMRecommendation onGetRecommendations={() => {}} isLoading={true} aiAnalysis={null} />
    )
    expect(screen.getByText(/Kimi AI is analyzing/)).toBeInTheDocument()
  })

  it('shows analysis and regenerate when aiAnalysis provided', () => {
    const analysis = 'Your optimized meal plan for today.'
    render(
      <LLMRecommendation onGetRecommendations={() => {}} isLoading={false} aiAnalysis={analysis} />
    )
    expect(screen.getByText('AI Analysis')).toBeInTheDocument()
    expect(screen.getByText(analysis)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Regenerate/ })).toBeInTheDocument()
  })
})
