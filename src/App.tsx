import { CapitalGainsCard } from './components/CapitalGainsCard'
import { HoldingsTable } from './components/HoldingsTable'
import { SavingsBanner } from './components/SavingsBanner'
import { useHarvesting } from './hooks/useHarvesting'

function App() {
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

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <nav className="border-b border-white/10 bg-[#0d1117]/95 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="text-xl font-bold tracking-tight text-white">
            KoinX
          </span>
        </div>
      </nav>

      <main className="px-6 py-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Tax Harvesting
            </h1>
            <div className="group relative">
              <button
                aria-label="Tax loss harvesting information"
                className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-500 text-sm font-semibold text-slate-300"
                type="button"
              >
                i
              </button>
              <div className="pointer-events-none absolute left-1/2 top-8 z-10 w-72 -translate-x-1/2 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                Tax loss harvesting is a strategy that can help offset capital
                gains by selling assets at a loss.
              </div>
            </div>
          </div>

          {error ? (
            <div className="rounded-lg border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <div className="grid gap-4 lg:grid-cols-2">
            <CapitalGainsCard
              gains={preGains}
              title="Pre Harvesting"
              variant="pre"
            />
            <CapitalGainsCard
              gains={postGains}
              title="After Harvesting"
              variant="post"
            />
          </div>

          <SavingsBanner preGains={preGains} postGains={postGains} />

          <HoldingsTable
            holdings={holdings}
            loading={loading}
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
