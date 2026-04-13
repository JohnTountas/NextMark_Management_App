export default function TaskFilters({
  filter,
  onFilter,
  search,
  onSearch,
  onClearCompleted,
  hasCompleted,
}) {
  const filters = ["all", "active", "completed"];

  return (
    <div className="mb-5 space-y-3 rounded-3xl border border-[#e7ddce] bg-white/78 px-3.5 py-3 shadow-[0_20px_42px_-36px_rgba(68,64,60,0.34)] backdrop-blur-sm fade-in dark:border-stone-800/70 dark:bg-stone-900/30 dark:shadow-[0_20px_42px_-36px_rgba(0,0,0,0.55)]">
      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-600 pointer-events-none"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <circle cx="6" cy="6" r="4.5" />
          <path d="M9.5 9.5L13 13" />
        </svg>
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search tasks..."
          aria-label="Search tasks"
          className="w-full rounded-xl border border-[#e8dece] bg-white/88 py-2.5 pl-9 pr-4 text-sm
            dark:border-stone-700 dark:bg-stone-800/80
            text-stone-700 dark:text-stone-200 placeholder-stone-400 dark:placeholder-stone-600
            focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent
            transition-all duration-200"
        />
      </div>

      {/* Filter tabs + Clear completed */}
      <div className="flex items-center justify-between gap-2 ">
        <div className="flex gap-0.5 rounded-xl border border-[#ece1d2] bg-[#f4ede4]/90 p-1 dark:border-stone-700/70 dark:bg-stone-800/60">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => onFilter(f)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1
                ${
                  filter === f
                    ? "border border-[#e8ddcc] bg-white text-stone-800 shadow-[0_10px_24px_-18px_rgba(68,64,60,0.4)] dark:border-stone-600 dark:bg-stone-700 dark:text-stone-100 dark:shadow-none"
                    : "text-stone-500 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {hasCompleted && (
          <button
            onClick={onClearCompleted}
            className="text-xs hover:scale-110 text-stone-600 dark:text-stone-600 hover:text-rose-500 dark:hover:text-rose-400
              transition-colors duration-200 font-medium focus:outline-none focus:underline whitespace-nowrap cursor-pointer "
          >
            Clear done
          </button>
        )}
      </div>
    </div>
  );
}
