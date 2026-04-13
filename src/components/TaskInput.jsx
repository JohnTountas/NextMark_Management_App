import { useState, useRef } from "react";

// Keep allowed priorities in one place so create/edit flows can stay aligned if
// the product expands its task taxonomy later.
const PRIORITIES = ["low", "medium", "high"];

// Task creation owns its transient form state locally and emits a normalized
// payload upward once validation passes.
export default function TaskInput({ onAdd }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();

    // Validate at the edge of the form so upstream state only receives clean
    // task payloads.
    if (!trimmed) {
      setError("Please enter a task name.");
      inputRef.current?.focus();
      return;
    }
    onAdd({ text: trimmed, priority, dueDate });
    setText("");
    setDueDate("");
    setPriority("medium");
    setError("");
    setExpanded(false);
  }

  function handleKeyDown(e) {
    // Escape collapses the optional controls without discarding an in-progress
    // task name, which makes the interaction forgiving.
    if (e.key === "Escape") {
      setExpanded(false);
      setError("");
    }
  }

  // Styling remains data-driven to keep the button rendering branch small and
  // predictable as theme tokens evolve.
  const priorityColors = {
    low: "text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-900/30 border-sky-200 dark:border-sky-800",
    medium:
      "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800",
    high: "text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/30 border-rose-200 dark:border-rose-800",
  };

  return (
    <div className="mb-6 fade-in">
      <form onSubmit={handleSubmit} noValidate>
        <div
          className={`rounded-[26px] border backdrop-blur-sm transition-all duration-300
          bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(249,246,240,0.95))]
          shadow-[0_22px_48px_-36px_rgba(68,64,60,0.34),inset_0_1px_0_rgba(255,255,255,0.96)]
          dark:bg-none dark:bg-stone-800/80 dark:shadow-[0_22px_48px_-36px_rgba(0,0,0,0.55)]
          ${
            expanded
              ? "shadow-[0_28px_60px_-34px_rgba(217,119,6,0.28),inset_0_1px_0_rgba(255,255,255,0.96)]"
              : "hover:shadow-[0_24px_54px_-34px_rgba(68,64,60,0.34),inset_0_1px_0_rgba(255,255,255,0.96)]"
          }
          ${
            error
              ? "border-rose-300 dark:border-rose-700"
              : expanded
                ? "border-[#dbc39f] dark:border-stone-700"
                : "border-[#e7ddce] dark:border-stone-700 hover:border-[#ddcfbb] dark:hover:border-stone-600"
          }`}
        >
          {/* Main input row */}
          <div className="flex items-center gap-3 px-4 py-3.5">
            <button
              type="submit"
              aria-label="Add task"
              className="w-7 h-7 rounded-full border-2 border-stone-300 dark:border-stone-600 shrink-0
                flex items-center justify-center cursor-pointer
                hover:border-amber-500 hover:bg-amber-50/80 dark:hover:border-amber-500 dark:hover:bg-amber-900/20
                transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 dark:focus:ring-offset-stone-800"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-stone-400"
              >
                <path d="M5 1v8M1 5h8" />
              </svg>
            </button>

            <input
              ref={inputRef}
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setError("");
              }}
              onFocus={() => setExpanded(true)}
              onKeyDown={handleKeyDown}
              placeholder="Add a new task..."
              aria-label="New task"
              className="flex-1 bg-transparent text-stone-800 dark:text-stone-100 placeholder-stone-400
                dark:placeholder-stone-600 text-sm font-medium outline-none leading-relaxed"
            />

            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-label="More options"
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1
                ${
                  expanded
                    ? "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                    : "text-stone-400 dark:text-stone-600 hover:bg-white/70 hover:text-stone-600 dark:hover:text-stone-400"
                }`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M3 5h10M3 8h7M3 11h4" />
              </svg>
            </button>
          </div>

          {/* Expanded options */}
          {expanded && (
            <div className="px-4 pb-4 pt-1 border-t border-[#eee4d7] dark:border-stone-700/60">
              <div className="flex flex-wrap gap-3 mt-3">
                {/* Priority selector */}
                <div className="flex-1 min-w-40">
                  <label className="block text-xs font-medium text-stone-500 dark:text-stone-500 uppercase tracking-wider mb-2">
                    Priority
                  </label>
                  <div className="flex gap-1.5">
                    {PRIORITIES.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPriority(p)}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border capitalize
                          transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer
                          ${
                            priority === p
                              ? priorityColors[p]
                              : "text-stone-500 dark:text-stone-600 bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600"
                          }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Due date */}
                <div className="flex-1 min-w-40">
                  <label className="block text-xs font-medium text-stone-500 dark:text-stone-500 uppercase tracking-wider mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-700
                      rounded-lg px-3 py-1.5 text-xs text-stone-600 dark:text-stone-400
                      focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent
                      transition-all duration-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-3 w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white
                  text-sm font-semibold tracking-wide transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2
                  dark:focus:ring-offset-stone-800 shadow-sm hover:shadow-md active:scale-[0.98] cursor-pointer"
              >
                Add Task
              </button>
            </div>
          )}
        </div>

        {error && (
          <p className="mt-2 text-xs text-rose-500 dark:text-rose-400 pl-1 slide-in">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
