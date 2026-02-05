import { describe, it, expect } from 'vitest'
import { checkScore, formatScores } from '../index'

describe('manageScore - Validation des scores', () => {

  describe('checkScore - Validation complète', () => {
    it('valide un match 2-0 (victoire nette)', () => {
      const scores = {
        'player1-score': '2',
        'player2-score': '0',
      }

      const result = checkScore(scores)

      expect(result.isValid).toBe(true)
      expect(result.data['player1']).toBe(3) // VICTORY
      expect(result.data['player2']).toBe(0) // LOSS
    })

    it('valide un match 2-1 (victoire serrée)', () => {
      const scores = {
        'player1-score': '2',
        'player2-score': '1',
      }

      const result = checkScore(scores)

      expect(result.isValid).toBe(true)
      expect(result.data['player1']).toBe(3) // VICTORY
      expect(result.data['player2']).toBe(0) // LOSS
    })

    it('valide un match nul 1-1', () => {
      const scores = {
        'player1-score': '1',
        'player2-score': '1',
      }

      const result = checkScore(scores)

      expect(result.isValid).toBe(true)
      expect(result.data['player1']).toBe(1) // TIE
      expect(result.data['player2']).toBe(1) // TIE
    })

    it('valide un match nul 0-0', () => {
      const scores = {
        'player1-score': '0',
        'player2-score': '0',
      }

      const result = checkScore(scores)

      expect(result.isValid).toBe(true)
      expect(result.data['player1']).toBe(1) // TIE
      expect(result.data['player2']).toBe(1) // TIE
    })
  })

  describe('checkScore - Cas invalides', () => {
    it('rejette un score > 2 (impossible en best-of-3)', () => {
      const scores = {
        'player1-score': '3',
        'player2-score': '0',
      }

      const result = checkScore(scores)

      expect(result.isValid).toBe(false)
      expect(result.message).toContain('3 victoires')
    })

    it('rejette un score négatif', () => {
      const scores = {
        'player1-score': '-1',
        'player2-score': '2',
      }

      const result = checkScore(scores)

      expect(result.isValid).toBe(false)
      expect(result.message).toContain('négatif')
    })

    it('rejette un match 2-2 (impossible)', () => {
      const scores = {
        'player1-score': '2',
        'player2-score': '2',
      }

      const result = checkScore(scores)

      expect(result.isValid).toBe(false)
      expect(result.message).toContain('score le plus haut')
    })
  })

  describe('checkScore - Plusieurs matchs simultanés', () => {
    it('valide plusieurs matchs valides', () => {
      const scores = {
        'alice-score': '2',
        'bob-score': '1',
        'charlie-score': '0',
        'diana-score': '2',
      }

      const result = checkScore(scores)

      expect(result.isValid).toBe(true)
      expect(result.data['alice']).toBe(3)  // VICTORY
      expect(result.data['bob']).toBe(0)    // LOSS
      expect(result.data['charlie']).toBe(0) // LOSS
      expect(result.data['diana']).toBe(3)  // VICTORY
    })

    it('rejette si un seul match est invalide', () => {
      const scores = {
        'alice-score': '2',
        'bob-score': '1',
        'charlie-score': '3', // Invalide
        'diana-score': '0',
      }

      const result = checkScore(scores)

      expect(result.isValid).toBe(false)
    })
  })

  describe('formatScores - Transformation des données', () => {
    it('transforme les scores du formulaire en structure interne', () => {
      const scores = {
        'player1-score': '2',
        'player2-score': '1',
      }

      const result = formatScores(scores)

      expect(result).toHaveLength(1)
      expect(result[0][0].playerId).toBe('player1')
      expect(result[0][0].score).toBe(2)
      expect(result[0][1].playerId).toBe('player2')
      expect(result[0][1].score).toBe(1)
    })
  })
})
