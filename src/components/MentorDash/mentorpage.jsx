import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MentorPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const Sidebar = ({ setActivePage }) => {
  document.title = 'Mentor';


    return (
      <div className="sidebar" >
        <img src="./IMG_20240220_122110.jpg" alt="" className='image-container' />
        <a onClick={() => setActivePage('profile')} style={{ cursor: 'pointer' }}>
          Profile
        </a>
        <a onClick={() => setActivePage('project')} style={{ cursor: 'pointer' }}>
          Projects
        </a>
        <a onClick={handleLogout}>Logout</a>
      </div>
    );
  };
  
const ProjectPage = () => {
  const { username } = useParams();
  const [errorAlert, setErrorAlert] = useState(null);
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [students, setStudents] = useState('');
  const [activeOption, setActiveOption] = useState('myprojects'); // Default active option

  useEffect(() => {
    // Fetch mentors data on component mount
    if (projects.length === 0) {
    fetchProjects();}
  }, [activeOption,projects]);

  const fetchProjects = () => {
    // Fetch mentors data based on the active option
    let apiUrl = '';

    switch (activeOption) {
      case 'myprojects':
        apiUrl = 'http://localhost:5000/project';
        break;
        
      default:
        break;
    }

    axios.get(apiUrl)
      .then(response => {
        if (response.data.role_id === 2) {
          setProjects(response.data.data);
        }
        else{
          setErrorAlert(response.data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching Projects:', error);
        setErrorAlert('Error fetching Projects.'); 
      });
  };
  const handleDeleteClick = (projectId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (confirmDelete) {
      // Call the delete_project API endpoint with the projectId
      const formData = new FormData();
    formData.append('ProjectID', projectId);

    // Call the delete_project API endpoint with the formData
    axios.request({
      method: 'delete',
      url: 'http://localhost:5000/project',
      data: formData,
    })
        .then(response => {
          if (response.data.role_id === 2) {
            // Assuming response.data.data contains the updated list of projects
            setProjects(response.data.data);
            fetchProjects();
          } else {
            setErrorAlert(response.data.message);
          }
        })
        .catch(error => {
          console.error('Error deleting project:', error);
          setErrorAlert('Error deleting project.');
        });
    }
  };
  
  const renderProjectDetails = () => {
    return (
      <div className="card-container">
          {Array.isArray(projects) && projects.map(project => (
        <div key={project.Project_Name} className="card" style={{ width: '18rem' }}>
          <div className="card-body">
            <h5 className="card-title">{project.Project_Name}</h5>
            {/* Add more fields as needed */}
           {/* <a href={project.Link} className="btn btn-primary">
              Go to Repository
          </a>*/}
          <Link to={`/project/${username}/${project.ProjectID}`}  style={{
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: '#007bff',
    padding: '3px 5px', // Adjust padding to reduce the size
    borderRadius: '5px',
    display: 'inline-block',
    textAlign: 'center',
    fontSize: '14px',
    height: '30px', // Adjust height as needed
    width: '80px',
    marginTop:'15px' // Adjust font-size to reduce the text size
  }}>
              View
            </Link>
            <a onClick={() => handleDeleteClick(project.ProjectID)}> <FontAwesomeIcon icon={faTrash} style={{ fontSize: '20px', color: 'red',  marginLeft: '230px',cursor:'pointer' }} /></a>
            
          </div>
        </div>
      ))}
          {errorAlert && (
      <div className="alert alert-danger" role="alert">
        {errorAlert}
      </div>
    )}
        </div>
      );
  };
  const handleAddProject = async () => {
    try {
      const response = await axios.post('http://localhost:5000/project', {
        Name: name,
        Students: students.split(','), // Assuming students are comma-separated
      });

      // Handle the success response as needed
      console.log(response.data);
    } catch (error) {
      // Handle the error response
      setErrorAlert(error.response.data.message);
    }
  };

  const renderAddProjectForm = () => (
    <div className='myFormContainer'>

        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Project Name:' />

      <br />

        
        <input type="text" value={students} onChange={(e) => setStudents(e.target.value)}  placeholder='Student ID (comma-separated):'/>

      <br />
      <button onClick={handleAddProject}>Add Project</button>
    </div>
  );

  return (
    <div className='mentor-container'>
    <h1 className="page-title">My Projects</h1>
    <div className="options-container">
    <ul class="nav nav-underline">
    <li class="nav-item">
  <a className= {`nav-link ${activeOption === 'myprojects' ? 'active' : ''}`} href="#mentor-myprojects" onClick={() => setActiveOption('myprojects')}>My Projects</a>
</li>
<li class="nav-item">
  <a className= {`nav-link ${activeOption === 'addprojects' ? 'active' : ''}`} href="#mentor-addprojects" onClick={() => setActiveOption('addprojects')}>Add Projects</a>
</li>
   </ul>
   
 </div>

      {activeOption === 'myprojects' && renderProjectDetails ()}
      {activeOption === 'addprojects' &&  renderAddProjectForm()}
    </div>
  );
};


const MentorProfile = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [availableSpecializations, setAvailableSpecializations] = useState([]);
  const [selectedSpecId, setSelectedSpecId] = useState('');
  const [errorAlert, setErrorAlert] = useState(null);
  const [okAlert, setOkAlert] = useState(null);
  const [mentorDetails, setMentorDetails] = useState([]);
  const [activeOption, setActiveOption] = useState('details'); // Default active option

  const [formData, setFormData] = useState({
    FName: '',
    LName: '',
    Email: '',
    Phone: '',
  });

  const fetchProfile = () => {
   

    axios.get('http://localhost:5000/details')
      .then(response => {
        if (response.data.role_id === 2) {

          setMentorDetails(response.data.data[0]);
        } else {
          setErrorAlert(response.data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching profile details:', error);

      });
  };

  useEffect(() => {
    fetchProfile();
    fetchAvailableSpecializations();
  }, [activeOption]);

  const renderDetails = () => (
    <div className="mentor-details-wrapper">
    <div className="mentor-details-container">
      <h2>Mentor Details</h2>
      <table>
      <tbody>
        <tr>
          <td>ID :</td>
          <td>{mentorDetails.ID}</td>
        </tr>
        <tr>
          <td>Name :</td>
          <td>{mentorDetails.MENTOR_NAME}</td>
        </tr>
        <tr>
          <td>Email :</td>
          <td>{mentorDetails.MENTOR_EMAIL}</td>
        </tr>
        <tr>
          <td>Phone :</td>
          <td>{mentorDetails.MENTOR_PHONE}</td>
        </tr>
        <tr>
          <td>Department :</td>
          <td>{mentorDetails.DEPARTMENT_NAME}</td>
        </tr>
      </tbody>
    </table>
      </div>
      <div className="mentor-details-container">
      <h3>Specializations</h3>
      <div className="specializations">
      
        {mentorDetails.SPECIALIZATION_NAMES && mentorDetails.SPECIALIZATION_NAMES.split(',').map((specialization) => (
          <div key={specialization.trim()} className="specialization">
          {specialization.trim()}
        </div>
        ))}
  
      </div>
    </div>
    </div>
  );
  
    const updateDetails = async () => {
      try {
        // Validate email and phone here before sending the request
        const nonEmptyFormData = Object.fromEntries(
          Object.entries(formData).filter(([_, value]) => value.trim() !== '')
        );
  
        const response = await axios.put('http://localhost:5000/details', JSON.stringify(nonEmptyFormData), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
        const result = await response.json();
  
        // Handle the response, update state, show messages, etc.
      } catch (error) {
        console.error('Error updating mentor details:', error);
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      
  
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value.trim(), // Update value without checking if empty
      }));
    };
  
    const renderUpdateDetails = () => (
      
      <div className='myFormContainer'>
        <h3>Update Profile</h3>
        <input type="text" name="FName" value={formData.FName} onChange={handleChange} placeholder='First Name'/>
        <input type="text" name="LName" value={formData.LName} onChange={handleChange} placeholder='Last Name'/>
        <input type="email" name="Email" value={formData.Email} onChange={handleChange} placeholder='Email Address' />
        <input type="text" name="Phone" value={formData.Phone} onChange={handleChange} placeholder='Phone Number'/>
        <button onClick={updateDetails}>Update Details</button>
        <br/>
        <hr></hr>
        <br/>
        <h3>Add Specializations </h3>
          <select value={selectedSpecId} onChange={(e) => setSelectedSpecId(e.target.value)}>
            <option value=""disabled>Select Specialization</option>
            {availableSpecializations.map((spec) => (
              <option key={spec.ID} value={spec.ID}>
                {spec.Name}
              </option>
            ))}
          </select>
       
        <button onClick={handleAddSpecialization}>Add Specialization</button>
        <br/>
        <hr></hr>
        <br/>
        <h3>Add  New Specializations </h3>
        <form onSubmit={handleSubmit}>
        
       
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} placeholder='Add new  Specialization here'
          />
        
        <button type="submit">Add Specialization</button>
      </form>

      </div>
    );
 
    const fetchAvailableSpecializations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/specialization');
    
        if (response.status !== 200) {
          // Handle non-successful response status (e.g., show an error message)
          console.error('Error fetching specializations:', response.data.message);
          return;
        }
    
        // Assuming the response data is an array of specializations
        const specializations = response.data.data;
    
        // Now you can use the retrieved specializations as needed
        console.log('Available Specializations:', specializations);
    
        // Update your component state or perform other actions based on the fetched data
        setAvailableSpecializations(specializations);
    
      } catch (error) {
        // Handle errors that occurred during the request
        console.error('Error fetching specializations:', error.message);
      }
    };  

    const handleAddSpecialization = async () => {
      try {
        const response = await axios.post('http://localhost:5000/specializationadd', {
         // Assuming you are using POST for adding specialization
          headers: {
            'Content-Type': 'application/json',
          },
          ID: selectedSpecId,
        });
  
        if (response.data.status_code!== 200) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
  
        // Reset selected specialization and fetch available specializations again
        setSelectedSpecId('');
        setErrorAlert('');
        fetchAvailableSpecializations();
        // Handle success, e.g., show a success message
      } catch (error) {
        setErrorAlert(error.message);
      }
    };
 const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Make API request to add specialization to mentor
        const response = await axios.post(
          'http://localhost:5000/specialization',
          { Name: name },
          {
            headers: {
              'Content-Type': 'application/json',
              // Add any other necessary headers
            },
          }
        );
  
        // Check if the request was successful
        if (response.data.status_code === 201) {
          setSuccess(true);
          setError(null);
        } else {
          setSuccess(false);
          setError('Error adding specialization. Please try again.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
        setSuccess(false);
        setError('Internal Server Error. Please try again later.');
      }
    };

  return (
    <div className='mentor-container'>
      <h1 className="page-title">Details</h1>
      <div className="options-container">
        <ul className="nav nav-underline">
          <li className="nav-item">
            <a className={`nav-link ${activeOption === 'details' ? 'active' : ''}`} href="#mentor-details" onClick={() => setActiveOption('details')}>Details</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${activeOption === 'update' ? 'active' : ''}`} href="#mentor-detailsupadte" onClick={() => setActiveOption('update')}>Update</a>
          </li>
        </ul>
      </div>

      {activeOption === 'details' && renderDetails()}
      {activeOption === 'update' && renderUpdateDetails()}
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
    const [activePage, setActivePage] = useState('profile');
  
    return (
      <div style={{ display: 'flex' }}>
        <Sidebar setActivePage={setActivePage} />
        <div style={{ flex: 1, padding: '20px' }}>
          {activePage === 'project' && <ProjectPage/>}
          {activePage === 'profile' && <MentorProfile />}
          
          
        </div>
      </div>
    );
  };
  
  export default App;
