import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchCapitalGains } from '../api/capitalGainsApi'
import { fetchHoldings } from '../api/holdingsApi'
import type { CapitalGains, Holding } from '../types'

export const getHoldingKey = (holding: Holding): string =>
  `${holding.coin}-${holding.coinName}`

export const getNetGains = (capitalGains: CapitalGains) => {
  const stcgNet = capitalGains.stcg.profits - capitalGains.stcg.losses
  const ltcgNet = capitalGains.ltcg.profits - capitalGains.ltcg.losses

  return {
    stcgNet,
    ltcgNet,
    total: stcgNet + ltcgNet,
  }
}

const emptyCapitalGains: CapitalGains = {
  stcg: { profits: 0, losses: 0 },
  ltcg: { profits: 0, losses: 0 },
}

export const useHarvesting = () => {
  const [holdings, setHoldings] = useState<Holding[]>([])
  const [capitalGains, setCapitalGains] =
    useState<CapitalGains>(emptyCapitalGains)
  const [selectedCoins, setSelectedCoins] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadHarvestingData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [holdingsData, capitalGainsData] = await Promise.all([
          fetchHoldings(),
          fetchCapitalGains(),
        ])

        if (!isMounted) {
          return
        }

        setHoldings(holdingsData)
        setCapitalGains(capitalGainsData)
      } catch (caughtError) {
        if (!isMounted) {
          return
        }

        setError(
          caughtError instanceof Error
            ? caughtError.message
            : 'Failed to fetch harvesting data',
        )
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadHarvestingData()

    return () => {
      isMounted = false
    }
  }, [])

  const toggleCoin = useCallback((key: string) => {
    setSelectedCoins((currentSelectedCoins) => {
      const nextSelectedCoins = new Set(currentSelectedCoins)

      if (nextSelectedCoins.has(key)) {
        nextSelectedCoins.delete(key)
      } else {
        nextSelectedCoins.add(key)
      }

      return nextSelectedCoins
    })
  }, [])

  const toggleAll = useCallback(() => {
    setSelectedCoins((currentSelectedCoins) => {
      const allKeys = holdings.map(getHoldingKey)

      if (allKeys.every((key) => currentSelectedCoins.has(key))) {
        return new Set()
      }

      return new Set(allKeys)
    })
  }, [holdings])

  const afterHarvestingGains = useMemo<CapitalGains>(() => {
    const gainsAfterHarvesting: CapitalGains = {
      stcg: { ...capitalGains.stcg },
      ltcg: { ...capitalGains.ltcg },
    }

    holdings.forEach((holding) => {
      if (!selectedCoins.has(getHoldingKey(holding))) {
        return
      }

      if (holding.stcg.gain > 0) {
        gainsAfterHarvesting.stcg.profits += holding.stcg.gain
      } else {
        gainsAfterHarvesting.stcg.losses += Math.abs(holding.stcg.gain)
      }

      if (holding.ltcg.gain > 0) {
        gainsAfterHarvesting.ltcg.profits += holding.ltcg.gain
      } else {
        gainsAfterHarvesting.ltcg.losses += Math.abs(holding.ltcg.gain)
      }
    })

    return gainsAfterHarvesting
  }, [capitalGains, holdings, selectedCoins])

  return {
    holdings,
    capitalGains,
    afterHarvestingGains,
    selectedCoins,
    toggleCoin,
    toggleAll,
    loading,
    error,
  }
}
