import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './comment.css'
import {
MDBContainer,
MDBRow,
MDBCol,
MDBCard,
MDBCardHeader,
MDBCardBody,
MDBIcon,
MDBTextArea,
} from 'mdb-react-ui-kit';
import axios from 'axios';

const Comment = () => {
  const {mentorusername,projectId} = useParams();
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  const fetchComment = async () => {
    try {
    const response = await axios.get('http://localhost:5000/comment',{
      params: {
        projectId: projectId,
        mentorusername: mentorusername,
      },
    });

    if (response.status === 200) {
      setComments(response.data.data);
      } else {
        console.error('Failed to fetch student data');
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  useEffect(() => {
    // Fetch project details based on mentorusername and projectId

    fetchComment();
  }, [mentorusername, projectId]);// Empty dependency array ensures the effect runs only once on mount

const handleCommentChange = (e) => {
  setCommentText(e.target.value);
};

const handleSendComment =  async () => {
  try {
    const response = await axios.post('http://localhost:5000/comment', {
      Text: commentText ,
    }, {
      params: {
        projectId: projectId,
        mentorusername: mentorusername,
        
      },
    });

    if (response.status === 201) {
      // Refresh the project details after adding a new student
      fetchComment();
      setCommentText('');
      
    } else {
      console.error('Failed to add student:', response.data.message);
    }
  } catch (error) {
    console.error('Error adding student:', error);
  }
  //console.log('Comments:', comments); 
};

return (
  <section id="Comment" className="comments">
    <MDBContainer className="py-5" >
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="20" lg="20" xl="20">
          <MDBCard id="chat1" style={{ borderRadius: "15px" }}>
            <MDBCardHeader
              className="d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
              style={{
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
              }}
            >
              <MDBIcon fas icon="angle-left" />
              <p className="mb-0 fw-bold">Comment</p>
              <MDBIcon fas icon="times" />
            </MDBCardHeader>

            <MDBCardBody>
                {comments.map((comment, index) => (
                  <div key={index} className="mb-4">
                    <p className="small mb-0">{comment.Text}</p>
                    <p className="small text-muted">Comment by: {comment.commenter_name}</p>
            
                </div>
              ))}

              <MDBTextArea
                className="form-outline"
                label="Type your message"
                id="textAreaExample"
                rows={4}
                value={commentText}
                onChange={handleCommentChange}
              />
              <button className="btn btn-primary mt-3" onClick={handleSendComment}>
                Send
              </button>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </section>
);
};

export default Comment;
