import styles from './Member.module.css';

function Member() {
    const mockMember = {
        username: 'kai30',
        email: 'kai30@example.com',
        created_at: '2025-08-01 14:30:00',
    };

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>會員中心</h1>
            <div className={styles.card}>
                <p><strong>使用者名稱：</strong>{mockMember.username}</p>
                <p><strong>電子信箱：</strong>{mockMember.email}</p>
                <p><strong>註冊時間：</strong>{mockMember.created_at}</p>
            </div>
            <button className={styles.logoutButton}>
                登出
            </button>
        </div>
    );
}

export default Member;
