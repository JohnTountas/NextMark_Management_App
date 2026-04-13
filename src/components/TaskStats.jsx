// Render stat cards from data instead of hardcoded markup so new metrics can be
// introduced with minimal surface area.
export default function TaskStats({ total, active, completed }) {
  const stats = [
    { label: 'Total', value: total, color: 'text-stone-700 dark:text-stone-300' },
    { label: 'Active', value: active, color: 'text-amber-600 dark:text-amber-500' },
    { label: 'Done', value: completed, color: 'text-emerald-600 dark:text-emerald-500' },
  ]

  return (
    <div className="grid grid-cols-3 gap-3 mb-6 fade-in">
      {stats.map(({ label, value, color }) => (
        <div
          key={label}
          className="rounded-2xl border border-[#e8dfd2] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,244,238,0.92))]
            p-4 text-center shadow-[0_20px_40px_-34px_rgba(68,64,60,0.35)] transition-all duration-200
            dark:border-stone-700/60 dark:bg-none dark:bg-stone-800/60 dark:shadow-[0_20px_40px_-34px_rgba(0,0,0,0.55)]"
        >
          <div className={`text-2xl font-display font-semibold ${color} leading-none`}>
            {value}
          </div>
          <div className="text-xs text-stone-500 dark:text-stone-500 mt-1.5 font-medium tracking-wide uppercase">
            {label}
          </div>
        </div>
      ))}
    </div>
  )
}
