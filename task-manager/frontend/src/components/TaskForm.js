import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('General');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        addTask(title, category);
        setTitle('');
        setCategory('General');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="New task"
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>General</option>
                <option>Work</option>
                <option>Personal</option>
                <option>Urgent</option>
            </select>
            <button type="submit">Add</button>
        </form>
    );
};

export default TaskForm;
