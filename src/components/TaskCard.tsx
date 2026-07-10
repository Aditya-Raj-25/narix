import React, { useState, useRef, useEffect } from 'react';
import type { Task, TaskStatus } from '../types';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, newStatus: TaskStatus) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onMove }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEdit = () => {
    onEdit(task.id);
    setIsMenuOpen(false);
  };

  const handleDelete = () => {
    onDelete(task.id);
    setIsMenuOpen(false);
  };

  const initials = task.assignee
    .split(' ')
    .filter(n => n)
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'U';

  const colors = ['#f87171', '#fb923c', '#fbbf24', '#34d399', '#38bdf8', '#818cf8', '#c084fc', '#f472b6'];
  const avatarColor = colors[task.assignee.length % colors.length];

  // Derive a dummy comment count for visual flair based on the task ID
  const commentCount = parseInt(task.id.replace(/\D/g, '') || '0') % 15;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={`${styles.priority} ${styles[task.priority]}`}>
          {task.priority === 'inProgress' ? 'IN PROGRESS' : task.priority.toUpperCase()}
        </span>
        
        <div className={styles.menuContainer} ref={menuRef}>
          <button 
            className={styles.menuButton} 
            onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
            aria-label="Task options"
          >
            •••
          </button>
          
          {isMenuOpen && (
            <div className={styles.dropdownMenu}>
              <button onClick={handleEdit}>Edit Task</button>
              <div className={styles.divider} />
              <div className={styles.moveSubmenu}>
                <span className={styles.moveTitle}>Move to:</span>
                <button onClick={() => { onMove(task.id, 'todo'); setIsMenuOpen(false); }} disabled={task.status === 'todo'}>To Do</button>
                <button onClick={() => { onMove(task.id, 'inProgress'); setIsMenuOpen(false); }} disabled={task.status === 'inProgress'}>In Progress</button>
                <button onClick={() => { onMove(task.id, 'done'); setIsMenuOpen(false); }} disabled={task.status === 'done'}>Done</button>
              </div>
              <div className={styles.divider} />
              <button className={styles.deleteBtn} onClick={handleDelete}>Delete Task</button>
            </div>
          )}
        </div>
      </div>
      
      <div className={styles.title}>{task.title}</div>
      {task.description && (
        <div className={styles.description}>{task.description}</div>
      )}
      
      <div className={styles.footer}>
        <div className={styles.avatar} style={{ backgroundColor: avatarColor }} title={task.assignee}>
          {initials}
        </div>
        {commentCount > 0 && (
          <div className={styles.comments}>
            <span className={styles.commentIcon}>💬</span>
            <span>{commentCount}</span>
          </div>
        )}
      </div>
    </div>
  );
};
