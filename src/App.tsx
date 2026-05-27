import { useEffect, useState } from 'react'
import { CapitalGainsCard } from './components/CapitalGainsCard'
import { HoldingsTable } from './components/HoldingsTable'
import { useHarvesting } from './hooks/useHarvesting'

type ThemeMode = 'light' | 'dark'

function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const savedTheme = window.localStorage.getItem('koinx-theme')
    return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark'
  })
  const [showNotes, setShowNotes] = useState(false)
  const {
    holdings,
    capitalGains,
    afterHarvestingGains,
    selectedCoins,
    toggleCoin,
    toggleAll,
    loading,
    error,
  } = useHarvesting()

  const preGains = loading ? null : capitalGains
  const postGains = loading ? null : afterHarvestingGains
  const isDark = theme === 'dark'
  const preTotal = capitalGains
    ? capitalGains.stcg.profits -
      capitalGains.stcg.losses +
      capitalGains.ltcg.profits -
      capitalGains.ltcg.losses
    : 0
  const postTotal = afterHarvestingGains
    ? afterHarvestingGains.stcg.profits -
      afterHarvestingGains.stcg.losses +
      afterHarvestingGains.ltcg.profits -
      afterHarvestingGains.ltcg.losses
    : 0
  const savings = Math.max(preTotal - postTotal, 0)

  useEffect(() => {
    window.localStorage.setItem('koinx-theme', theme)
  }, [theme])

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-[#080910] text-white' : 'bg-[#f4f7fb] text-slate-950'
      }`}
    >
      <main className="px-4 py-7 md:px-8 lg:px-14">
        <div className="mx-auto max-w-[1800px] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-7">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Tax Optimisation
              </h1>
              <div className="group relative">
                <button
                  className="text-xl font-semibold text-[#4f7dff] underline underline-offset-4"
                  type="button"
                >
                  How it works?
                </button>
                <div className="pointer-events-none absolute left-1/2 top-10 z-20 w-[420px] max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-lg bg-white p-4 text-base leading-snug text-slate-950 opacity-0 shadow-xl transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                  <p>• See your capital gains for FY 2024-25 in the left card</p>
                  <p>
                    • Check boxes for assets you plan on selling to reduce your
                    tax liability
                  </p>
                  <p>
                    • Instantly see your updated tax liability in the right card
                  </p>
                  <p className="mt-5">
                    <strong>Pro tip:</strong> Experiment with different
                    combinations of your holdings to optimize your tax liability
                  </p>
                </div>
              </div>
            </div>

            <button
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                isDark
                  ? 'border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
              }`}
              onClick={() =>
                setTheme((currentTheme) =>
                  currentTheme === 'dark' ? 'light' : 'dark',
                )
              }
              type="button"
            >
              {isDark ? 'Light mode' : 'Dark mode'}
            </button>
          </div>

          {error ? (
            <div
              className={`rounded-lg border px-4 py-3 text-sm ${
                isDark
                  ? 'border-red-500/40 bg-red-950/40 text-red-200'
                  : 'border-red-200 bg-red-50 text-red-700'
              }`}
            >
              Failed to load data. Please refresh.
            </div>
          ) : null}

          <section className="overflow-hidden rounded-lg border border-[#2b67ff] bg-[#12224a] text-white">
            <button
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              onClick={() => setShowNotes((current) => !current)}
              type="button"
            >
              <span className="flex items-center gap-4 text-xl font-semibold">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#6d92ff] text-[#6d92ff]">
                  i
                </span>
                Important Notes And Disclaimers
              </span>
              <span className="text-2xl text-slate-300">
                {showNotes ? '⌃' : '⌄'}
              </span>
            </button>

            {showNotes ? (
              <div className="space-y-4 px-9 pb-6 text-lg leading-relaxed">
                <p>
                  • <strong>Price Source Disclaimer:</strong> Please note that
                  the current price of your coins may differ from the prices
                  listed on specific exchanges. This is because we use{' '}
                  <strong>CoinGecko</strong> as our default price source for
                  certain exchanges, rather than fetching prices directly from
                  the exchange.
                </p>
                <p>
                  • <strong>Country-specific Availability:</strong> Tax loss
                  harvesting may <strong>not be supported in all countries.</strong>{' '}
                  We strongly recommend consulting with your local tax advisor or
                  accountant before performing any related actions on your
                  exchange.
                </p>
                <p>
                  • <strong>Utilization of Losses:</strong> Tax loss harvesting
                  typically allows you to offset capital gains. However, if you
                  have <strong>zero or no applicable crypto capital gains</strong>,
                  the usability of these harvested losses may be limited. Kindly
                  confirm with your tax advisor how such losses can be applied in
                  your situation.
                </p>
              </div>
            ) : null}
          </section>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <CapitalGainsCard
              gains={preGains}
              mode={theme}
              title="Pre Harvesting"
              variant="pre"
            />
            <CapitalGainsCard
              gains={postGains}
              mode={theme}
              savings={savings}
              title="After Harvesting"
              variant="post"
            />
          </div>

          <HoldingsTable
            holdings={holdings}
            loading={loading}
            mode={theme}
            onToggle={toggleCoin}
            onToggleAll={toggleAll}
            selectedCoins={selectedCoins}
          />
        </div>
      </main>
    </div>
  )
}

export default App
