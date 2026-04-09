import { useState, useEffect, useCallback } from 'react';
import { generateId, SAMPLE_TASKS } from '../utils/helpers';
import { loadTasks, saveTasks } from '../utils/storage';

export const useTasks = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = loadTasks();
    return saved !== null ? saved : SAMPLE_TASKS;
  });

  useEffect(() => { saveTasks(tasks); }, [tasks]);

  const addTask = useCallback((data) => {
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
