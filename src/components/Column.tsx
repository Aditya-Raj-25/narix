import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { Column as ColumnType, Task, TaskStatus } from '../types';
import { TaskCard } from './TaskCard';
import styles from './Column.module.css';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onEditTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onMoveTask: (id: string, newStatus: TaskStatus) => void;
  onAddTask?: () => void;
}

export const Column: React.FC<ColumnProps> = ({ 
  column, 
  tasks, 
  onEditTask, 
  onDeleteTask, 
  onMoveTask,
  onAddTask
}) => {
  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.title}>{column.title}</span>
          <span className={styles.count}>{tasks.length}</span>
        </div>
        <span className={styles.headerOptions}>•••</span>
      </div>
      
      <div className={styles.taskList}>
        {tasks.length === 0 ? (
          <div className={styles.empty}>
             <div className={styles.emptyIcon}><CheckCircle2 size={48} strokeWidth={1} /></div>
             <div className={styles.emptyText}>No tasks yet</div>
             <div className={styles.emptySubtext}>Completed tasks will appear here. Keep up the momentum!</div>
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onMove={onMoveTask}
            />
          ))
        )}
        
        {column.id === 'todo' && onAddTask && (
          <button className={styles.addCardBtn} onClick={onAddTask}>
            + Add new card
          </button>
        )}
      </div>
    </div>
  );
};
