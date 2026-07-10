import React from 'react';
import { LayoutDashboard, LayoutTemplate, ListTodo, Clock, BarChart2, HelpCircle, LogOut } from 'lucide-react';
import styles from './Sidebar.module.css';

export const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}><LayoutDashboard size={18} /></div>
        <div className={styles.logoText}>
          <span>Sprint Board</span>
          <span className={styles.logoSubtext}>Product Team</span>
        </div>
      </div>
      
      <nav className={styles.nav}>
        <div className={`${styles.navLink} ${styles.active}`}>
          <LayoutTemplate size={18} /> Board
        </div>
        <div className={styles.navLink}>
          <ListTodo size={18} /> Backlog
        </div>
        <div className={styles.navLink}>
          <Clock size={18} /> Timeline
        </div>
        <div className={styles.navLink}>
          <BarChart2 size={18} /> Reports
        </div>
      </nav>

      <div className={styles.proBanner}>
        <h4>Pro Feature</h4>
        <p>Unlock advanced reporting and automations.</p>
        <button className={styles.upgradeBtn}>Upgrade Plan</button>
      </div>

      <div className={styles.bottomLinks}>
        <div className={styles.navLink}>
          <HelpCircle size={18} /> Help
        </div>
        <div className={styles.navLink}>
          <LogOut size={18} /> Sign Out
        </div>
      </div>
    </aside>
  );
};
