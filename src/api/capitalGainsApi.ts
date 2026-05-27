import type { CapitalGains } from '../types'

const data = {
  capitalGains: {
    stcg: { profits: 70200.88, losses: 1548.53 },
    ltcg: { profits: 5020, losses: 3050 },
  },
}

export const fetchCapitalGains = (): Promise<CapitalGains> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(data.capitalGains)
    }, 600)
  })
