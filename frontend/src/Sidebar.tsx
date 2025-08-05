import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav
      className={`${styles.sidebar} d-none d-md-block col-md-3 col-lg-2`}
    >
      <h2 className="mb-4">Menu</h2>
      <div className="nav flex-column">
        <NavLink to="/"
        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
        ><i className="bi bi-house"> 首頁</i></NavLink>
        <NavLink to="/" className={styles.navLink}><i className="bi bi-list"> 所有事項</i></NavLink>
        <NavLink to="/" className={styles.navLink}><i className="bi bi-bell-fill"> 今日事項</i></NavLink>
        <NavLink to="/" className={styles.navLink}><i className="bi bi-list-check"> 已完成</i></NavLink>
        <NavLink to="/" className={styles.navLink}><i className="bi bi-ban"> 未完成</i></NavLink>
      </div>
    </nav>
  );
};

export default Sidebar;
