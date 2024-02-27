import React from 'react';

const Sidebar = ({ setActivePage, handleMentorAction, handleStudentAction }) => {
  return (
    <div style={{ width: '200px', height: '100vh', backgroundColor: '#f0f0f0', padding: '20px' }}>
      <div onClick={() => setActivePage('mentor')} style={{ cursor: 'pointer' }}>
        Mentor
      </div>
      <div>
        <select onChange={(e) => handleMentorAction(e.target.value)}>
          <option value="view-details">View Details</option>
          <option value="view-with-projects">View with Projects</option>
          {/* Add more actions for Mentor here */}
        </select>
      </div>
      <div onClick={() => setActivePage('student')} style={{ cursor: 'pointer' }}>
        Student
      </div>
      <div>
        <select onChange={(e) => handleStudentAction(e.target.value)}>
          <option value="view-details">View Details</option>
          {/* Add more actions for Student here */}
        </select>
      </div>
      <div onClick={() => setActivePage('department')} style={{ cursor: 'pointer' }}>
        Department
      </div>
    </div>
  );
};

export default Sidebar;
