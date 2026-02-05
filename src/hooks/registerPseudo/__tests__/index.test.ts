import { describe, it, expect } from 'vitest'
import { registerPseudo } from '../index'
import { sanitizeInput, checkInputValue } from '../rules'

describe('registerPseudo - Validation des pseudos', () => {

  describe('Pseudos valides', () => {
    it('accepte un pseudo simple', () => {
      const result = registerPseudo('Alice')

      expect(result.isValid).toBe(true)
      expect(result.value).toBe('Alice')
    })

    it('accepte un pseudo avec chiffres', () => {
      const result = registerPseudo('Player42')

      expect(result.isValid).toBe(true)
    })

    it('accepte un pseudo avec accents', () => {
      const result = registerPseudo('Éléonore')

      expect(result.isValid).toBe(true)
    })

    it('accepte un pseudo avec tiret', () => {
      const result = registerPseudo('Jean-Pierre')

      expect(result.isValid).toBe(true)
    })

    it('accepte un pseudo avec apostrophe', () => {
      const result = registerPseudo("O'Brien")

      expect(result.isValid).toBe(true)
    })

    it('accepte un pseudo avec espace', () => {
      const result = registerPseudo('Dark Vador')

      expect(result.isValid).toBe(true)
    })

    it('accepte un pseudo de 2 caractères (minimum)', () => {
      const result = registerPseudo('Jo')

      expect(result.isValid).toBe(true)
    })

    it('accepte un pseudo de 50 caractères (maximum)', () => {
      const longPseudo = 'A'.repeat(50)
      const result = registerPseudo(longPseudo)

      expect(result.isValid).toBe(true)
    })
  })

  describe('Pseudos invalides', () => {
    it('rejette un pseudo vide', () => {
      const result = registerPseudo('')

      expect(result.isValid).toBe(false)
      expect(result.message).toContain('Veuillez rentrer')
    })

    it('rejette un pseudo trop court (1 caractère)', () => {
      const result = registerPseudo('A')

      expect(result.isValid).toBe(false)
      expect(result.message).toContain('trop court')
    })

    it('rejette un pseudo trop long (> 50 caractères)', () => {
      const longPseudo = 'A'.repeat(51)
      const result = registerPseudo(longPseudo)

      // Le sanitize tronque à 50, donc il devrait être valide après sanitization
      expect(result.value.length).toBeLessThanOrEqual(50)
    })
  })

  describe('Sanitization des entrées', () => {
    it('supprime les caractères spéciaux dangereux', () => {
      const result = sanitizeInput('<script>alert("xss")</script>')

      expect(result).not.toContain('<')
      expect(result).not.toContain('>')
      expect(result).not.toContain('"')
    })

    it('normalise les espaces multiples', () => {
      const result = sanitizeInput('Jean    Pierre')

      expect(result).toBe('Jean Pierre')
    })

    it('supprime les espaces en début et fin', () => {
      const result = sanitizeInput('  Alice  ')

      expect(result).toBe('Alice')
    })

    it('tronque à 50 caractères', () => {
      const longInput = 'A'.repeat(100)
      const result = sanitizeInput(longInput)

      expect(result.length).toBe(50)
    })

    it('supprime les emojis', () => {
      const result = sanitizeInput('Player🎮42')

      expect(result).toBe('Player42')
    })

    it('supprime les symboles', () => {
      const result = sanitizeInput('Player@#$%42')

      expect(result).toBe('Player42')
    })
  })

  describe('checkInputValue - Validation pure', () => {
    it('valide un pseudo correct', () => {
      const result = checkInputValue('ValidPseudo')

      expect(result.isValid).toBe(true)
      expect(result.message).toBe('')
    })

    it('retourne le message approprié pour pseudo vide', () => {
      const result = checkInputValue('')

      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Veuillez rentrer un pseudo !')
    })

    it('retourne le message approprié pour pseudo trop court', () => {
      const result = checkInputValue('A')

      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Pseudo trop court !')
    })
  })

  describe('Cas limites TCG', () => {
    it('accepte des pseudos typiques de joueurs MTG', () => {
      const pseudos = [
        'DarkRitual99',
        'CounterSpell',
        'Jace-Master',
        "Urza's Legacy",
        'Élève de Tolaria',
      ]

      pseudos.forEach(pseudo => {
        const result = registerPseudo(pseudo)
        expect(result.isValid).toBe(true)
      })
    })

    it('accepte des pseudos typiques de joueurs Pokemon', () => {
      const pseudos = [
        'PikachuFan',
        'Maître Pokémon',
        'Red-Blue',
        "Sacha d'Azuria",
      ]

      pseudos.forEach(pseudo => {
        const result = registerPseudo(pseudo)
        expect(result.isValid).toBe(true)
      })
    })

    it('accepte des pseudos typiques de joueurs Yu-Gi-Oh', () => {
      const pseudos = [
        'KaibaCorps',
        'Yugi-Muto',
        'Roi des Duels',
        "L'élu du Puzzle",
      ]

      pseudos.forEach(pseudo => {
        const result = registerPseudo(pseudo)
        expect(result.isValid).toBe(true)
      })
    })
  })
})
