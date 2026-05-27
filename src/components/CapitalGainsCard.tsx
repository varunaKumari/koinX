import type { CapitalGains } from '../types'

interface CapitalGainsCardProps {
  gains: CapitalGains | null
  variant: 'pre' | 'post'
  title: string
}

const formatCurrency = (value: number) => {
  const isVerySmallValue = Math.abs(value) > 0 && Math.abs(value) < 0.01
  const formatter = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: isVerySmallValue ? 6 : 2,
  })

  return `₹${formatter.format(value)}`
}

const getValueColor = (value: number) =>
  value >= 0 ? 'text-emerald-300' : 'text-red-300'

export const CapitalGainsCard = ({
  gains,
  variant,
  title,
}: CapitalGainsCardProps) => {
  const cardClass =
    variant === 'pre'
      ? 'border border-slate-700 bg-[#101726] text-white'
      : 'border border-blue-400/30 bg-[#0b84ff] text-white'

  if (!gains) {
    return (
      <section className={`rounded p-5 shadow-sm sm:p-6 ${cardClass}`}>
        <div className="h-7 w-48 animate-pulse rounded bg-white/20" />
        <div className="mt-6 space-y-4">
          <div className="h-28 animate-pulse rounded bg-white/15" />
          <div className="h-8 w-72 max-w-full animate-pulse rounded bg-white/20" />
        </div>
      </section>
    )
  }

  const stcgNet = gains.stcg.profits - gains.stcg.losses
  const ltcgNet = gains.ltcg.profits - gains.ltcg.losses
  const realisedCapitalGains = stcgNet + ltcgNet

  const sections = [
    { label: 'Profits', stcg: gains.stcg.profits, ltcg: gains.ltcg.profits },
    { label: 'Losses', stcg: gains.stcg.losses, ltcg: gains.ltcg.losses },
    { label: 'Net Capital Gains', stcg: stcgNet, ltcg: ltcgNet },
  ]

  return (
    <section className={`rounded p-5 shadow-sm sm:p-6 ${cardClass}`}>
      <h2 className="text-base font-semibold sm:text-lg">{title}</h2>

      <div className="mt-5 overflow-hidden rounded border border-white/15 bg-black/10">
        <div className="grid grid-cols-3 border-b border-white/15 px-3 py-3 text-xs font-semibold text-white/70 sm:px-4">
          <span />
          <span className="text-right">Short-term</span>
          <span className="text-right">Long-term</span>
        </div>
        <div className="divide-y divide-white/10">
          {sections.map((section) => {
            const isNetRow = section.label === 'Net Capital Gains'

            return (
              <div
                className="grid grid-cols-1 gap-1 px-3 py-3 text-sm sm:grid-cols-3 sm:items-center sm:gap-4 sm:px-4"
                key={section.label}
              >
                <span
                  className={`text-white/75 ${isNetRow ? 'font-semibold text-white' : ''}`}
                >
                  {section.label}
                </span>
                <span
                  className={`sm:text-right ${
                    isNetRow ? getValueColor(section.stcg) : ''
                  }`}
                >
                  <span className="mr-2 text-xs text-white/50 sm:hidden">
                    Short-term
                  </span>
                  {formatCurrency(section.stcg)}
                </span>
                <span
                  className={`sm:text-right ${
                    isNetRow ? getValueColor(section.ltcg) : ''
                  }`}
                >
                  <span className="mr-2 text-xs text-white/50 sm:hidden">
                    Long-term
                  </span>
                  {formatCurrency(section.ltcg)}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2 border-t border-white/20 pt-4 text-sm font-semibold sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-base">
        <span>Realised Capital Gains</span>
        <span className={`text-lg sm:text-xl ${getValueColor(realisedCapitalGains)}`}>
          {formatCurrency(realisedCapitalGains)}
        </span>
      </div>
    </section>
  )
}
