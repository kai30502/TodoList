import styles from './Member.module.css';
import { useEffect, useState } from 'react';

function Member() {

    type User = {
        id: number;
        username: string;
        email: string;
        created_at: string;
    };

    const [user, setUser] = useState<User | null>(null);
    
    useEffect(() => {
        async function fetchMemberData() {
            try {
                const response = await fetch(
                    'http://localhost:3000/api/users', {
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('網路請求失敗，請稍後再試');
                }

                const data = await response.json();
                setUser(data);
            } catch (err) {
                console.error('錯誤:', err);
            }
        }
        fetchMemberData()
    }, []);

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>會員中心</h1>
            {user ? (
            <div className={styles.card}>
                <p><strong>使用者名稱：</strong>{user.username}</p>
                <p><strong>電子信箱：</strong>{user.email}</p>
                <p><strong>註冊時間：</strong>{new Date(user.created_at).toLocaleString()}</p>
            </div>
            ) : (
                <p>載入中...</p>
            )}
            <button className={styles.logoutButton}>
                登出
            </button>
        </div>
    );
}

export default Member;
