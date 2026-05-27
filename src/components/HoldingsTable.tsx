import { useEffect, useMemo, useRef, useState } from 'react'
import { getHoldingKey } from '../hooks/useHarvesting'
import type { Holding } from '../types'

interface HoldingsTableProps {
  holdings: Holding[]
  selectedCoins: Set<string>
  onToggle: (key: string) => void
  onToggleAll: () => void
  loading: boolean
}

const formatCurrency = (value: number) => `₹${value.toFixed(2)}`

const formatHolding = (value: number) => value.toLocaleString('en-IN')

const getGainColor = (value: number) =>
  value >= 0 ? 'text-emerald-300' : 'text-red-300'

export const HoldingsTable = ({
  holdings,
  selectedCoins,
  onToggle,
  onToggleAll,
  loading,
}: HoldingsTableProps) => {
  const [showAll, setShowAll] = useState(false)
  const headerCheckboxRef = useRef<HTMLInputElement>(null)

  const sortedHoldings = useMemo(
    () =>
      [...holdings].sort(
        (firstHolding, secondHolding) =>
          Math.abs(secondHolding.stcg.gain + secondHolding.ltcg.gain) -
          Math.abs(firstHolding.stcg.gain + firstHolding.ltcg.gain),
      ),
    [holdings],
  )

  const visibleHoldings = showAll ? sortedHoldings : sortedHoldings.slice(0, 5)
  const selectedCount = holdings.filter((holding) =>
    selectedCoins.has(getHoldingKey(holding)),
  ).length
  const allSelected = holdings.length > 0 && selectedCount === holdings.length
  const someSelected = selectedCount > 0 && !allSelected

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = someSelected
    }
  }, [someSelected])

  return (
    <section className="overflow-hidden rounded-lg border border-slate-700 bg-[#1a1f2e] text-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] border-collapse text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-300">
            <tr>
              <th className="px-4 py-4 font-semibold">
                <div className="flex items-center gap-3">
                  <input
                    aria-label="Select all holdings"
                    checked={allSelected}
                    className="h-4 w-4 rounded border-slate-500 accent-blue-500"
                    disabled={loading || holdings.length === 0}
                    onChange={onToggleAll}
                    ref={headerCheckboxRef}
                    type="checkbox"
                  />
                  <span>Asset</span>
                </div>
              </th>
              <th className="px-4 py-4 font-semibold">
                Holdings & Avg Buy Price
              </th>
              <th className="px-4 py-4 font-semibold">Current Price</th>
              <th className="px-4 py-4 font-semibold">Short-Term Gain</th>
              <th className="px-4 py-4 font-semibold">Long-Term Gain</th>
              <th className="px-4 py-4 font-semibold">Amount to Sell</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr className="animate-pulse" key={index}>
                    {Array.from({ length: 6 }).map((__, cellIndex) => (
                      <td className="px-4 py-5" key={cellIndex}>
                        <div className="h-5 rounded bg-white/10" />
                      </td>
                    ))}
                  </tr>
                ))
              : visibleHoldings.map((holding) => {
                  const key = getHoldingKey(holding)
                  const isSelected = selectedCoins.has(key)

                  return (
                    <tr className="transition-colors hover:bg-white/5" key={key}>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <input
                            aria-label={`Select ${holding.coinName}`}
                            checked={isSelected}
                            className="h-4 w-4 rounded border-slate-500 accent-blue-500"
                            onChange={() => onToggle(key)}
                            type="checkbox"
                          />
                          {holding.logo ? (
                            <img
                              alt=""
                              className="h-8 w-8 rounded-full"
                              src={holding.logo}
                            />
                          ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold">
                              {holding.coin.slice(0, 2)}
                            </div>
                          )}
                          <div>
                            <p className="font-semibold">{holding.coin}</p>
                            <p className="text-xs text-slate-400">
                              {holding.coinName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p>{formatHolding(holding.totalHolding)}</p>
                        <p className="text-xs text-slate-400">
                          Avg. buy {formatCurrency(holding.averageBuyPrice)}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        {formatCurrency(holding.currentPrice)}
                      </td>
                      <td className="px-4 py-4">
                        <p className={getGainColor(holding.stcg.gain)}>
                          {formatCurrency(holding.stcg.gain)}
                        </p>
                        <p className="text-xs text-slate-400">
                          {formatCurrency(holding.stcg.balance)}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <p className={getGainColor(holding.ltcg.gain)}>
                          {formatCurrency(holding.ltcg.gain)}
                        </p>
                        <p className="text-xs text-slate-400">
                          {formatCurrency(holding.ltcg.balance)}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        {isSelected ? formatHolding(holding.totalHolding) : ''}
                      </td>
                    </tr>
                  )
                })}
          </tbody>
        </table>
      </div>

      {!loading && sortedHoldings.length > 5 ? (
        <div className="border-t border-slate-700 px-4 py-4 text-center">
          <button
            className="rounded-md px-4 py-2 text-sm font-semibold text-blue-300 transition-colors hover:bg-white/10"
            onClick={() => setShowAll((currentShowAll) => !currentShowAll)}
            type="button"
          >
            {showAll ? 'View Less' : `View All ${sortedHoldings.length} Assets`}
          </button>
        </div>
      ) : null}
    </section>
  )
}
