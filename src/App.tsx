import type { CapitalGains, Holding } from './types'

function App() {
  const sampleHolding: Holding = {
    coin: 'BTC',
    coinName: 'Bitcoin',
    logo: '',
    currentPrice: 68400,
    totalHolding: 0.42,
    averageBuyPrice: 71250,
    stcg: { balance: 1197, gain: -1197 },
    ltcg: { balance: 0, gain: 0 },
  }

  const capitalGains: CapitalGains = {
    stcg: { profits: 2450, losses: 1197 },
    ltcg: { profits: 880, losses: 360 },
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          KoinX Tax Tools
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Tax Loss Harvesting
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-600">
          Review unrealized gains and losses across your crypto portfolio before
          choosing assets to harvest.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Selected holding</p>
            <p className="mt-2 text-2xl font-semibold">{sampleHolding.coin}</p>
            <p className="text-sm text-slate-600">{sampleHolding.coinName}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">STCG net</p>
            <p className="mt-2 text-2xl font-semibold">
              ${capitalGains.stcg.profits - capitalGains.stcg.losses}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">LTCG net</p>
            <p className="mt-2 text-2xl font-semibold">
              ${capitalGains.ltcg.profits - capitalGains.ltcg.losses}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
