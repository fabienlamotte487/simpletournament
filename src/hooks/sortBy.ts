// hooks/useSort.ts

type SortOrder = 'ASC' | 'DESC'

export function sortBy<T>(
  items: T[], 
  property: keyof T, 
  order: SortOrder = 'ASC'
): T[] {
  return [...items].sort((a, b) => {
    const valueA = a[property]
    const valueB = b[property]

    // Gestion des booleans
    if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
      const comparison = Number(valueB) - Number(valueA) // true (1) avant false (0)
      return order === 'ASC' ? comparison : -comparison
    }

    // Gestion des strings
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      const comparison = valueA.localeCompare(valueB, 'fr', { sensitivity: 'base' })
      return order === 'ASC' ? comparison : -comparison
    }

    // Gestion des nombres
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return order === 'ASC' ? valueA - valueB : valueB - valueA
    }

    // Gestion des dates
    if (valueA instanceof Date && valueB instanceof Date) {
      return order === 'ASC' 
        ? valueA.getTime() - valueB.getTime() 
        : valueB.getTime() - valueA.getTime()
    }

    return 0
  })
}