import { useEffect, useState } from 'react'
import { CapitalGainsCard } from './components/CapitalGainsCard'
import { HoldingsTable } from './components/HoldingsTable'
import { SavingsBanner } from './components/SavingsBanner'
import { useHarvesting } from './hooks/useHarvesting'

type ThemeMode = 'light' | 'dark'

function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const savedTheme = window.localStorage.getItem('koinx-theme')
    return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark'
  })

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

  useEffect(() => {
    window.localStorage.setItem('koinx-theme', theme)
  }, [theme])

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-[#090d16] text-white' : 'bg-[#f4f7fb] text-slate-950'
      }`}
    >
      <nav
        className={`border-b px-4 py-4 transition-colors duration-300 md:px-8 ${
          isDark
            ? 'border-slate-800 bg-[#0b1120]'
            : 'border-slate-200 bg-white'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#f6b21a]">Koin</span>
            <span className="text-sm font-bold text-[#2f8cff]">X</span>
          </div>
          <button
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
              isDark
                ? 'border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
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
      </nav>

      <main className="px-4 py-6 md:px-8 md:py-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex items-center gap-3">
            <h1
              className={`text-2xl font-bold tracking-tight sm:text-3xl ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}
            >
              Tax Harvesting
            </h1>
            <div className="group relative">
              <button
                aria-label="Tax loss harvesting information"
                className={`flex h-6 w-6 items-center justify-center rounded-full border text-sm font-semibold ${
                  isDark
                    ? 'border-slate-500 text-slate-300'
                    : 'border-slate-300 text-slate-500'
                }`}
                type="button"
              >
                i
              </button>
              <div
                className={`pointer-events-none absolute right-0 top-8 z-10 w-64 rounded-md border px-3 py-2 text-sm opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 sm:left-1/2 sm:w-72 sm:-translate-x-1/2 ${
                  isDark
                    ? 'border-slate-700 bg-slate-950 text-slate-200'
                    : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                Tax loss harvesting helps you reduce your tax liability by
                selling assets at a loss to offset capital gains.
              </div>
            </div>
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

          <section
            className={`rounded border p-4 text-sm shadow-sm transition-colors duration-300 ${
              isDark
                ? 'border-blue-500/20 bg-[#111827] text-slate-300'
                : 'border-blue-100 bg-white text-slate-600'
            }`}
          >
            <details open>
              <summary
                className={`cursor-pointer select-none text-base font-semibold ${
                  isDark ? 'text-white' : 'text-slate-950'
                }`}
              >
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
              mode={theme}
              title="Pre Harvesting"
              variant="pre"
            />
            <CapitalGainsCard
              gains={postGains}
              mode={theme}
              title="After Harvesting"
              variant="post"
            />
          </div>

          <SavingsBanner
            mode={theme}
            preGains={preGains}
            postGains={postGains}
          />

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
