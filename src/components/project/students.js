import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash ,faEnvelope,faUserPlus,faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './students.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
const Students = () => {
  const [projectDetails, setProjectDetails] = useState(null);
  const [newStudentId, setNewStudentId] = useState('');
  const [showForm, setShowForm] = useState(false);
  const {mentorusername,projectId} = useParams();
  const [students, setStudents] = useState([]);

  const fetchProjectDetails = async () => {
    try {
      console.log('Fetching project details with projectId:', projectId, 'and mentorusername:', mentorusername);
      const response = await axios.get('http://localhost:5000/project/details',{
        params: {
          projectId: projectId,
          mentorusername: mentorusername,
        },
      });       
      setProjectDetails(response.data.data);
      console.log(projectDetails);

    } catch (error) {
      console.error('Error fetching project details:', error);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/add/student', {
        StudentID: newStudentId,
      }, {
        params: {
          projectId: projectId,
          mentorusername: mentorusername,
          
        },
      });

      if (response.status === 201) {
        // Refresh the project details after adding a new student
        fetchProjectDetails();
        setNewStudentId('');
        setShowForm(false);
      } else {
        console.error('Failed to add student:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };
  const handleDeleteStudent = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        const response = await axios.delete('http://localhost:5000/delete/student', {
          params: {
            projectId: projectId,
            mentorusername: mentorusername,
          },
          data: { StudentID: studentId }, // Send data in the request body
        });

        if (response.status === 201) {
          fetchProjectDetails();
          fetchData();
        } else {
          console.error('Failed to delete student:', response.data.message);
        }
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };
  const fetchData = async () => {
    try {
    const response = await axios.get('http://localhost:5000/project/student',{
      params: {
        projectId: projectId,
        mentorusername: mentorusername,
      },
    });

    if (response.status === 200) {
        setStudents(response.data.data);
      } else {
        console.error('Failed to fetch student data');
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };
  useEffect(() => {
    // Fetch project details based on mentorusername and projectId


  
    fetchProjectDetails();
    fetchData();
  }, [mentorusername, projectId]);

  if (!projectDetails) {
    return <div>Loading...</div>;
  }

    return (
      <section id="Students" className="students">
        {students.map((student) => (
        <div key={student.Email} className="card">
          <div className="card-body">
            <h5 className="card-title">{student.Name}</h5>
            <p className="card-text">Department Name: {student.Department}</p>
            <div>
            <a onClick={() => handleDeleteStudent(student.ID)}>
            <FontAwesomeIcon icon={faTrash} style={{ fontSize: '20px', color: 'red',marginRight: '15px',cursor:'pointer'}} />
            </a>
            <a href={`mailto:${student.Email}`} >
            <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '20px', color: 'green', marginLeft: '20px' }} />
            </a>
            </div>
          </div>
        </div>
      ))}

{showForm && (
              <form onSubmit={handleAddStudent}>
                <label>
                  Add Student:
                  <input
                    type="text"
                    value={newStudentId}
                    onChange={(e) => setNewStudentId(e.target.value)}
                  />
                </label>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </form>
            )}

<div>
<a onClick={() => setShowForm(!showForm)}>
        <div>
          
          {showForm ? <FontAwesomeIcon icon={faEyeSlash} style={{ fontSize: '24px',cursor: 'pointer' }}/> :<FontAwesomeIcon icon={faUserPlus} style={{ fontSize: '25px', color: '', marginLeft: '20px' ,cursor: 'pointer'}} />}
        </div>
      </a>
    </div>
      </section>
    );
  };

export default Students