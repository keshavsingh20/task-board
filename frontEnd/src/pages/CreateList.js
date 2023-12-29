import React, { useState } from 'react';
import { useNavigate, } from 'react-router-dom';

const CreateList = () => {
    const [title, setTile] = useState("");
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const handleAddList = async () => {

        if (!title) {
            setError(true)
            return false
        }

        const userId = JSON.parse(localStorage.getItem("user"))._id;
        // console.log(userId)
        let result = await fetch(`/api/task/${userId}/create-list`, {
            method: 'POST',
            body: JSON.stringify({title }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        result = await result.json();
        // console.log(result)
        alert("List Added Successfully..!")
        navigate('/')
    }

    return (
        <div className='add-task'>
            <h1>Add List</h1>
            <input type="text" placeholder='Enter List here...' className='input-box' onChange={(e) => setTile(e.target.value)} value={title} />
            {error && !title && <span className='validation-error'>Enter valid name</span>}
            <button type='button' className='app-button' onClick={handleAddList}>Add List</button>
        </div>
    )
}

export default CreateList;