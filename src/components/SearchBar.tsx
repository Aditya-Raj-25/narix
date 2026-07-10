import React from 'react';
import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className={styles.container}>
      <span className={styles.icon}><Search size={16} /></span>
      <input 
        type="text" 
        className={styles.input} 
        placeholder="Search tasks..." 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search tasks"
      />
    </div>
  );
};
