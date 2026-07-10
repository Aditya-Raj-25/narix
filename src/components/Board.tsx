import React, { useState, useMemo } from 'react';
import { Bell, Settings, Calendar, SlidersHorizontal, Plus } from 'lucide-react';
import { useSeedData } from '../hooks/useSeedData';
import { Column } from './Column';
import { TaskForm } from './TaskForm';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';
import { useDebounce } from '../hooks/useDebounce';
import type { Column as ColumnType, Task, TaskStatus, TaskPriority } from '../types';
import styles from './Board.module.css';

const COLUMNS: ColumnType[] = [
  { id: 'todo', title: 'TO DO', status: 'todo' },
  { id: 'inProgress', title: 'IN PROGRESS', status: 'inProgress' },
  { id: 'done', title: 'DONE', status: 'done' },
];

export const Board: React.FC = () => {
  const { tasks, setTasks, isLoading, error, dismissError } = useSeedData();
  
  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  // Filter & Search State
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [filterPriority, setFilterPriority] = useState<TaskPriority | 'all'>('all');
  const [filterAssignee, setFilterAssignee] = useState<string>('all');

  // Compute unique assignees for the dropdown
  const uniqueAssignees = useMemo(() => {
    return Array.from(new Set(tasks.map(t => t.assignee))).sort();
  }, [tasks]);

  // Derived filtered tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
      const matchesAssignee = filterAssignee === 'all' || task.assignee === filterAssignee;
      
      return matchesSearch && matchesPriority && matchesAssignee;
    });
  }, [tasks, debouncedSearchTerm, filterPriority, filterAssignee]);

  if (isLoading) {
    return <div className={styles.loading}>Loading your workspace...</div>;
  }

  const deleteTask = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== id));
    }
  };

  const moveTask = (id: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  const addTask = (newTaskData: Omit<Task, 'id' | 'status'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      status: 'todo'
    };
    setTasks(prev => [...prev, newTask]);
  };

  const editTask = (id: string, updatedFields: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updatedFields } : task
    ));
  };

  const handleEditTaskClick = (id: string) => {
    setEditingTaskId(id);
    setIsFormOpen(true);
  };

  const openAddTask = () => {
    setEditingTaskId(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTaskId(null);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'status'> & { id?: string; status?: TaskStatus }) => {
    if (editingTaskId) {
      editTask(editingTaskId, taskData);
    } else {
      addTask(taskData);
    }
    handleCloseForm();
  };

  const editingTask = tasks.find(t => t.id === editingTaskId);

  return (
    <div className={styles.boardWrapper}>
      {error && (
        <div className={styles.errorBanner}>
          <span>{error}</span>
          <button className={styles.dismissButton} onClick={dismissError} aria-label="Dismiss error">
            ✕
          </button>
        </div>
      )}
      
      {/* Top Header */}
      <div className={styles.topBar}>
        <div className={styles.searchWrapper}>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
        <div className={styles.topBarActions}>
          <button className={styles.addButton} onClick={openAddTask}>
            <Plus size={16} /> Add Task
          </button>
          <div className={styles.iconGroup}>
            <Bell size={20} />
            <Settings size={20} />
            <div className={styles.avatar}>👤</div>
          </div>
        </div>
      </div>

      {/* Filter / Sort Bar */}
      <div className={styles.filterBar}>
        <div className={styles.filtersLeft}>
          <FilterBar 
            assignees={uniqueAssignees}
            selectedPriority={filterPriority}
            selectedAssignee={filterAssignee}
            onPriorityChange={setFilterPriority}
            onAssigneeChange={setFilterAssignee}
          />
          <div className={styles.filterDivider} />
          <div className={styles.filterAction}>
            <Calendar size={14} /> Due Date
          </div>
        </div>
        <div className={styles.sortSection}>
          Sort by: <strong>Recent</strong> <SlidersHorizontal size={14} />
        </div>
      </div>

      {/* Board Columns */}
      <div className={styles.boardContainer}>
        {COLUMNS.map(column => (
          <Column 
            key={column.id} 
            column={column} 
            tasks={filteredTasks.filter(task => task.status === column.status)} 
            onEditTask={handleEditTaskClick}
            onDeleteTask={deleteTask}
            onMoveTask={moveTask}
            onAddTask={openAddTask}
          />
        ))}
      </div>

      {isFormOpen && (
        <TaskForm 
          existingTask={editingTask}
          onSave={handleSaveTask}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};
