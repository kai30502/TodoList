import styles from './Member.module.css';
import AuthContext from '../context/AuthContext';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Member() {

    const navigator = useNavigate();
    const auth = React.useContext(AuthContext);

    useEffect(() => {
        async function checkAuth() {
            if (!auth?.isLoading && !auth?.isAuthenticated) {
                navigator('/login');
                alert('請先登入');
            }
        }
        checkAuth();
    }, [auth?.isLoading]);

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>會員中心</h1>
            {auth?.isAuthenticated ? (
            <div className={styles.card}>
                <p><strong>使用者名稱：</strong>{auth.user?.username}</p>
                <p><strong>電子信箱：</strong>{auth.user?.email}</p>
                <p><strong>註冊時間：</strong>
                {auth.user?.created_at
                ? new Date(auth.user.created_at).toLocaleString()
                : '無資料'}
                </p>
            </div>
            ) : (
                <p>載入中...</p>
            )}
            <button
                className={styles.logoutButton}
                onClick={async () => {
                    const response = await fetch('http://localhost:3000/api/logout', { credentials: 'include', method: 'POST' });
                    const data = await response.json();
                    auth?.logout();
                    alert(data.message)
                    navigator('/Login')
                }}
            >
                登出
            </button>
        </div>
    );
}

export default Member;
