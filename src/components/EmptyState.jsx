// Keep empty-state copy contextual so users can tell whether the list is empty
// because of filters, search, or genuinely having no tasks yet.
export default function EmptyState({ filter, search }) {
  if (search) {
    return (
      <div className="py-16 text-center fade-in">
        <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto mb-4">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="text-stone-400 dark:text-stone-600"
          >
            <circle cx="8.5" cy="8.5" r="6" />
            <path d="M13 13l4 4" />
          </svg>
        </div>
        <p className="text-sm font-medium text-stone-600 dark:text-stone-500">
          No tasks match your search
        </p>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-600">
          Try a different keyword
        </p>
      </div>
    );
  }

  if (filter === "active") {
    return (
      <div className="py-16 text-center fade-in">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mx-auto mb-4">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-emerald-500"
          >
            <path d="M4 11l5 5 9-9" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-stone-700 dark:text-stone-400">
          All caught up!
        </p>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-600">
          No active tasks remaining
        </p>
      </div>
    );
  }

  if (filter === "completed") {
    return (
      <div className="py-16 text-center fade-in">
        <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto mb-4">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="text-stone-400 dark:text-stone-600"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M11 7v4l2 2" />
          </svg>
        </div>
        <p className="text-m font-medium text-stone-600 dark:text-stone-500">
          No completed tasks yet.
        </p>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-600">
          Finish a task to see it here.
        </p>
      </div>
    );
  }

  return (
    <div className="py-16 text-center fade-in">
      <div className="w-16 h-16 rounded-3xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mx-auto mb-5 shadow-inner">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-amber-500"
        >
          <rect x="5" y="5" width="18" height="18" rx="3" />
          <path d="M10 14h8M10 10h5M10 18h6" />
        </svg>
      </div>
      <h3 className="font-display text-xl text-stone-700 dark:text-stone-300 mb-2">
        A clean slate
      </h3>
      <p className="text-sm text-stone-500 dark:text-stone-500 leading-relaxed max-w-55 mx-auto">
        Start by adding your first task above. Stay focused, stay productive.
      </p>
    </div>
  );
}
