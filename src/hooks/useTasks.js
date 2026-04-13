import { useState, useEffect, useCallback } from 'react';
import { generateId, SAMPLE_TASKS } from '../utils/helpers';
import { loadTasks, saveTasks } from '../utils/storage';

// Legacy hook from an earlier architecture. It is not currently consumed by the
// live App shell, but the comments here keep it understandable if reused or removed.
export const useTasks = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = loadTasks();
    return saved !== null ? saved : SAMPLE_TASKS;
  });

  // Persist after every mutation so callers get durable behavior by default.
  useEffect(() => { saveTasks(tasks); }, [tasks]);

  const addTask = useCallback((data) => {
    // Normalize records at creation time so downstream consumers can assume a
    // stable task shape.
    const task = {
      id: generateId(),
      title: data.title.trim(),
      completed: false,
      priority: data.priority || 'medium',
      dueDate: data.dueDate || null,
      createdAt: Date.now(),
      order: Date.now(),
    };
    setTasks(prev => [task, ...prev]);
    return task.id;
  }, []);

  // Keep mutation helpers narrow and predictable. That makes them easy to swap
  // behind an API layer later without changing the public hook contract.
  const updateTask = useCallback((id, updates) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  const toggleTask = useCallback((id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }, []);

  const clearCompleted = useCallback(() => {
    setTasks(prev => prev.filter(t => !t.completed));
  }, []);

  const reorderTasks = useCallback((newOrder) => {
    setTasks(newOrder);
  }, []);

  return { tasks, addTask, updateTask, deleteTask, toggleTask, clearCompleted, reorderTasks };
};
