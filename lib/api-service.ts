/**
 * API Service for fetching game questions from endpoints
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ''

export interface NumberSequenceQuestion {
  sequence: number[]
  options: number[]
  correct: number
}

export interface PatternGuesserQuestion {
  sequence: (number | null)[]
  options: number[]
  correct: number
}

export interface OddOneOutQuestion {
  numbers: number[]
  correct: number[]
  description: string
}

/**
 * Fetch number sequence questions from API
 */
export async function fetchNumberSequenceQuestions(): Promise<NumberSequenceQuestion[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/number-sequence`)
    if (!response.ok) {
      throw new Error('Failed to fetch number sequence questions')
    }
    const data = await response.json()
    return data.questions || data
  } catch (error) {
    console.error('Error fetching number sequence questions:', error)
    // Return fallback questions if API fails
    return [
      {
        sequence: [2, 4, 6, 8],
        options: [9, 10, 11, 12],
        correct: 10,
      },
      {
        sequence: [3, 6, 9, 12],
        options: [14, 15, 16, 17],
        correct: 15,
      },
      {
        sequence: [1, 1, 2, 3, 5],
        options: [7, 8, 9, 10],
        correct: 8,
      },
    ]
  }
}

/**
 * Fetch pattern guesser questions from API
 */
export async function fetchPatternGuesserQuestions(): Promise<PatternGuesserQuestion[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/pattern-guesser`)
    if (!response.ok) {
      throw new Error('Failed to fetch pattern guesser questions')
    }
    const data = await response.json()
    return data.questions || data
  } catch (error) {
    console.error('Error fetching pattern guesser questions:', error)
    // Return fallback questions if API fails
    return [
      {
        sequence: [2, 4, null, 8],
        options: [5, 6, 7, 8],
        correct: 6,
      },
      {
        sequence: [1, null, 5, 7],
        options: [2, 3, 4, 5],
        correct: 3,
      },
      {
        sequence: [10, 20, null, 40],
        options: [25, 30, 35, 40],
        correct: 30,
      },
    ]
  }
}

/**
 * Fetch odd one out questions from API
 */
export async function fetchOddOneOutQuestions(): Promise<OddOneOutQuestion[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/odd-one-out`)
    if (!response.ok) {
      throw new Error('Failed to fetch odd one out questions')
    }
    const data = await response.json()
    return data.questions || data
  } catch (error) {
    console.error('Error fetching odd one out questions:', error)
    // Return fallback questions if API fails
    return [
      {
        numbers: [8, 2, 6, 4],
        correct: [2, 4, 6, 8],
        description: 'Sắp xếp theo thứ tự tăng dần',
      },
      {
        numbers: [12, 3, 9, 6],
        correct: [3, 6, 9, 12],
        description: 'Sắp xếp theo thứ tự tăng dần',
      },
      {
        numbers: [3, 5, 1, 2],
        correct: [1, 2, 3, 5],
        description: 'Sắp xếp theo thứ tự tăng dần',
      },
    ]
  }
}

