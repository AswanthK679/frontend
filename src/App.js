import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginSignup from './components/LoginSignup/LoginSignup';
import Admin from './components/AdminDash/adminpage';
import Mentor from './components/MentorDash/mentorpage.jsx';
import Home from './components/project/home.jsx';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './components/project/navbar.js';
function HomeWithNavbar() {
  return (
    <div>
      <Navbar />
      <Home />
    </div>
  );
}
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/LoginSignup" element={<LoginSignup />} />
      <Route path="/admin" element={<Admin />}/>
      <Route path="/mentor/:username" element={<Mentor />}/>
      <Route path="/project/:mentorusername/:projectId"  element={<HomeWithNavbar />} />
      {/* If you want to redirect from "/" to "/login" */}
      <Route path="/" element={<Navigate to="/LoginSignup" />} />
    </Routes>
  </Router>
  );
}

export default App;
