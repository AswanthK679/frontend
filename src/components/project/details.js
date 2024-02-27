import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './details.css'
import axios from 'axios';



const Details = () => {
  //const { mentorusername, projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);


  const {mentorusername,projectId} = useParams();

  useEffect(() => {
    // Fetch project details based on mentorusername and projectId
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

    fetchProjectDetails();
  }, [mentorusername, projectId]);

  if (!projectDetails) {
    return <div>Loading...</div>;
  }

  return (
    <section id="Details" className="details">
      {projectDetails.map((project) => (
        <div className="details_section" key={project.ProjectID}>
          <div className='heading'>
            <h1>{project.Project_Name}</h1>
            <div className='objective'>
              <p>{project.Project_Objective}</p>
            </div>
          </div>
          <div className="boxes">
            <div className="box">
              <h1 className='desc_txt'>Description:</h1>
              <p>{project.Project_Description}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Details