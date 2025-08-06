import styles from './AllTasks.module.css'

function AllTasks() {

    const tasks = [
        {
            id: 1,
            user_id: 1,
            title: '買牛奶',
            color: '#13E0F2',
            description: '記得買低脂牛奶',
            is_completed: 0,
            created_at: '2025-08-06T10:00:00Z',
            updated_at: null,
            due_date: '2025-08-07T18:00:00Z'
        },
        {
            id: 2,
            user_id: 2,
            title: '完成報告',
            color: '#13F2B8',
            description: '週會前要完成簡報',
            is_completed: 1,
            created_at: '2025-08-06T11:30:00Z',
            updated_at: null,
            due_date: '2025-08-06T12:00:00Z'
        },
        {
            id: 2,
            user_id: 2,
            title: '完成報告',
            color: '#F2C664',
            description: '週會前要完成簡報',
            is_completed: 1,
            created_at: '2025-08-06T11:30:00Z',
            updated_at: null,
            due_date: '2025-08-06T12:00:00Z'
        },
        {
            id: 2,
            user_id: 2,
            title: '完成報告',
            color: '#64F283',
            description: '週會前要完成簡報',
            is_completed: 1,
            created_at: '2025-08-06T11:30:00Z',
            updated_at: null,
            due_date: '2025-08-06T12:00:00Z'
        },
        {
            id: 2,
            user_id: 2,
            title: '完成報告',
            color: '#F26485',
            description: '週會前要完成簡報',
            is_completed: 1,
            created_at: '2025-08-06T11:30:00Z',
            updated_at: null,
            due_date: '2025-08-06T12:00:00Z'
        }
    ];

    return (
        <div className='AllTasks'>
            <h1 className={styles.AllTasks_title}>所有事項</h1>
            <div className={`${styles.stick} row g-3`}>
            {tasks.map((task, index) => (
                <div className='col-lg-3 col-md-6 col-sm-12' key={index}>
                    <div className={styles.single_stick} style={{backgroundColor:`${task.color}`}}>
                        <h3 className={styles.stick_title}>{task.title}</h3>
                        <p className={styles.stick_subtitle}>截止日期：{task.due_date}</p>
                        <p className={styles.card_content}>{task.description}</p>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default AllTasks;