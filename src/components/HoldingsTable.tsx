import { useEffect, useMemo, useRef, useState } from 'react'
import { getHoldingKey } from '../hooks/useHarvesting'
import type { Holding } from '../types'

interface HoldingsTableProps {
  holdings: Holding[]
  mode: 'light' | 'dark'
  selectedCoins: Set<string>
  onToggle: (key: string) => void
  onToggleAll: () => void
  loading: boolean
}

const formatCurrency = (value: number) => {
  const isVerySmallValue = Math.abs(value) > 0 && Math.abs(value) < 0.01
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: isVerySmallValue ? 6 : 2,
  })

  return `$${formatter.format(value)}`
}

const formatCompactCurrency = (value: number) => {
  if (Math.abs(value) < 1000) {
    return formatCurrency(value)
  }

  return `$${new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    notation: 'compact',
  }).format(value)}`
}

const formatHolding = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: Math.abs(value) > 0 && Math.abs(value) < 0.01 ? 6 : 8,
  }).format(value)

export const HoldingsTable = ({
  holdings,
  mode,
  selectedCoins,
  onToggle,
  onToggleAll,
  loading,
}: HoldingsTableProps) => {
  const isDark = mode === 'dark'
  const [showAll, setShowAll] = useState(false)
  const headerCheckboxRef = useRef<HTMLInputElement>(null)
  const sectionClass = isDark
    ? 'border-slate-800 bg-[#111827] text-white'
    : 'border-slate-200 bg-white text-slate-950'
  const topBorderClass = isDark ? 'border-slate-800' : 'border-slate-200'
  const tableHeadClass = isDark
    ? 'bg-[#0b1120] text-slate-300'
    : 'bg-slate-50 text-slate-500'
  const tableDivideClass = isDark ? 'divide-slate-800' : 'divide-slate-200'
  const mutedTextClass = isDark ? 'text-slate-400' : 'text-slate-500'
  const coinFallbackClass = isDark
    ? 'bg-slate-700 text-white'
    : 'bg-slate-100 text-slate-600'
  const skeletonClass = isDark ? 'bg-white/10' : 'bg-slate-200'
  const getGainColor = (value: number) =>
    value >= 0
      ? isDark
        ? 'text-emerald-300'
        : 'text-emerald-600'
      : isDark
        ? 'text-red-300'
        : 'text-red-600'

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
    <section
      className={`overflow-hidden rounded border shadow-sm transition-colors duration-300 ${sectionClass}`}
    >
      <div
        className={`flex items-center justify-between border-b px-4 py-4 ${topBorderClass}`}
      >
        <h2 className="text-base font-semibold">Holdings</h2>
        <span className={`text-xs ${mutedTextClass}`}>
          {holdings.length} assets available
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-xs sm:min-w-[960px] sm:text-sm">
          <thead
            className={`text-[11px] uppercase tracking-wide sm:text-xs ${tableHeadClass}`}
          >
            <tr>
              <th className="px-3 py-3 font-semibold sm:px-4 sm:py-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <input
                    aria-label="Select all holdings"
                    checked={allSelected}
                    className="h-4 w-4 rounded border-slate-500 accent-blue-500 transition duration-150 ease-out checked:scale-110 hover:scale-105"
                    disabled={loading || holdings.length === 0}
                    onChange={onToggleAll}
                    ref={headerCheckboxRef}
                    type="checkbox"
                  />
                  <span>Asset</span>
                </div>
              </th>
              <th className="px-3 py-3 font-semibold sm:px-4 sm:py-4">
                <span className="block text-base normal-case tracking-normal text-inherit">
                  Holdings
                </span>
                <span className={`block text-xs normal-case tracking-normal ${mutedTextClass}`}>
                  Avg Buy Price
                </span>
              </th>
              <th className="px-3 py-3 font-semibold sm:px-4 sm:py-4">
                Current Price
              </th>
              <th className="px-3 py-3 font-semibold sm:px-4 sm:py-4">
                <span className="inline-flex items-center gap-3">
                  <span className="h-0 w-0 border-x-[5px] border-b-[6px] border-x-transparent border-b-current opacity-70" />
                  Short-Term
                </span>
              </th>
              <th className="px-3 py-3 font-semibold sm:px-4 sm:py-4">
                Long-Term
              </th>
              <th className="hidden px-3 py-3 font-semibold sm:table-cell sm:px-4 sm:py-4">
                Amount to Sell
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${tableDivideClass}`}>
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr className="animate-pulse" key={index}>
                    {Array.from({ length: 6 }).map((__, cellIndex) => (
                      <td
                        className={`px-3 py-4 sm:px-4 sm:py-5 ${
                          cellIndex === 5 ? 'hidden sm:table-cell' : ''
                        }`}
                        key={cellIndex}
                      >
                        <div className={`h-5 rounded ${skeletonClass}`} />
                      </td>
                    ))}
                  </tr>
                ))
              : visibleHoldings.map((holding) => {
                  const key = getHoldingKey(holding)
                  const isSelected = selectedCoins.has(key)

                  return (
                    <tr
                      className={`transition-colors duration-200 ${
                        isDark ? 'hover:bg-slate-800/70' : 'hover:bg-blue-50/60'
                      } ${isSelected ? 'bg-blue-500/15' : ''}`}
                      key={key}
                    >
                      <td className="px-3 py-3 sm:px-4 sm:py-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <input
                            aria-label={`Select ${holding.coinName}`}
                            checked={isSelected}
                            className="h-4 w-4 rounded border-slate-500 accent-blue-500 transition duration-150 ease-out checked:scale-110 hover:scale-105"
                            onChange={() => onToggle(key)}
                            type="checkbox"
                          />
                          {holding.logo ? (
                            <img
                              alt=""
                              className="h-7 w-7 rounded-full sm:h-8 sm:w-8"
                              onError={(event) => {
                                event.currentTarget.src = '/default-coin.svg'
                              }}
                              src={holding.logo}
                            />
                          ) : (
                            <div
                              className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold sm:h-8 sm:w-8 sm:text-xs ${coinFallbackClass}`}
                            >
                              {holding.coin.slice(0, 2)}
                            </div>
                          )}
                          <div>
                            <p className="max-w-36 truncate text-base font-semibold">
                              {holding.coinName}
                            </p>
                            <p className={`text-[11px] sm:text-xs ${mutedTextClass}`}>
                              {holding.coin}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 sm:px-4 sm:py-4">
                        <p className="text-base">
                          {formatHolding(holding.totalHolding)} {holding.coin}
                        </p>
                        <p className={`text-[11px] sm:text-xs ${mutedTextClass}`}>
                          {formatCurrency(holding.averageBuyPrice)}/{holding.coin}
                        </p>
                      </td>
                      <td
                        className="px-3 py-3 text-base sm:px-4 sm:py-4"
                        title={formatCurrency(holding.currentPrice)}
                      >
                        {formatCompactCurrency(holding.currentPrice)}
                      </td>
                      <td className="px-3 py-3 sm:px-4 sm:py-4">
                        <p
                          className={`text-base ${getGainColor(holding.stcg.gain)}`}
                          title={formatCurrency(holding.stcg.gain)}
                        >
                          {formatCompactCurrency(holding.stcg.gain)}
                        </p>
                        <p className={`text-[11px] sm:text-xs ${mutedTextClass}`}>
                          {formatHolding(holding.stcg.balance)} {holding.coin}
                        </p>
                      </td>
                      <td className="px-3 py-3 sm:px-4 sm:py-4">
                        <p
                          className={`text-base ${getGainColor(holding.ltcg.gain)}`}
                          title={formatCurrency(holding.ltcg.gain)}
                        >
                          {formatCompactCurrency(holding.ltcg.gain)}
                        </p>
                        <p className={`text-[11px] sm:text-xs ${mutedTextClass}`}>
                          {formatHolding(holding.ltcg.balance)} {holding.coin}
                        </p>
                      </td>
                      <td className="hidden px-3 py-3 text-right text-base sm:table-cell sm:px-4 sm:py-4">
                        {isSelected
                          ? `${formatHolding(holding.totalHolding)} ${holding.coin}`
                          : '-'}
                      </td>
                    </tr>
                  )
                })}
          </tbody>
        </table>
      </div>

      {!loading && sortedHoldings.length > 5 ? (
        <div className={`border-t px-4 py-4 text-center ${topBorderClass}`}>
          <button
            className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
              isDark
                ? 'text-blue-300 hover:bg-white/10'
                : 'text-blue-600 hover:bg-blue-50'
            }`}
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
