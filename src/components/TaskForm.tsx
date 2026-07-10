import React, { useState } from 'react';
import type { Task, TaskPriority, TaskStatus } from '../types';
import styles from './TaskForm.module.css';

interface TaskFormProps {
  existingTask?: Task;
  onSave: (task: Omit<Task, 'id' | 'status'> & { id?: string; status?: TaskStatus }) => void;
  onClose: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ existingTask, onSave, onClose }) => {
  const [title, setTitle] = useState(existingTask?.title || '');
  const [description, setDescription] = useState(existingTask?.description || '');
  const [priority, setPriority] = useState<TaskPriority>(existingTask?.priority || 'medium');
  const [assignee, setAssignee] = useState(existingTask?.assignee || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError('Title is required');
      return;
    }
    if (trimmedTitle.length > 80) {
      setError('Title must be 80 characters or less');
      return;
    }

    onSave({
      ...(existingTask ? { id: existingTask.id, status: existingTask.status } : {}),
      title: trimmedTitle,
      description: description.trim(),
      priority,
      assignee: assignee.trim() || 'Unassigned',
    });
  };

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleBlock}>
            <h2 id="modal-title">{existingTask ? 'Edit Task' : 'Add Task'}</h2>
            <p>{existingTask ? 'Update the details of your sprint item' : 'Create a new sprint item'}</p>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close form">✕</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="task-title" className={styles.label}>Task Title</label>
            <input 
              id="task-title"
              type="text" 
              className={`${styles.input} ${error ? styles.inputError : ''}`}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. Finish Homepage Design"
              autoFocus
            />
            {error && <span className={styles.errorText}>{error}</span>}
            <span className={styles.charCount}>{title.length}/80</span>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="task-desc" className={styles.label}>Description</label>
            <textarea 
              id="task-desc"
              className={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details about this task..."
            />
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label htmlFor="task-priority" className={styles.label}>Priority</label>
              <select 
                id="task-priority"
                className={styles.select}
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="task-assignee" className={styles.label}>Assignee</label>
              <input 
                id="task-assignee"
                type="text" 
                className={styles.input}
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                placeholder="e.g. Sarah Miller"
              />
            </div>
          </div>

          <div className={styles.footer}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn}>
              {existingTask ? 'Save Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
