import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import styles from './AddTask.module.css';

function AddTask() {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('white');
    const [dueDate, setDueDate] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!auth?.isAuthenticated) {
            alert('請先登入');
            navigate('/login');
            return;
        }

        if (!title || !dueDate) {
            alert('請填寫標題與截止日期');
            return;
        }

        const newTask = {
            title,
            description,
            color,
            due_date: dueDate,
        };

        try {
            const response = await fetch('http://localhost:3000/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newTask),
            });

            if (response.ok) {
                alert('新增成功');
                navigate('/AllTasks');
            } else {
                alert('新增失敗');
            }
        } catch (error) {
            alert('伺服器錯誤，請稍後再試');
            console.error(error);
        }
    }

    return (
        <div className={styles.container}>
            <h1>新增待辦事項</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    標題<span style={{color:'red'}}>*</span>：
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="請輸入標題"
                    />
                </label>

                <label>
                    描述：
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="請輸入描述（選填）"
                    />
                </label>

                <label>
                    顏色：
                    <select value={color} onChange={(e) => setColor(e.target.value)}>
                        <option value="white">白色</option>
                        <option value="orange">橘色</option>
                        <option value="pink">粉紅色</option>
                        <option value="green">綠色</option>
                        <option value="blue">藍色</option>
                        <option value="yellow">黃色</option>
                    </select>
                </label>

                <label>
                    截止日期<span style={{color:'red'}}>*</span>：
                    <input
                        type="datetime-local"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </label>

                <div className={styles.button_group}>
                    <button type="submit" className={styles.submit_btn}>新增</button>
                    <button
                        type="button"
                        className={styles.cancel_btn}
                        onClick={() => navigate('/AllTasks')}
                    >
                        取消
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddTask;
