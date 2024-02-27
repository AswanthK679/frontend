import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TopBar.css';
const Sidebar = ({ setActivePage }) => {
  document.title = 'Admin';


    return (
      <div className="sidebar" >
        <img src="./IMG_20240220_122110.jpg" alt="" className='image-container' />
        <a onClick={() => setActivePage('mentor')} style={{ cursor: 'pointer' }}>
          Mentor
        </a>
        <a onClick={() => setActivePage('student')} style={{ cursor: 'pointer' }}>
          Student
        </a>
        <a onClick={() => setActivePage('department')} style={{ cursor: 'pointer' }}>
          Department
        </a>
        <a onClick={handleLogout}>Logout</a>
      </div>
    );
  };
  
const MentorPage = () => {
  const [errorAlert, setErrorAlert] = useState(null);
  
  const [mentors, setMentors] = useState([]);
  const [activeOption, setActiveOption] = useState('details'); // Default active option

  useEffect(() => {
    // Fetch mentors data on component mount
    fetchMentors();
  }, [activeOption]);

  const fetchMentors = () => {
    // Fetch mentors data based on the active option
    let apiUrl = '';

    switch (activeOption) {
      case 'details':
        apiUrl = 'http://localhost:5000/signin/view/mentor';
        break;
        case 'withoutProjects':
        apiUrl = 'http://localhost:5000/signin/view/mentor/withoutproject';
        break;
      case 'withProjects':
        apiUrl = 'http://localhost:5000/signin/view/mentor/withproject';
        
      
        break;
      default:
        break;
    }

    axios.get(apiUrl)
      .then(response => {
        if (response.data.role_id === 1) {
        
          setMentors(response.data.data);
        }
        else{
          setErrorAlert(response.data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching mentors:', error);
        setErrorAlert('Error fetching mentors.'); // Move this line inside the catch block
      });
  };

  const renderMentorDetails = () => {
    // Render mentor details
    return (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Username</th>
                <th scope="col">Department</th>
                <th scope="col">Specializations</th>
              </tr>
            </thead>
            <tbody>
              {mentors.map(mentor => (
                <tr key={mentor.MentorID}>
                  <td>{mentor.MentorID || '-'}</td>
                <td>{mentor.MentorName || '-'}</td>
                <td>{mentor.MentorEmail || '-'}</td>
                <td>{mentor.MentorPhone || '-'}</td>
                <td>{mentor.UserName || '-'}</td>
                <td>{mentor.DepartmentName || '-'}</td>
                <td>{mentor.Specializations || '-'}</td>
                </tr>
                
              ))}
            </tbody>
          </table>
          {errorAlert && (
      <div className="alert alert-danger" role="alert">
        {errorAlert}
      </div>
    )}
        </div>
      );
  };

  const renderMentorsWithProjects = () => {
    // Render mentors based on the fetched data
    return (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Username</th>
                <th scope="col">Department</th>
                <th scope="col"> ProjectName</th>
              </tr>
            </thead>
            <tbody>
              {mentors.map(mentor => (
                <tr key={mentor.MentorID}>
                  <td>{mentor.MentorID || '-'}</td>
                <td>{mentor.MentorName || '-'}</td>
                <td>{mentor.MentorEmail || '-'}</td>
                <td>{mentor.MentorPhone || '-'}</td>
                <td>{mentor.UserName || '-'}</td>
                <td>{mentor.DepartmentName || '-'}</td>
                <td>{mentor.ProjectName || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {errorAlert && (
      <div className="alert alert-danger" role="alert">
        {errorAlert}
      </div>
    )}
        </div>
      );
  };

  const renderMentorsWithoutProjects = () => {

        // Render mentors based on the fetched data
        return (
            <div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Username</th>
                    <th scope="col">Department</th>
                  </tr>
                </thead>
                <tbody>
                  {mentors.map(mentor => (
                    <tr key={mentor.MentorID}>
                       <td>{mentor.MentorID || '-'}</td>
                <td>{mentor.MentorName || '-'}</td>
                <td>{mentor.MentorEmail || '-'}</td>
                <td>{mentor.MentorPhone || '-'}</td>
                <td>{mentor.UserName || '-'}</td>
                <td>{mentor.DepartmentName || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {errorAlert && (
      <div className="alert alert-danger" role="alert">
        {errorAlert}
      </div>
    )}
        </div>
          );
  };

  
  return (
    <div className='mentor-container'>
    <h1 className="page-title">Mentors</h1>
    <div className="options-container">
    <ul class="nav nav-underline">
    <li class="nav-item">
  <a className= {`nav-link ${activeOption === 'details' ? 'active' : ''}`} href="#mentor-details" onClick={() => setActiveOption('details')}>Mentor Details</a>
</li>
<li class="nav-item">
  <a class={`nav-link ${activeOption === 'withProjects' ? 'active' : ''}`} href="#mentor-with-projects" onClick={() => setActiveOption('withProjects')}>Projects Of Mentor</a>
</li>
<li class="nav-item">
  <a class={`nav-link ${activeOption === 'withoutProjects' ? 'active' : ''}`} href="#mentor-without-projects" onClick={() => setActiveOption('withoutProjects')}>Mentors Without Projects</a>
</li>
   </ul>
 </div>

      {activeOption === 'details' && renderMentorDetails()}
      {activeOption === 'withProjects' && renderMentorsWithProjects()}
      {activeOption === 'withoutProjects' && renderMentorsWithoutProjects()}
    </div>
  );
};



const StudentPage = () => {
  const [errorAlert, setErrorAlert] = useState(null);
  const [students, setStudents] = useState([]);
  const [activeOption, setActiveOption] = useState('details'); // Default active option


  const fetchStudents = () => {
    let apiUrl = '';

    switch (activeOption) {
      case 'details':
        apiUrl = 'http://localhost:5000/signin/view/student';
        break;
        case 'withoutProjects':
        apiUrl = 'http://localhost:5000/signin/view/student/withoutproject';
        break;
      case 'withProjects':
        apiUrl = 'http://localhost:5000/signin/view/student/withproject';
        
      
        break;
      default:
        break;
    }

    axios.get(apiUrl)
      .then(response => {
        if (response.data.role_id === 1) {
        
          setStudents(response.data.data);
        }
        else{
          setErrorAlert(response.data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching students:', error);
        setErrorAlert('Error fetching students.'); // Move this line inside the catch block
      });
  };
  useEffect(() => {
    fetchStudents();
  }, [activeOption]);


  const renderStudentDetails = () => {
    // Render mentor details
    return (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Username</th>
                <th scope="col">Department</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.MentorID}>
                  <td>{student.StudentID || '-'}</td>
                <td>{student.StudentName || '-'}</td>
                <td>{student.StudentEmail || '-'}</td>
                <td>{student.StudentPhone || '-'}</td>
                <td>{student.UserName || '-'}</td>
                <td>{student.DepartmentName || '-'}</td>
                </tr>
                
              ))}
            </tbody>
          </table>
          {errorAlert && (
      <div className="alert alert-danger" role="alert">
        {errorAlert}
      </div>
    )}
        </div>
      );
  };

  const renderStudentsWithProjects = () => {
    // Render mentors based on the fetched data
    return (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Username</th>
                <th scope="col">Department</th>
                <th scope="col">ProjectName</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.MentorID}>
                  <td>{student.StudentID || '-'}</td>
                <td>{student.StudentName || '-'}</td>
                <td>{student.StudentEmail || '-'}</td>
                <td>{student.StudentPhone || '-'}</td>
                <td>{student.UserName || '-'}</td>
                <td>{student.DepartmentName || '-'}</td>
                <td>{student.ProjectName || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {errorAlert && (
      <div className="alert alert-danger" role="alert">
        {errorAlert}
      </div>
    )}
        </div>
      );
  };

  const renderStudentsWithoutProjects = () => {

        // Render mentors based on the fetched data
        return (
            <div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Username</th>
                    <th scope="col">Department</th>
                  </tr>
                </thead>
                <tbody>
                 {students.map(student => (
                <tr key={student.MentorID}>
                  <td>{student.StudentID || '-'}</td>
                <td>{student.StudentName || '-'}</td>
                <td>{student.StudentEmail || '-'}</td>
                <td>{student.StudentPhone || '-'}</td>
                <td>{student.UserName || '-'}</td>
                <td>{student.DepartmentName || '-'}</td>
                </tr>
                  ))}
                </tbody>
              </table>
              {errorAlert && (
      <div className="alert alert-danger" role="alert">
        {errorAlert}
      </div>
    )}
            </div>
          );
  };

 
  return (
    <div className='mentor-container'>
    <h1 className="page-title">Student</h1>
    <div className="options-container">
    <ul className="nav nav-underline">
    <li class="nav-item">
  <a className= {`nav-link ${activeOption === 'details' ? 'active' : ''}`} href="#students-details" onClick={() => setActiveOption('details')}>Student Details</a>
</li>
<li className="nav-item">
  <a className={`nav-link ${activeOption === 'withProjects' ? 'active' : ''}`} href="#student-with-projects" onClick={() => setActiveOption('withProjects')}>Projects Of Student</a>
</li>
<li className="nav-item">
  <a className={`nav-link ${activeOption === 'withoutProjects' ? 'active' : ''}`} href="#student-without-projects" onClick={() => setActiveOption('withoutProjects')}>Students Without Projects</a>
</li>
   </ul>
 </div>


      {activeOption === 'details' && renderStudentDetails()}
      {activeOption === 'withProjects' && renderStudentsWithProjects()}
      {activeOption === 'withoutProjects' && renderStudentsWithoutProjects()}
    </div>
  );
};




const DepartmentPage = () => {
  const [errorAlert, setErrorAlert] = useState(null);
  const [okAlert, setOkAlert] = useState(null);
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [departments, setDepartment] = useState([]);
  const [activeOption, setActiveOption] = useState('details'); // Default active option

  
  const fetchDepartments = () => {
    let apiUrl = '';

    switch (activeOption) {
      case 'details':
        apiUrl = 'http://localhost:5000/signin/view/department';
        break;
      default:
        break;
    }

    axios.get(apiUrl)
      .then(response => {
        if (response.data.role_id === 1) {
        
          setDepartment(response.data.data);
        }
        else{
          setErrorAlert(response.data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching mentors:', error);
        setErrorAlert('Error fetching departments.'); // Move this line inside the catch block
      });
  };
  useEffect(() => {
    fetchDepartments();
  }, [activeOption]);


  const renderDepartmentDetails = () => {
    // Render mentor details
    return (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Total_Mentors</th>
                <th scope="col">Total_Students</th>
                
              </tr>
            </thead>
            <tbody>
              {departments.map(department => (
                <tr key={department.ID}>
                  <td>{department.ID || '-'}</td>
                <td>{department.Name || '-'}</td>
                <td>{department.Total_Mentors || '-'}</td>
                <td>{department.Total_Students || '-'}</td>
                </tr>
                
              ))}
            </tbody>
          </table>
          {errorAlert && (
      <div className="alert alert-danger" role="alert">
        {errorAlert}
      </div>
    )}
        </div>
      );
  };

 
  const handleDepartmentAction = async (actionType) => {
    try {
      if (actionType === 'add') {
        const response = await axios.post('http://localhost:5000/signin/add/department', {
          Name: newDepartmentName,
        });

        if (response.data.statusCode === 201) {
          // Department created successfully
          fetchDepartments(); // Refresh the department list
          setNewDepartmentName(''); // Clear the input field
          alert(response.data.message);
        }
        else if(response.data.statusCode === 404)
        {
          alert('response.data.message');
        }
      } else if (actionType === 'delete') {
        // Handle delete logic here
        const response = await axios.delete(
          `http://localhost:5000/signin/delete/department`,{
            data: { Name: newDepartmentName }, // Include data in the request body
           headers: { 'Content-Type': 'application/json' },
          });
  

        if (response.data.statusCode === 200) {
          // Department deleted successfully
          fetchDepartments(); // Refresh the department list
          setNewDepartmentName(''); // Clear the input field
          alert(response.data.message);
        }
        else {
          alert(response.data.message);
        }
      }
      
    } catch (error) {
      console.error('An error occurred:', error);
      setErrorAlert('Error fetching departments');
      
    }
  };
  return (
    <div className='mentor-container'>
    <h1 className="page-title">Department</h1>
    <div className="options-container">
    <ul class="nav nav-underline">
    <li class="nav-item">
  <a className= {`nav-link ${activeOption === 'details' ? 'active' : ''}`} href="#department-details" onClick={() => setActiveOption('details')}>Department Details</a>
</li>
<li class="nav-item">
  <a class={`nav-link ${activeOption === 'department' ? 'active' : ''}`} href="#department" onClick={() => setActiveOption('department')}>Department</a>
</li>
   </ul>
 </div>


      {activeOption === 'department' && (
        <div class="input-group mb-3">
         
            
            <input
              type="text"
              value={newDepartmentName}
              onChange={(e) => setNewDepartmentName(e.target.value)}
              class="form-control" placeholder="Department Name:" aria-label="Recipient's username" />
         
          <div  class="btn-group" role="group" aria-label="Basic mixed styles example">
          <button onClick={() => handleDepartmentAction('add')}  class="btn btn-danger">Add </button>
          <button onClick={() => handleDepartmentAction('delete')}class="btn btn-success">Delete </button>
          
          </div>
          <div >
          {okAlert && (
       <div class="alert alert-success" role="alert">
        {okAlert}
      </div>
    )}

</div> 
        </div>
        
      )}


      {activeOption === 'details' && renderDepartmentDetails()}
    </div>
  );
};

 
  const handleLogout = () => {
    // Assuming your Flask server is running on localhost:5000
    const apiUrl = 'http://localhost:5000/logout';

    // Make a POST request to the logout endpoint
    axios.post(apiUrl)
      .then(response => {
        // Handle successful logout, such as redirecting to the login page
        console.log('Logout successful:', response.data);
        // Example: Redirect to login page
        window.location.href = '/LoginSignup';
      })
      .catch(error => {
        // Handle logout failure
        console.error('Logout failed:', error);
        // Example: Display an error message
        alert('Logout failed. Please try again.');
      });
  };


const App = () => {
    const [activePage, setActivePage] = useState('mentor');
  
    return (
      <div style={{ display: 'flex' }}>
        <Sidebar setActivePage={setActivePage} />
        <div style={{ flex: 1, padding: '20px' }}>
          {activePage === 'mentor' && <MentorPage />}
          {activePage === 'student' && <StudentPage />}
          {activePage === 'department' && <DepartmentPage />}
          
        </div>
      </div>
    );
  };
  
  export default App;
