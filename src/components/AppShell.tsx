import React from 'react';
import { LayoutTemplate, ListTodo, User, Settings } from 'lucide-react';
import styles from './AppShell.module.css';
import { Sidebar } from './Sidebar';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.appShell}>
      <Sidebar />
      <main className={styles.mainContent}>
        {children}
      </main>
      
      {/* Mobile Bottom Nav */}
      <nav className={styles.bottomNav}>
        <button className={`${styles.navItem} ${styles.active}`}>
          <span className={styles.navIcon}><LayoutTemplate size={20} /></span>
          <span>Board</span>
        </button>
        <button className={styles.navItem}>
          <span className={styles.navIcon}><ListTodo size={20} /></span>
          <span>Backlog</span>
        </button>
        <button className={styles.navItem}>
          <span className={styles.navIcon}><User size={20} /></span>
          <span>Profile</span>
        </button>
        <button className={styles.navItem}>
          <span className={styles.navIcon}><Settings size={20} /></span>
          <span>Settings</span>
        </button>
      </nav>
    </div>
  );
};
