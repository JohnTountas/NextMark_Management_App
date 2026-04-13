// Version storage keys so schema changes can be introduced without colliding
// with older browser data.
const TASKS_KEY = 'focus_tasks_v2';
const THEME_KEY = 'focus_theme_v2';

export const loadTasks = () => {
  // Storage reads should fail soft so the UI can still boot if the browser
  // contains malformed or inaccessible data.
  try {
    const raw = localStorage.getItem(TASKS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
};

export const saveTasks = (tasks) => {
  // Persist quietly; the current UX prefers staying usable over surfacing
  // non-critical storage write failures.
  try { localStorage.setItem(TASKS_KEY, JSON.stringify(tasks)); } catch {
    // Ignore storage write failures and let the caller continue gracefully.
  }
};

export const loadTheme = () => {
  try { return localStorage.getItem(THEME_KEY) || 'light'; } catch { return 'light'; }
};

export const saveTheme = (theme) => {
  try { localStorage.setItem(THEME_KEY, theme); } catch {
    // Theme persistence is non-critical, so failure should not block rendering.
  }
};
