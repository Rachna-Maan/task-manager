import React from 'react';

const TaskItem = ({ task, toggleTask, deleteTask }) => {
    return (
        <li className="task-card">
            <span
                onClick={() => toggleTask(task._id, task.completed)}
                className={task.completed ? 'completed' : ''}
            >
                {task.title}
            </span>
            <span className="badge">{task.category || 'General'}</span>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
        </li>
    );
};

export default TaskItem;
