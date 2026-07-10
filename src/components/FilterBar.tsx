import React from 'react';
import styles from './FilterBar.module.css';
import type { TaskPriority } from '../types';

interface FilterBarProps {
  assignees: string[];
  selectedPriority: TaskPriority | 'all';
  selectedAssignee: string;
  onPriorityChange: (priority: TaskPriority | 'all') => void;
  onAssigneeChange: (assignee: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  assignees,
  selectedPriority,
  selectedAssignee,
  onPriorityChange,
  onAssigneeChange,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.filterGroup}>
        <label htmlFor="priority-filter" className={styles.label}>Priority:</label>
        <select 
          id="priority-filter" 
          className={styles.select}
          value={selectedPriority}
          onChange={(e) => onPriorityChange(e.target.value as TaskPriority | 'all')}
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="assignee-filter" className={styles.label}>Assignee:</label>
        <select 
          id="assignee-filter" 
          className={styles.select}
          value={selectedAssignee}
          onChange={(e) => onAssigneeChange(e.target.value)}
        >
          <option value="all">All Assignees</option>
          {assignees.map(assignee => (
            <option key={assignee} value={assignee}>{assignee}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
