const TASKS_KEY = 'focus_tasks_v2';
const THEME_KEY = 'focus_theme_v2';

export const loadTasks = () => {
  try {
    const raw = localStorage.getItem(TASKS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
};

export const saveTasks = (tasks) => {
  try { localStorage.setItem(TASKS_KEY, JSON.stringify(tasks)); } catch {}
};

export const loadTheme = () => {
  try { return localStorage.getItem(THEME_KEY) || 'light'; } catch { return 'light'; }
};

export const saveTheme = (theme) => {
  try { localStorage.setItem(THEME_KEY, theme); } catch {}
};
