import { useState, useMemo, useCallback, useEffect } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Header from "./components/Header";
import TaskStats from "./components/TaskStats";
import TaskInput from "./components/TaskInput";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";

function generateId() {
  return `task_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export default function App() {
  const [tasks, setTasks] = useLocalStorage("opus_tasks", []);
  const [dark, setDark] = useLocalStorage("opus_dark", false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [currentYear, setCurrentYear] = useState(() =>
    new Date().getFullYear(),
  );

  // Sync dark mode class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    let intervalId;
    let timeoutId;

    const syncYear = () => setCurrentYear(new Date().getFullYear());
    const now = new Date();
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
    );

    timeoutId = window.setTimeout(() => {
      syncYear();
      intervalId = window.setInterval(syncYear, 86400000);
    }, nextMidnight.getTime() - now.getTime());

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, []);

  const addTask = useCallback(
    (data) => {
      const newTask = {
        id: generateId(),
        text: data.text,
        priority: data.priority || "medium",
        dueDate: data.dueDate || "",
        completed: false,
        createdAt: Date.now(),
      };
      setTasks((prev) => [newTask, ...prev]);
    },
    [setTasks],
  );

  const toggleTask = useCallback(
    (id) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
      );
    },
    [setTasks],
  );

  const deleteTask = useCallback(
    (id) => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    },
    [setTasks],
  );

  const editTask = useCallback(
    (id, updates) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      );
    },
    [setTasks],
  );

  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  }, [setTasks]);

  const reorderTasks = useCallback(
    (fromIndex, toIndex) => {
      setTasks((prev) => {
        // We reorder within the full list based on filtered indices
        const filtered = getFiltered(prev, filter, search);
        const reorderedFiltered = [...filtered];
        const [moved] = reorderedFiltered.splice(fromIndex, 1);
        reorderedFiltered.splice(toIndex, 0, moved);

        // Rebuild full list preserving non-filtered items in their relative positions
        const filteredIds = new Set(filtered.map((t) => t.id));
        const nonFiltered = prev.filter((t) => !filteredIds.has(t.id));
        const result = [];
        let fi = 0;
        let ni = 0;
        for (let i = 0; i < prev.length; i++) {
          if (filteredIds.has(prev[i].id)) {
            result.push(reorderedFiltered[fi++]);
          } else {
            result.push(nonFiltered[ni++]);
          }
        }
        return result;
      });
    },
    [filter, search, setTasks],
  );

  function getFiltered(allTasks, f, s) {
    return allTasks
      .filter((t) => {
        if (f === "active") return !t.completed;
        if (f === "completed") return t.completed;
        return true;
      })
      .filter((t) => !s || t.text.toLowerCase().includes(s.toLowerCase()));
  }

  const filteredTasks = useMemo(
    () => getFiltered(tasks, filter, search),
    [tasks, filter, search],
  );

  const stats = useMemo(
    () => ({
      total: tasks.length,
      active: tasks.filter((t) => !t.completed).length,
      completed: tasks.filter((t) => t.completed).length,
    }),
    [tasks],
  );

  return (
    <div className="min-h-screen flex flex-col bg-[linear-gradient(180deg,#fffdfb_0%,#faf5ee_38%,#f3ece2_72%,#ebe1d5_100%)] dark:bg-none dark:bg-stone-950 transition-colors duration-300">
      <div className="fixed inset-0 overflow-hidden pointer-events-none dark:hidden">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-amber-300/25 blur-3xl" />
        <div className="absolute top-24 -right-24 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />
        <div className="absolute -bottom 24 left-1/3 h-72 w-72 rounded-full bg-rose-200/15 blur-3xl" />
      </div>

      {/* Subtle texture overlay */}
      {/* <div
        className="fixed inset-0 pointer-events-none opacity-[0.012] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      /> */}

      <div className="relative w-full max-w-xl mx-auto flex-1 px-4 py-10 sm:py-16">
        <div className="rounded-4xl border border-[#daccb7] bg-white/90 p-5 shadow-[0_px_80px_-44px_rgba(68,64,60,0.4),0_16px_36px_-30px_rgba(217,119,6,0.22)] sm:p-6 dark:border-stone-800/80 dark:bg-stone-900/80 dark:shadow-[0_32px_80px_-44px_rgba(0,0,0,0.7)]">
          <Header
            dark={dark}
            onToggleDark={() => setDark((d) => !d)}
            totalTasks={stats.total}
            completedTasks={stats.completed}
          />

          {stats.total > 0 && (
            <TaskStats
              total={stats.total}
              active={stats.active}
              completed={stats.completed}
            />
          )}

          <TaskInput onAdd={addTask} />

          <TaskFilters
            filter={filter}
            onFilter={setFilter}
            search={search}
            onSearch={setSearch}
            onClearCompleted={clearCompleted}
            hasCompleted={stats.completed > 0}
          />

          <TaskList
            tasks={filteredTasks}
            filter={filter}
            search={search}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
            onReorder={reorderTasks}
          />

          {/* Footer */}
          {stats.total > 0 && (
            <p className="mt-8 text-center text-sm font-medium text-stone-500 dark:text-stone-700 fade-in">
              {stats.active === 0
                ? "All tasks complete - great work!"
                : `${stats.active} task${stats.active !== 1 ? "s" : ""} left to complete`}
            </p>
          )}
        </div>
      </div>

      <footer className="relative w-full px-4 pb-6 sm:pb-8">
        <div className="mx-auto grid max-w-6xl items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <div className="hidden sm:block" />

          <p className="justify-self-end text-right text-xs font-medium tracking-[0.02em] text-stone-600 dark:text-stone-500 sm:col-start-3 sm:justify-self-end sm:text-right">
            Copyright {currentYear} - NextMark.
            <br /> All rights reserved. Created by{" "}
            <a
              href="https://www.linkedin.com/in/ioannis-tountas"
              target="_blank"
              rel="noreferrer"
              className="text-amber-600 underline decoration-transparent underline-offset-4 transition-all duration-200 hover:text-blue-400 hover:decoration-blue-400 focus:outline-none focus:text-amber-600 focus:decoration-amber-500 dark:text-stone-300 dark:hover:text-amber-400 dark:hover:decoration-amber-400 dark:focus:text-amber-400 dark:focus:decoration-amber-400"
            >
              John Tountas
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
