import type { CapitalGains } from '../types'

interface SavingsBannerProps {
  preGains: CapitalGains | null
  postGains: CapitalGains | null
}

const getTotalGains = (gains: CapitalGains) =>
  gains.stcg.profits -
  gains.stcg.losses +
  gains.ltcg.profits -
  gains.ltcg.losses

export const SavingsBanner = ({
  preGains,
  postGains,
}: SavingsBannerProps) => {
  if (!preGains || !postGains) {
    return null
  }

  const preTotal = getTotalGains(preGains)
  const postTotal = getTotalGains(postGains)

  if (preTotal <= postTotal) {
    return null
  }

  return (
    <div className="animate-[fade-in_240ms_ease-out] rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-900 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M20 6 9 17l-5-5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
            />
          </svg>
        </span>
        <p className="text-base font-semibold">
          You're going to save ₹{(preTotal - postTotal).toFixed(2)}
        </p>
      </div>
    </div>
  )
}
