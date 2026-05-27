import type { CapitalGains } from '../types'

interface CapitalGainsCardProps {
  gains: CapitalGains | null
  variant: 'pre' | 'post'
  title: string
}

const formatCurrency = (value: number) => `₹${value.toFixed(2)}`

const getValueColor = (value: number) =>
  value >= 0 ? 'text-emerald-300' : 'text-red-300'

export const CapitalGainsCard = ({
  gains,
  variant,
  title,
}: CapitalGainsCardProps) => {
  const cardClass =
    variant === 'pre'
      ? 'bg-[#1a1f2e] text-white'
      : 'bg-[#1565C0] text-white'

  if (!gains) {
    return (
      <section className={`rounded-lg p-6 shadow-sm ${cardClass}`}>
        <div className="h-7 w-48 animate-pulse rounded bg-white/20" />
        <div className="mt-6 space-y-5">
          <div className="h-24 animate-pulse rounded bg-white/15" />
          <div className="h-24 animate-pulse rounded bg-white/15" />
          <div className="h-8 w-72 max-w-full animate-pulse rounded bg-white/20" />
        </div>
      </section>
    )
  }

  const stcgNet = gains.stcg.profits - gains.stcg.losses
  const ltcgNet = gains.ltcg.profits - gains.ltcg.losses
  const realisedCapitalGains = stcgNet + ltcgNet

  const sections = [
    { label: 'Short-term', gains: gains.stcg, net: stcgNet },
    { label: 'Long-term', gains: gains.ltcg, net: ltcgNet },
  ]

  return (
    <section className={`rounded-lg p-6 shadow-sm ${cardClass}`}>
      <h2 className="text-xl font-semibold">{title}</h2>

      <div className="mt-6 space-y-5">
        {sections.map((section) => (
          <div
            className="rounded-lg border border-white/15 bg-white/10 p-4"
            key={section.label}
          >
            <h3 className="text-base font-semibold">{section.label}</h3>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-white/75">Profits</dt>
                <dd>{formatCurrency(section.gains.profits)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-white/75">Losses</dt>
                <dd>{formatCurrency(section.gains.losses)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 font-semibold">
                <dt>Net Capital Gains</dt>
                <dd className={getValueColor(section.net)}>
                  {formatCurrency(section.net)}
                </dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/20 pt-5 text-base font-semibold">
        <span>Realised Capital Gains</span>
        <span className={getValueColor(realisedCapitalGains)}>
          {formatCurrency(realisedCapitalGains)}
        </span>
      </div>
    </section>
  )
}
