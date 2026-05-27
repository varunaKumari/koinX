import type { Holding } from '../types'

const holdings: Holding[] = []

export const fetchHoldings = (): Promise<Holding[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(holdings)
    }, 600)
  })
