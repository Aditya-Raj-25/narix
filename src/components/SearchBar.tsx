import React from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className={styles.container}>
      <span className={styles.icon} aria-hidden="true">🔍</span>
      <input 
        type="text" 
        className={styles.input} 
        placeholder="Search tasks..." 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search tasks by title"
      />
    </div>
  );
};
