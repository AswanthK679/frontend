  import { useParams } from 'react-router-dom';
  import React, { useEffect, useState } from 'react';
  import './task.css'
  import axios from 'axios';

    const Tasks = () => {
    const {mentorusername,projectId} = useParams();
    const [totask, setTask] = useState([]);
    const [projectProgress, setProjectProgress] = useState(0);
    const [linktask, setLinkTask] = useState('');
    
    useEffect(() => {
      // Fetch initial tasks from the Python backend when the component mounts
      fetchTasksFromBackend();
      //fetchProjectProgress();
    }, [mentorusername,projectId]);

    const fetchTasksFromBackend = async () => {
      try {
        const response = await axios.get('http://localhost:5000/task',{
        
          params: {
            projectId: projectId,
            mentorusername: mentorusername,
          },
        });
    
        if (response.status === 200) {
          const tasksWithStatus = response.data.data.map(task => ({ ...task, completed: task.Status === 1 }));
        setTask(tasksWithStatus);
        setLinkTask(tasksWithStatus[0].Link)
        console.log(linktask);
          //setTask(response.data.data);
          fetchProjectProgress();
          } else {
            console.error('Failed to fetch student data');
          }
        } catch (error) {
          console.error('Error fetching student data:', error);
        }
    };

    const handleSubmit = async (event) => {

      event.preventDefault();
      const task = event.target.task.value;


      if (!task) {
        alert("Please provide a valid task")
        return
      }
      try {
        const response = await axios.post(`http://localhost:5000/task?projectId=${projectId}&mentorusername=${mentorusername}`,{
         
        Description: task,
        Status:"0",
      
          
        });
    

        if (response.status === 201) {
          // If the task is successfully deleted on the backend, update the state in the frontend
          fetchTasksFromBackend();
        } else {
          console.error('Failed to insert task');
        }
      } catch (error) {
        console.error('Error inserting task:', error);
      }
      //setTask([...totask, {task, completed: false }])
      event.target.reset()

    }


    //function changeTaskStatus(index){
    //  let newTotask = [...totask]
   //   newTotask[index].completed = !newTotask[index].completed
    //  setTask(newTotask)
   // }

  // function deleteTask(index) {
    // let newTotask = [...totask]
      //newTotask.splice(index, 1)
      //setTask(newTotask)
    //}

    const changeTaskStatus = async (index, task_id) => {
      try {
        const updatedStatus = totask[index].completed ? "0" : "1"; 
    
        const response = await axios.put(`http://localhost:5000/task?projectId=${projectId}&mentorusername=${mentorusername}`, {
          
            TaskID: task_id,
            Status: updatedStatus,
        });
    
        if (response.status === 201) {
          // If the task status is successfully updated on the backend, update the state in the frontend
          let newTotask = [...totask];
          newTotask[index].completed = !newTotask[index].completed;
          setTask(newTotask);
          fetchProjectProgress();
        } else {
          console.error('Failed to update task status');
        }
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    }

    const deleteTask = async (index, task_id) => {
      try {
        const response = await axios.delete(`http://localhost:5000/task?projectId=${projectId}&mentorusername=${mentorusername}`,{
          headers: {
            'Content-Type': 'application/json', 
            // Set the Content-Type header
          },
          data: {
            TaskID: task_id,
          },
      
          
        });
    

        if (response.status === 200) {
          // If the task is successfully deleted on the backend, update the state in the frontend
          let newTotask = [...totask]
          newTotask.splice(index, 1)
          setTask(newTotask)
          fetchProjectProgress()
        } else {
          console.error('Failed to delete task');
        }
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }

    const fetchProjectProgress = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/progressbar?projectId=${projectId}&mentorusername=${mentorusername}`);
  
        if (response.status === 200) {
          setProjectProgress(response.data.data);
          
          console.log(projectProgress)
        } else {
          console.error('Failed to fetch project progress');
        }
      } catch (error) {
        console.error('Error fetching project progress:', error);
      }
    }
    const openLinkInNewWindow = () => {
      // Check if there's a valid link before opening a new window
      if (linktask) {
        window.open(linktask, '_blank');
      } else {
        console.error('No valid link to open');
      }
    }
    
    return (
        <section id="Tasks" className="tasks">
          
          <div className='container my-5'>
            
            <div className='mx-auto rounded border p-4' style={{ width: "600px", backgroundColor: "#8272b2" }}>
            <div className="progress" role="progressbar" aria-label="Project Progress" aria-valuenow={projectProgress} aria-valuemin="0" aria-valuemax="100">
        <div className="progress-bar bg-success" style={{ width: `${projectProgress}%` }}>{projectProgress}%</div>
</div>
              <h1 className='text-white text-center mb-5'>Tasks</h1>

              <form class="d-flex" onSubmit={handleSubmit}>
                <input class="form-control me-2" placeholder="New Task" name='task' />
                <button class="btn btn-outline-light" type="submit">Add</button>
              </form>


              {
              totask.map((totask, index) => {
                return (
                  <div key={index} className='rounded mt-4 pt-2 d-flex' style={{ backgroundColor: totask.completed ? "#87FC68" : "LightGray" }}>
                    <div className='me-auto'>
                      {totask.Description}
                    </div>
                    <div className="ms-auto"> {/* Using "ms-auto" to move the icons to the right */}
                      <i className={"h5 me-2 bi " + (totask.completed ? "bi-check-square" : "bi-square")}
                      style={{ cursor: "pointer"}} onClick={() => changeTaskStatus(index,totask.ID)}></i>
                      <i className="bi bi-trash text-danger h5"
                      style={{ cursor: "pointer"}} onClick={() => deleteTask(index,totask.ID)}></i>
                    </div>
                  </div>
                  
                )
              })
            }







          </div>
          <button className="btn btn-outline-light" onClick={openLinkInNewWindow}>
          View Uploads
        </button>
        </div>

        


      </section>
    );
  }

  export default Tasks