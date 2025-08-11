import styles from './AllTasks.module.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import AuthContext from '../context/AuthContext';
import getColorByEnum from '../components/getColorByEnum';

function CompletedTasks() {
    const navigate = useNavigate();
    const auth = React.useContext(AuthContext);

    interface Task {
        id: number;
        title: string;
        color: string;
        description: string;
        created_at: string;
        due_date: string;
    }

    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        async function fetchTasks() {
            if (!auth?.isAuthenticated) {
                navigate('/login');
                alert('請先登入');
                return;
            }
            let data = await fetch('http://localhost:3000/api/todos/completedtasks',{
                credentials: 'include'
            });
            let tasks = await data.json();
            setTasks(tasks);
        }
        fetchTasks();
    }, []);

    return (
        <div className='AllTasks'>
            <h1 className={styles.AllTasks_title}>已完成</h1>
            <div className={`${styles.stick} row g-3`}>
            {tasks.map((task, index) => (
                    <div className='col-lg-3 col-md-6 col-sm-12' key={index}>
                        <div
                            className={styles.single_stick}
                            style={{ backgroundColor: getColorByEnum(task.color), cursor: 'pointer' }}
                            onClick={() => navigate(`/tasks/${task.id}`)}
                        >
                            <h3 className={styles.stick_title}>{task.title}</h3>
                            <p className={styles.stick_subtitle}>建立日期：{new Date(task.created_at).toLocaleString()}</p>
                            <p className={styles.stick_subtitle}>截止日期：{new Date(task.due_date).toLocaleString()}</p>
                            <p className={styles.card_content}>{task.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CompletedTasks;