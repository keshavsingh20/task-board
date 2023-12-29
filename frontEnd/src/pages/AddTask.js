import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddTask = () => {
    const [taskTitle, setTaskTile] = useState("");
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const params = useParams()

    const handleAddTask = async () => {

        if (!taskTitle) {
            setError(true)
            return false
        }

        const userId = JSON.parse(localStorage.getItem("user"))._id;
        const listId = params.listId;
        // console.log(userId)
        let result = await fetch(`/api/task/${listId}/create-task`, {
            method: 'POST',
            body: JSON.stringify({taskTitle }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        result = await result.json();
        // console.log(result)
        alert("Task Added Successfully..!")
        navigate('/')
    }

    return (
        <div className='add-task'>
            <h1>Add Task</h1>
            <input type="text" placeholder='Enter Task here...' className='input-box' onChange={(e) => setTaskTile(e.target.value)} value={taskTitle} />
            {error && !taskTitle && <span className='validation-error'>Enter valid name</span>}
            <button type='button' className='app-button' onClick={handleAddTask}>Add Task</button>
        </div>
    )
}

export default AddTask;