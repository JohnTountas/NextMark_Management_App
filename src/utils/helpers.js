// Legacy helper module for the alternate hook-based state layer. Keeping the
// rationale close to the utilities makes future consolidation easier.
export const generateId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

export const formatDate = (dateStr) => {
  // Reduce a raw due date into a compact badge model that UI components can
  // render without repeating date math.
  if (!dateStr) return null;
  const d = new Date(dateStr + 'T00:00:00');
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diff = Math.floor((d - now) / 86400000);
  if (diff < 0) return { label: `${Math.abs(diff)}d overdue`, overdue: true };
  if (diff === 0) return { label: 'Due today', today: true };
  if (diff === 1) return { label: 'Due tomorrow', soon: true };
  if (diff <= 7) return { label: `Due in ${diff}d`, soon: true };
  return {
    label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    normal: true,
  };
};

// Priority metadata is centralized here so alternate views can share display
// labels and semantic colors.
export const PRIORITY_CONFIG = {
  low:    { label: 'Low',    color: 'stone',  dot: '#a8a29e' },
  medium: { label: 'Med',    color: 'amber',  dot: '#f59e0b' },
  high:   { label: 'High',   color: 'rose',   dot: '#f43f5e' },
};

// Sample data supports demos and manual QA when this older hook stack is used
// in isolation from the current App shell.
export const SAMPLE_TASKS = [
  {
    id: 'sample-1',
    title: 'Review Q4 product roadmap',
    completed: false,
    priority: 'high',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    createdAt: Date.now() - 3600000,
    order: 0,
  },
  {
    id: 'sample-2',
    title: 'Prepare design system documentation',
    completed: false,
    priority: 'medium',
    dueDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
    createdAt: Date.now() - 7200000,
    order: 1,
  },
  {
    id: 'sample-3',
    title: 'Set up CI/CD pipeline for staging',
    completed: true,
    priority: 'high',
    dueDate: null,
    createdAt: Date.now() - 86400000,
    order: 2,
  },
  {
    id: 'sample-4',
    title: 'Schedule 1:1s with team members',
    completed: false,
    priority: 'low',
    dueDate: null,
    createdAt: Date.now() - 10800000,
    order: 3,
  },
];
