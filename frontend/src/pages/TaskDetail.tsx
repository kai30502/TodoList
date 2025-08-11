import styles from './TaskDetail.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import getColorByEnum from '../components/getColorByEnum';

interface Task {
    id: number;
    title: string;
    color: string;
    description: string;
    created_at: string;
    due_date: string;
    is_completed: number | string;
}

function TaskDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [task, setTask] = useState<Task | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState<Partial<Task>>({});

    useEffect(() => {
        async function fetchTask() {
            if (!auth?.isAuthenticated) {
                navigate('/login');
                alert('請先登入');
                return;
            }

            const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setTask(data);
                setEditedTask(data);
            } else {
                alert('找不到事項');
                navigate('/AllTasks');
            }
        }

        fetchTask();
    }, [id]);

    async function handleComplete() {
        await fetch(`http://localhost:3000/api/todos/${id}/complete`, {
            method: 'PATCH',
            credentials: 'include',
        });
        alert('已標記為完成');
        navigate('/AllTasks');
    }

    async function handleIncomplete() {
        await fetch(`http://localhost:3000/api/todos/${id}/incomplete`, {
            method: 'PATCH',
            credentials: 'include',
        });
        alert('已標記為未完成');
        navigate('/AllTasks');
    }


    async function handleDelete() {
        const confirmDelete = confirm('確定要刪除嗎？');
        if (!confirmDelete) return;

        await fetch(`http://localhost:3000/api/todos/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        alert('已刪除事項');
        navigate('/AllTasks');
    }

    async function handleSave() {
        const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                title: editedTask.title,
                description: editedTask.description,
                due_date: editedTask.due_date,
            }),
        });

        if (response.ok) {
            alert('已儲存變更');
            const updatedTask = await response.json();
            setTask(updatedTask);
            setIsEditing(false);
        } else {
            alert('儲存失敗');
        }
    }

    if (!task) return <p>載入中...</p>;

     return (
        <div className={styles.detail_container}>
            <div className={styles.detail_card} style={{ backgroundColor: getColorByEnum(task.color) }}>
                {isEditing ? (
                    <>
                        <input
                            className={styles.input}
                            value={editedTask.title}
                            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                        />
                        <textarea
                            className={styles.textarea}
                            value={editedTask.description}
                            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                        />
                        <input
                            type="datetime-local"
                            className={styles.input}
                            value={editedTask.due_date?.slice(0, 16)}
                            onChange={(e) => setEditedTask({ ...editedTask, due_date: e.target.value })}
                        />
                    </>
                ) : (
                    <>
                        <h1>{task.title}</h1>
                        <p className={styles.description}><strong>內容：</strong>{task.description}</p>
                        <p><strong>截止日期：</strong>{new Date(task.due_date).toLocaleString()}</p>
                        <p><strong>狀態：</strong>{Number(task.is_completed) === 1 ? '✅ 已完成' : '❌ 未完成'}</p>
                    </>
                )}

                <div className={styles.button_group}>
                    {!isEditing ? (
                        <>
                            <button className={styles.complete_btn} onClick={handleComplete}>標記為完成</button>
                            <button className={styles.incomplete_btn} onClick={handleIncomplete}>標記為未完成</button>
                            <button className={styles.delete_btn} onClick={handleDelete}>刪除事項</button>
                            <button className={styles.edit_btn} onClick={() => setIsEditing(true)}>編輯</button>
                        </>
                    ) : (
                        <>
                            <button className={styles.save_btn} onClick={handleSave}>儲存</button>
                            <button className={styles.cancel_btn} onClick={() => setIsEditing(false)}>取消</button>
                        </>
                    )}
                </div>

                {!isEditing && (
                    <p className={styles.created_at}><strong>建立日期：</strong>{new Date(task.created_at).toLocaleString()}</p>
                )}
            </div>
        </div>
    );
}

export default TaskDetail;
