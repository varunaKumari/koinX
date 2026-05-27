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
    <div className="min-h-screen bg-[#090d16] text-white">
      <nav className="border-b border-slate-800 bg-[#0b1120] px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#f6b21a]">Koin</span>
            <span className="text-sm font-bold text-[#2f8cff]">X</span>
          </div>
        </div>
      </nav>

      <main className="px-4 py-6 md:px-8 md:py-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
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
              <div className="pointer-events-none absolute right-0 top-8 z-10 w-64 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 sm:left-1/2 sm:w-72 sm:-translate-x-1/2">
                Tax loss harvesting helps you reduce your tax liability by
                selling assets at a loss to offset capital gains.
              </div>
            </div>
          </div>

          {error ? (
            <div className="rounded-lg border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-200">
              Failed to load data. Please refresh.
            </div>
          ) : null}

          <section className="rounded border border-blue-500/20 bg-[#111827] p-4 text-sm text-slate-300 shadow-sm">
            <details open>
              <summary className="cursor-pointer select-none text-base font-semibold text-white">
                How it works?
              </summary>
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
                <li>
                  Select one or more holdings to simulate selling them for tax
                  loss harvesting.
                </li>
                <li>
                  Your short-term and long-term gains update instantly in the
                  after harvesting card.
                </li>
                <li>
                  Assets with losses can reduce realised capital gains, while
                  profitable assets increase them.
                </li>
              </ul>
            </details>
          </section>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
