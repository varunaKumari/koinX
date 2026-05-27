import type { CapitalGains } from '../types'

const data = {
  capitalGains: {
    stcg: { profits: 4049.48, losses: 32127.03 },
    ltcg: { profits: 0, losses: 0 },
  },
}

export const fetchCapitalGains = (): Promise<CapitalGains> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(data.capitalGains)
    }, 600)
  })
