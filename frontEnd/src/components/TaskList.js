import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios'
import { Link } from 'react-router-dom'


const TaskList = () => {
  const auth = localStorage.getItem("user");
  const userId = JSON.parse(auth)._id;
  const [lists, setLists] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    // Fetch all lists for the user on component mount
    fetchLists();
  }, []);

  console.log(lists)

  const fetchLists = async () => {
    try {
      const response = await axios.get(`/api/task/lists/all/${userId}`);
      setLists(response.data);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };


  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const sourceListId = result.source.droppableId;
    const destinationListId = result.destination.droppableId;
    const taskId = result.draggableId;

    try {
      // Replace 'your-backend-url' with the actual URL for moving a task
      await axios.put(`/api/lists/move-task/${taskId}`, {
        sourceListId,
        destinationListId,
      });

      // Refresh the lists after updating the task's list
      const response = await axios.get(`/api/lists/all/${userId}`);
      setLists(response.data);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const markTaskCompleted = async (listId, taskId) => {
    try {
      // Replace 'your-backend-url' with the actual URL for marking a task as completed
      console.log(listId, taskId)
      setIsCompleted(true)
      const data = await axios.put(`/api/task/update/${listId}/${taskId}`, {
        isCompleted: isCompleted
      });

      // Remove the completed task from the lists
      console.log(data)
      fetchLists();
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
  };


  return (
    <div class='list-body'>
      {/* <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', overflowX: 'auto' }}>
          {lists?.map((list) => (
            <Droppable key={list._id} droppableId={list._id}>
              {(provided) => (
                <div
                  className="list-container"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    border: '1px solid gray',
                    margin: '8px',
                    padding: '8px',
                  }}
                >
                  <h3>{list.title}</h3>
                  {list.tasks.map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          className="task-container"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            border: '1px solid lightgray',
                            margin: '8px',
                            padding: '8px',
                            borderRadius: '4px',
                            textDecoration: task.isCompleted ? 'line-through' : 'none',
                          }}
                        >
                          {task.taskTitle}
                          {!task.isCompleted && (
                            <button
                              className="complete-btn"
                              onClick={() => markTaskCompleted(task._id)}
                            >
                              Complete
                            </button>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext> */}
      {
        lists.map((list) => {
          return (
            <div class="list-component">
              <div className='list-header'>
                <h1 style={{ fontSize: 20, fontWeight: 600, marginRight: '10px' }}>{list.title}</h1>
                <Link className="add-button" to={`/create-task/${list._id}`}>Add Task</Link>
              </div>
              <div className='tasks'>
                {
                  list.tasks.map((task) =>
                    task.isCompleted !== true ? (
                      <div class='task-detail' key={task._id}>
                        <input type="checkbox" id="isCompleted" onChange={() => markTaskCompleted(list._id, task._id)} />
                        <p>{task.taskTitle}</p>
                      </div>
                    ) : (
                      <div key={task._id}></div>
                    )
                  )
                }

              </div>
            </div>
          )

        })
      }


      <div className="create-list">
        <h2>Create a New List</h2>
        <Link className='create-list-button' to={`/add-list`}>Create List</Link>
      </div>
    </div>
  );
};




export default TaskList;