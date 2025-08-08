import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import React from "react";
import AuthContext from "./context/AuthContext";

function Sidebar() {

    const auth = React.useContext(AuthContext);
    
    return (
        <nav className={`${styles.sidebar} col-lg-2`}>
        <h2 className="mb-4">Menu</h2>
        <div className="nav flex-column">
            {auth?.isAuthenticated ?
            <NavLink to="/Member" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}><i className="bi bi-people"> 會員中心</i></NavLink> :
            <NavLink to="/Login" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}><i className="bi bi-person"> 登入</i></NavLink>
            }
            <NavLink to="/" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}><i className="bi bi-house"> 首頁</i></NavLink>
            <NavLink to="/AllTasks" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}><i className="bi bi-list"> 所有事項</i></NavLink>
            <NavLink to="/TodayTasks" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}><i className="bi bi-bell-fill"> 今日事項</i></NavLink>
            <NavLink to="/CompletedTasks" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}><i className="bi bi-list-check"> 已完成</i></NavLink>
            <NavLink to="/IncompleteTasks" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}><i className="bi bi-ban"> 未完成</i></NavLink>
        </div>
        </nav>
    );
};

export default Sidebar;
