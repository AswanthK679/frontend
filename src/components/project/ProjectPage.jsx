import { useParams } from 'react-router-dom';

const ProjectPage = () => {
  const { projectId } = useParams();
  console.log('Project ID:', projectId); 

  // Now you can use projectId to fetch and display project details

  return (
    <div>
      <h2>Project Details for Project ID: {projectId}</h2>
      {/* Add more details as needed */}
    </div>
  );
};

export default ProjectPage;