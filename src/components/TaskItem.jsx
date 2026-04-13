import { useState, useRef, useEffect } from "react";

const PRIORITY_STYLES = {
  low: {
    dot: "bg-sky-400",
    badge: "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30",
  },
  medium: {
    dot: "bg-amber-400",
    badge:
      "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30",
  },
  high: {
    dot: "bg-rose-400",
    badge: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30",
  },
};

function formatDate(str) {
  if (!str) return null;
  const d = new Date(str + "T00:00:00");
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const due = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diff = Math.floor((due - today) / 86400000);
  if (diff < 0) return { label: "Overdue", overdue: true };
  if (diff === 0) return { label: "Today", today: true };
  if (diff === 1) return { label: "Tomorrow", soon: true };
  return {
    label: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    future: true,
  };
}

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
  dragHandleProps,
  isDragging,
}) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || "");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const editRef = useRef(null);
  const deleteTimer = useRef(null);

  useEffect(() => {
    if (editing) editRef.current?.focus();
  }, [editing]);

  useEffect(() => () => clearTimeout(deleteTimer.current), []);

  function handleEditSubmit(e) {
    e?.preventDefault();
    const trimmed = editText.trim();
    if (!trimmed) return;
    onEdit(task.id, {
      text: trimmed,
      priority: editPriority,
      dueDate: editDueDate,
    });
    setEditing(false);
  }

  function handleEditKeyDown(e) {
    if (e.key === "Escape") {
      setEditText(task.text);
      setEditPriority(task.priority);
      setEditDueDate(task.dueDate || "");
      setEditing(false);
    }
  }

  function handleDeleteClick() {
    if (confirmDelete) {
      onDelete(task.id);
    } else {
      setConfirmDelete(true);
      deleteTimer.current = setTimeout(() => setConfirmDelete(false), 2500);
    }
  }

  const pStyle = PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.medium;
  const dateInfo = formatDate(task.dueDate);

  if (editing) {
    return (
      <div
        className={`rounded-2xl border border-amber-300 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(249,246,240,0.95))]
        p-4 shadow-[0_24px_52px_-34px_rgba(217,119,6,0.26)] transition-all duration-200
        dark:border-amber-700/60 dark:bg-none dark:bg-stone-800 dark:shadow-[0_24px_52px_-34px_rgba(0,0,0,0.55)]`}
      >
        <form onSubmit={handleEditSubmit} noValidate>
          <input
            ref={editRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleEditKeyDown}
            className="w-full bg-transparent text-stone-800 dark:text-stone-100 text-sm font-medium
              outline-none border-b border-stone-200 dark:border-stone-700 pb-2 mb-3
              focus:border-amber-400 dark:focus:border-amber-500 transition-colors"
          />
          <div className="flex flex-wrap gap-3">
            {/* Priority */}
            <div className="flex gap-1.5">
              {["low", "medium", "high"].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setEditPriority(p)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-all duration-150
                    focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer
                    ${
                      editPriority === p
                        ? PRIORITY_STYLES[p].badge
                        : "text-stone-500 bg-stone-50 dark:bg-stone-900/50 dark:text-stone-600 hover:bg-stone-100 dark:hover:bg-stone-700"
                    }`}
                >
                  {p}
                </button>
              ))}
            </div>
            {/* Date */}
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-700
                rounded-lg px-2.5 py-1 text-xs text-stone-600 dark:text-stone-400
                focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 mt-3">
            <button
              type="submit"
              className="flex-1 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs
                font-semibold transition-all duration-200 focus:outline-none focus:ring-2 cursor-pointer
                focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-stone-800"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setEditText(task.text);
                setEditing(false);
              }}
              className="flex-1 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-700 hover:bg-stone-200
                dark:hover:bg-stone-600 text-stone-600 dark:text-stone-300 text-xs font-semibold
                transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-stone-400 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div
      className={`group relative rounded-2xl border transition-all duration-200 task-enter
      bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(250,247,241,0.95))] shadow-[0_18px_38px_-32px_rgba(68,64,60,0.3)]
      dark:bg-none dark:bg-stone-800/80 dark:shadow-[0_18px_38px_-32px_rgba(0,0,0,0.5)]
      ${
        task.completed
          ? "border-[#ebe3d7] dark:border-stone-700/40 opacity-75 hover:opacity-95"
          : "border-[#e7ddcf] dark:border-stone-700/60 hover:border-[#ddc7a7] dark:hover:border-stone-600 hover:shadow-[0_22px_42px_-30px_rgba(217,119,6,0.18)]"
      }
      ${isDragging ? "shadow-xl border-amber-300 dark:border-amber-600 rotate-1 scale-[1.02] opacity-95" : ""}
    `}
    >
      <div className="flex items-start gap-3 px-4 py-3.5">
        {/* Drag handle */}
        <div
          {...dragHandleProps}
          className="mt-0.5 shrink-0 opacity-100
            cursor-grab active:cursor-grabbing text-stone-500 dark:text-stone-500 self-center"
          aria-label="Drag to reorder"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <circle cx="3.5" cy="3" r="1.2" />
            <circle cx="8.5" cy="3" r="1.2" />
            <circle cx="3.5" cy="6" r="1.2" />
            <circle cx="8.5" cy="6" r="1.2" />
            <circle cx="3.5" cy="9" r="1.2" />
            <circle cx="8.5" cy="9" r="1.2" />
          </svg>
        </div>

        {/* Checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? "Mark as active" : "Mark as complete"}
          aria-pressed={task.completed}
          className={`shrink-0 w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center
            transition-all duration-250 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2
            dark:focus:ring-offset-stone-800
            ${
              task.completed
                ? "bg-emerald-500 border-emerald-500 scale-98"
                : "border-stone-300 dark:border-stone-600 hover:border-emerald-400 dark:hover:border-emerald-500 hover:scale-110"
            }`}
        >
          {task.completed && (
            <svg
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1.5 4.5l2 2 4-4" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm leading-snug wrap-break-words
            ${
              task.completed
                ? "line-through text-stone-500 dark:text-stone-600"
                : "text-stone-800 dark:text-stone-100 font-medium"
            }`}
          >
            {task.text}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
            {/* Priority dot + label */}
            <span
              className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${pStyle.badge}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${pStyle.dot}`} />
              {task.priority}
            </span>

            {/* Due date */}
            {dateInfo && (
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full inline-flex items-center gap-1
                ${
                  dateInfo.overdue
                    ? "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30"
                    : dateInfo.today
                      ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30"
                      : dateInfo.soon
                        ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30"
                        : "text-stone-500 dark:text-stone-500 bg-stone-50 dark:bg-stone-900/50"
                }`}
              >
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 9 9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <rect x="1" y="2" width="7" height="6" rx="1" />
                  <path d="M3 1v2M6 1v2M1 5h7" />
                </svg>
                {dateInfo.label}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-0.5">
          <button
            onClick={() => setEditing(true)}
            aria-label="Edit task"
            className="w-7 h-7 rounded-lg flex items-center justify-center
              text-stone-400 dark:text-stone-600 hover:text-amber-500 dark:hover:text-amber-400
              hover:bg-amber-50/80 dark:hover:bg-amber-900/20 transition-all duration-150
              focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 2l2 2L4 11H2V9L9 2z" />
            </svg>
          </button>
          <button
            onClick={handleDeleteClick}
            aria-label={confirmDelete ? "Confirm delete" : "Delete task"}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150
              focus:outline-none focus:ring-2 focus:ring-rose-400 cursor-pointer
              ${
                confirmDelete
                  ? "bg-rose-50 dark:bg-rose-900/30 text-rose-500 dark:text-rose-400"
                  : "text-stone-400 dark:text-stone-600 hover:text-rose-400 dark:hover:text-rose-400 hover:bg-rose-50/80 dark:hover:bg-rose-900/20"
              }`}
          >
            {confirmDelete ? (
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M2 6.5L5 9.5L11 3.5" />
              </svg>
            ) : (
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              >
                <path d="M2 4h9M4.5 4V3a1 1 0 011-1h2a1 1 0 011 1v1M5.5 6.5v3M7.5 6.5v3M3 4l.6 6.5a1 1 0 001 .9h3.8a1 1 0 001-.9L10 4" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
