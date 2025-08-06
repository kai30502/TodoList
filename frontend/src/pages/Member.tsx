import styles from './Member.module.css';

function Member() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.loginBox}>
                <h2 className={styles.title}>會員登入</h2>
                <form className={styles.form}>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            required
                            className={styles.input}
                            placeholder=" "
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
                        />
                        <label htmlFor="password" className={styles.label}>密碼</label>
                    </div>
                    <button type="submit" className={styles.button}>登入</button>
                    <p className={styles.registerText}>還沒有帳號？</p>
                </form>
            </div>
        </div>
    );
}

export default Member;
