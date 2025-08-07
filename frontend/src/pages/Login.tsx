import styles from './Login.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {

    const navigate = useNavigate();


    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();

            if (res.ok) {
                alert('登入成功！');
            } else {
                setError(data.message || '登入失敗');
            }
        } catch (err) {
            console.error('登入錯誤', err);
            setError('伺服器錯誤');
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.loginBox}>
                <h2 className={styles.title}>會員登入</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            required
                            className={styles.input}
                            placeholder=" "
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                        />
                        <label htmlFor="username" className={styles.label}>使用者名稱</label>
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            className={styles.input}
                            placeholder=" "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="password" className={styles.label}>密碼</label>
                    </div>
                    <button type="submit" className={styles.button}>登入</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <p className={styles.registerText}>還沒有帳號？ 
                        <button
                            type="button"
                            className={styles.registerButton}
                            onClick={() => navigate('/Register')}
                        >
                            註冊
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
