import styles from './Login.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import zxcvbn from 'zxcvbn';


function Register() {

    const navigate = useNavigate();


    const [username, setusername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('密碼不一致');
            return;
        }

        try {
            const res = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await res.json();

            if (res.ok) {
                alert('註冊成功！');
            } else {
                setError(data.message || '註冊失敗');
            }
        } catch (err) {
            console.error('登入錯誤', err);
            setError('伺服器錯誤');
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.loginBox}>
                <h2 className={styles.title}>會員註冊</h2>
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
                            type="text"
                            name="email"
                            id="email"
                            required
                            className={styles.input}
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email" className={styles.label}>電子信箱</label>
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
                            onChange={(e) => {
                                const value = e.target.value;
                                setPassword(value);
                                const result = zxcvbn(value);
                                switch (result.score) {
                                    case 0:
                                    case 1:
                                        setPasswordStrength('弱');
                                        break;
                                    case 2:
                                        setPasswordStrength('中');
                                        break;
                                    case 3:
                                    case 4:
                                        setPasswordStrength('強');
                                        break;
                                    default:
                                        setPasswordStrength('');
                                }
                            }}
                        />
                        <label htmlFor="password" className={styles.label}>密碼</label>
                        {password && (
                            <p style={{ color: passwordStrength === '強' ? 'green' : passwordStrength === '中' ? 'orange' : 'red' }}>
                                密碼強度：{passwordStrength}
                            </p>
                        )}
                    </div>
                    <p></p>
                    <div className={styles.inputGroup}>
                        <input
                            type="Password"
                            name="confirmPassword"
                            id="confirmPassword"
                            required
                            className={styles.input}
                            placeholder=" "
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <label htmlFor="confirmPassword" className={styles.label}>密碼</label>
                    </div>
                    <button type="submit" className={styles.button}>註冊</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <p className={styles.registerText}>已經有帳號？ 
                        <button
                            type="button"
                            className={styles.registerButton}
                            onClick={() => navigate('/Login')}
                        >
                            登入
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;