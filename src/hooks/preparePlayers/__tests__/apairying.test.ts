import { describe, it, expect } from 'vitest'
import { apairying } from '../apairying'
import { TournamentPlayer } from '@/src/types/tournament'

// Helper pour créer un joueur de test
const createPlayer = (
  id: string,
  pseudo: string,
  matchPoints: number = 0,
  opponentIds: string[] = [],
  hasBye: boolean = false
): TournamentPlayer => ({
  id,
  pseudo,
  matchPoints,
  matchWins: 0,
  matchLosses: 0,
  matchDraw: 0,
  opponentIds,
  hasBye,
})

describe('apairying - Algorithme d\'appariement suisse', () => {

  describe('Cas de base', () => {
    it('retourne un tableau vide si aucun joueur', () => {
      const result = apairying([])
      expect(result).toEqual([])
    })

    it('appaire 2 joueurs ensemble', () => {
      const players = [
        createPlayer('1', 'Alice'),
        createPlayer('2', 'Bob'),
      ]

      const result = apairying(players)

      expect(result).toHaveLength(1)
      expect(result[0][0]).toBeDefined()
      expect(result[0][1]).toBeDefined()
    })

    it('appaire 4 joueurs en 2 matchs', () => {
      const players = [
        createPlayer('1', 'Alice'),
        createPlayer('2', 'Bob'),
        createPlayer('3', 'Charlie'),
        createPlayer('4', 'Diana'),
      ]

      const result = apairying(players)

      expect(result).toHaveLength(2)
    })
  })

  describe('Gestion du BYE (nombre impair)', () => {
    it('assigne un bye quand nombre impair de joueurs', () => {
      const players = [
        createPlayer('1', 'Alice'),
        createPlayer('2', 'Bob'),
        createPlayer('3', 'Charlie'),
      ]

      const result = apairying(players)

      expect(result).toHaveLength(2)
      const byeMatch = result.find(match => match[1] === null)
      expect(byeMatch).toBeDefined()
    })

    it('le bye va au joueur avec le moins de points', () => {
      const players = [
        createPlayer('1', 'Alice', 6),
        createPlayer('2', 'Bob', 3),
        createPlayer('3', 'Charlie', 0),
      ]

      const result = apairying(players)
      const byeMatch = result.find(match => match[1] === null)

      expect(byeMatch![0].pseudo).toBe('Charlie')
    })

    it('évite de donner un bye à un joueur qui en a déjà eu un', () => {
      const players = [
        createPlayer('1', 'Alice', 6),
        createPlayer('2', 'Bob', 3),
        createPlayer('3', 'Charlie', 0, [], true), // A déjà eu un bye
      ]

      const result = apairying(players)
      const byeMatch = result.find(match => match[1] === null)

      expect(byeMatch![0].pseudo).toBe('Bob')
    })
  })

  describe('Groupement par score', () => {
    it('appaire les joueurs avec des scores similaires', () => {
      const players = [
        createPlayer('1', 'Alice', 6),
        createPlayer('2', 'Bob', 6),
        createPlayer('3', 'Charlie', 0),
        createPlayer('4', 'Diana', 0),
      ]

      const result = apairying(players)

      // Alice (6pts) devrait jouer contre Bob (6pts)
      const aliceMatch = result.find(m =>
        m[0].pseudo === 'Alice' || m[1]?.pseudo === 'Alice'
      )
      expect(
        aliceMatch![0].pseudo === 'Bob' || aliceMatch![1]?.pseudo === 'Bob'
      ).toBe(true)
    })
  })

  describe('Évitement des rematches', () => {
    it('évite de faire rejouer deux joueurs qui se sont déjà affrontés', () => {
      const players = [
        createPlayer('1', 'Alice', 3, ['2']), // A déjà joué contre Bob
        createPlayer('2', 'Bob', 3, ['1']),   // A déjà joué contre Alice
        createPlayer('3', 'Charlie', 3, []),
        createPlayer('4', 'Diana', 3, []),
      ]

      const result = apairying(players)

      // Alice ne devrait pas rejouer contre Bob
      const aliceMatch = result.find(m =>
        m[0].pseudo === 'Alice' || m[1]?.pseudo === 'Alice'
      )
      expect(
        aliceMatch![0].pseudo !== 'Bob' && aliceMatch![1]?.pseudo !== 'Bob'
      ).toBe(true)
    })

    it('autorise le rematch si aucune autre option (fallback greedy)', () => {
      // 4 joueurs où chacun a déjà joué contre tous sauf un
      const players = [
        createPlayer('1', 'Alice', 3, ['2', '3']),
        createPlayer('2', 'Bob', 3, ['1', '4']),
        createPlayer('3', 'Charlie', 3, ['1', '4']),
        createPlayer('4', 'Diana', 3, ['2', '3']),
      ]

      const result = apairying(players)

      // L'algorithme doit quand même retourner des matchs
      expect(result).toHaveLength(2)
    })
  })

  describe('Scénarios de tournoi réalistes', () => {
    it('gère un tournoi de 8 joueurs - Ronde 1', () => {
      const players = Array.from({ length: 8 }, (_, i) =>
        createPlayer(`${i + 1}`, `Joueur${i + 1}`)
      )

      const result = apairying(players)

      expect(result).toHaveLength(4)
      result.forEach(match => {
        expect(match[0]).toBeDefined()
        expect(match[1]).toBeDefined()
      })
    })

    it('gère un tournoi de 8 joueurs - Ronde 2 avec scores variés', () => {
      const players = [
        createPlayer('1', 'Joueur1', 3, ['5']),
        createPlayer('2', 'Joueur2', 3, ['6']),
        createPlayer('3', 'Joueur3', 3, ['7']),
        createPlayer('4', 'Joueur4', 3, ['8']),
        createPlayer('5', 'Joueur5', 0, ['1']),
        createPlayer('6', 'Joueur6', 0, ['2']),
        createPlayer('7', 'Joueur7', 0, ['3']),
        createPlayer('8', 'Joueur8', 0, ['4']),
      ]

      const result = apairying(players)

      expect(result).toHaveLength(4)

      // Les 3pts devraient jouer entre eux
      const topMatch = result.find(m =>
        m[0].matchPoints === 3 && m[1]?.matchPoints === 3
      )
      expect(topMatch).toBeDefined()
    })
  })
})
