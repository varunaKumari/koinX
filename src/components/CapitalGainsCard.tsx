import type { CapitalGains } from '../types'

interface CapitalGainsCardProps {
  gains: CapitalGains | null
  mode: 'light' | 'dark'
  savings?: number
  variant: 'pre' | 'post'
  title: string
}

const formatCurrency = (value: number, compact = false) => {
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: compact
      ? 2
      : Math.abs(value) > 0 && Math.abs(value) < 0.01
        ? 6
        : 2,
    minimumFractionDigits: compact ? 0 : 2,
    notation: compact ? 'compact' : 'standard',
  })

  return `$${formatter.format(value)}`
}

export const CapitalGainsCard = ({
  gains,
  mode,
  savings = 0,
  variant,
  title,
}: CapitalGainsCardProps) => {
  const isDark = mode === 'dark'
  const isPost = variant === 'post'
  const cardClass = isPost
    ? 'bg-[#1677ff] text-white shadow-[0_18px_40px_rgba(22,119,255,0.16)]'
    : isDark
      ? 'bg-[#171821] text-white'
      : 'border border-slate-200 bg-white text-slate-950'
  const mutedClass = isPost || isDark ? 'text-white/78' : 'text-slate-500'
  const valueColor = (value: number) =>
    value < 0
      ? isPost || isDark
        ? 'text-white'
        : 'text-red-600'
      : isPost || isDark
        ? 'text-white'
        : 'text-emerald-600'

  if (!gains) {
    return (
      <section className={`min-h-[340px] rounded-lg p-6 md:min-h-[410px] ${cardClass}`}>
        <div className="h-8 w-48 animate-pulse rounded bg-white/20" />
        <div className="mt-8 space-y-5">
          <div className="h-7 animate-pulse rounded bg-white/15" />
          <div className="h-7 animate-pulse rounded bg-white/15" />
          <div className="h-7 animate-pulse rounded bg-white/15" />
        </div>
      </section>
    )
  }

  const stcgNet = gains.stcg.profits - gains.stcg.losses
  const ltcgNet = gains.ltcg.profits - gains.ltcg.losses
  const totalGains = stcgNet + ltcgNet
  const useCompactNumbers = Math.abs(totalGains) >= 1_000_000
  const rows = [
    { label: 'Profits', stcg: gains.stcg.profits, ltcg: gains.ltcg.profits },
    { label: 'Losses', stcg: gains.stcg.losses, ltcg: gains.ltcg.losses },
    { label: 'Net Capital Gains', stcg: stcgNet, ltcg: ltcgNet },
  ]

  return (
    <section className={`min-h-[340px] rounded-lg p-6 md:min-h-[410px] ${cardClass}`}>
      <h2 className="text-2xl font-semibold">{title}</h2>

      <div className="mt-8 grid grid-cols-[1.2fr_1fr_1fr] gap-x-6 gap-y-6 text-base sm:text-xl">
        <span />
        <span className={`${mutedClass} text-right font-medium`}>Short-term</span>
        <span className={`${mutedClass} text-right font-medium`}>Long-term</span>

        {rows.map((row) => {
          const isNet = row.label === 'Net Capital Gains'

          return (
            <div className="contents" key={row.label}>
              <span className={`${isNet ? 'font-semibold' : ''} ${mutedClass}`}>
                {row.label}
              </span>
              <span
                className={`text-right ${isNet ? `font-semibold ${valueColor(row.stcg)}` : ''}`}
              >
                {formatCurrency(row.stcg, useCompactNumbers)}
              </span>
              <span
                className={`text-right ${isNet ? `font-semibold ${valueColor(row.ltcg)}` : ''}`}
              >
                {formatCurrency(row.ltcg, useCompactNumbers)}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2">
        <span className="text-xl font-semibold sm:text-2xl">
          {isPost ? 'Effective Capital Gains:' : 'Realised Capital Gains:'}
        </span>
        <span
          className={`text-2xl font-semibold sm:text-3xl ${valueColor(totalGains)}`}
        >
          {formatCurrency(totalGains, Math.abs(totalGains) >= 1_000_000)}
        </span>
      </div>

      {isPost && savings > 0 ? (
        <p className="mt-5 text-base font-medium text-white">
          🎉 Your taxable capital gains are reduced by:{' '}
          {formatCurrency(savings, savings >= 1_000_000)}
        </p>
      ) : null}
    </section>
  )
}
