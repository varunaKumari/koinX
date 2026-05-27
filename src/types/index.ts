export interface GainLoss {
  balance: number
  gain: number
}

export interface Holding {
  coin: string
  coinName: string
  logo: string
  currentPrice: number
  totalHolding: number
  averageBuyPrice: number
  stcg: GainLoss
  ltcg: GainLoss
}

export interface CapitalGainsSplit {
  profits: number
  losses: number
}

export interface CapitalGains {
  stcg: CapitalGainsSplit
  ltcg: CapitalGainsSplit
}
