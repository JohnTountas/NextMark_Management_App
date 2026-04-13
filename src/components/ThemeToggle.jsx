export default function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl border border-[#e8decf]
        bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(246,240,233,0.95))]
        text-stone-500 shadow-[0_16px_34px_-28px_rgba(68,64,60,0.38)] dark:border-stone-700
        dark:bg-none dark:bg-stone-800 dark:text-stone-400 hover:border-[#dcc8a8] hover:text-stone-700
        hover:shadow-[0_18px_36px_-24px_rgba(217,119,6,0.24)] dark:hover:bg-stone-700 dark:hover:text-stone-200
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2
        dark:focus:ring-offset-stone-900 cursor-pointer"
    >
      {dark ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <circle cx="8" cy="8" r="3.5" />
          <path d="M8 1.5V3M8 13v1.5M1.5 8H3M13 8h1.5M3.6 3.6l1 1M11.4 11.4l1 1M3.6 12.4l1-1M11.4 4.6l1-1" />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M13.5 8.5A5.5 5.5 0 017 2.5c0-.28.03-.55.07-.82A6 6 0 1013.82 8.43c-.1.02-.21.07-.32.07z" />
        </svg>
      )}
    </button>
  );
}
