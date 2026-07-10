import React from 'react';
import styles from './Sidebar.module.css';

export const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>⊞</div>
        <div className={styles.logoText}>
          <span>Sprint Board</span>
          <span className={styles.logoSubtext}>Product Team</span>
        </div>
      </div>
      
      <nav className={styles.nav}>
        <div className={`${styles.navLink} ${styles.active}`}>
          <span>⊞</span> Board
        </div>
        <div className={styles.navLink}>
          <span>☰</span> Backlog
        </div>
        <div className={styles.navLink}>
          <span>◷</span> Timeline
        </div>
        <div className={styles.navLink}>
          <span>📊</span> Reports
        </div>
      </nav>

      <div className={styles.proBanner}>
        <h4>Pro Feature</h4>
        <p>Unlock advanced reporting and automations.</p>
        <button className={styles.upgradeBtn}>Upgrade Plan</button>
      </div>

      <div className={styles.bottomLinks}>
        <div className={styles.navLink}>
          <span>❓</span> Help
        </div>
        <div className={styles.navLink}>
          <span>🚪</span> Sign Out
        </div>
      </div>
    </aside>
  );
};
