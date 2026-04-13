import ThemeToggle from "./ThemeToggle";

const today = new Date().toLocaleDateString("GR", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

export default function Header({
  dark,
  onToggleDark,
  totalTasks,
  completedTasks,
}) {
  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <header className="mb-8 border-b border-[#ece3d5] pb-8 fade-in dark:border-stone-800/80">
      <div className="flex items-start justify-between gap-4  ">
        <div>
          <div className="mb-5 flex items-center"></div>
          <h1 className="font-display text-3xl sm:text-3xl text-stone-900 dark:text-stone-50 leading-tight  ">
            Stay on top of what matters.
          </h1>
          <p className="mt-3 text-sm font-semibold text-stone-600 dark:text-stone-400 ">
            {today}
          </p>
        </div>
        <ThemeToggle dark={dark} onToggle={onToggleDark} />
      </div>

      {totalTasks > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-stone-500 dark:text-stone-500 font-medium tracking-wide uppercase">
              Progress:
            </span>
            <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">
              {completedTasks}/{totalTasks}
            </span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden bg-[#ede4d7] dark:bg-stone-800">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#f59e0b_0%,#ea580c_100%)] transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </header>
  );
}
