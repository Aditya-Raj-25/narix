import { useState, useEffect } from 'react';
import type { Task, TaskPriority } from '../types';
import { useLocalStorage } from './useLocalStorage';

const ASSIGNEES = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];
const PRIORITIES: TaskPriority[] = ['low', 'medium', 'high'];

interface UseSeedDataResult {
  tasks: Task[];
  setTasks: (value: Task[] | ((val: Task[]) => Task[])) => void;
  isLoading: boolean;
  error: string | null;
  dismissError: () => void;
}

export function useSeedData(localStorageKey: string = 'sprint-board-tasks'): UseSeedDataResult {
  // useLocalStorage handles initial parsing from localStorage and persisting future updates
  const [tasks, setTasks] = useLocalStorage<Task[]>(localStorageKey, []);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        // If data is already in localStorage (even an empty array from a previous save),
        // we skip fetching to preserve the board state across refreshes.
        const stored = localStorage.getItem(localStorageKey);
        if (stored) {
          setIsLoading(false);
          return;
        }

        // If no data exists in localStorage, this is the first load ever.
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=12');
        if (!response.ok) {
          throw new Error('Failed to fetch from API');
        }
        
        const todos = await response.json();
        
        const mappedTasks: Task[] = todos.map((todo: any) => {
          return {
            id: String(todo.id),
            // Trim title to 80 characters
            title: todo.title.length > 80 ? todo.title.substring(0, 80) : todo.title,
            description: '',
            status: todo.completed ? 'done' : 'todo',
            // Deterministic priority and assignee based on id
            priority: PRIORITIES[todo.id % PRIORITIES.length],
            assignee: ASSIGNEES[todo.id % ASSIGNEES.length],
          };
        });

        // setTasks (from useLocalStorage) will also persist this to localStorage
        setTasks(mappedTasks);
      } catch (err) {
        console.error('Failed to load seed tasks:', err);
        setError("Couldn't load tasks — showing empty board");
        setTasks([]); // Start with empty array on failure
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, [localStorageKey, setTasks]);

  const dismissError = () => setError(null);

  return { tasks, setTasks, isLoading, error, dismissError };
}
