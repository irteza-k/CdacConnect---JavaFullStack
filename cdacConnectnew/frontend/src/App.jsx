import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import MentorRegistrationForm from './components/MentorRegistrationForm';
import StudentRegistrationForm from './components/StudentRegistrationForm';
import LoginForm from './components/LoginForm';
import StudentHomePage from './components/StudentHomePage';
import MentorHomePage from './components/MentorHomePage';
import ProfilePage from './components/ProfilePage';
import MeetingSchedulePage from './components/MeetingSchedulePage';
import Dashboard from './components/Dashboard';
import NotificationPage from './components/NotificationPage';
import AboutPage from './components/AboutPage';
import FAQPage from './components/FAQPage';
import ContactPage from './components/ContactPage';

function App() {
  const [activeForm, setActiveForm] = useState('login'); // 'login', 'student', 'mentor', 'student-home', 'profile', 'meeting-schedule', 'dashboard', 'notifications', 'about', 'faq', 'contact'
  const [user, setUser] = useState(null);

  // Check if user is logged in on component mount
  useEffect(() => {
    console.log('App useEffect - checking sessionStorage');
    const savedUser = sessionStorage.getItem('user');
    console.log('Saved user from sessionStorage:', savedUser);
    
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      console.log('Parsed user data:', userData);
      
      // Check if session has expired (24 hours)
      const loginTime = sessionStorage.getItem('loginTime');
      const currentTime = new Date().getTime();
      const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
      if (loginTime && (currentTime - parseInt(loginTime)) > sessionDuration) {
        // Session expired, clear sessionStorage
        console.log('Session expired, clearing sessionStorage');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('loginTime');
        setUser(null);
        setActiveForm('login');
        return;
      }
      
      setUser(userData);
      console.log('Setting user state:', userData);
      
      // If user is logged in, show appropriate home page
      if (userData.userType === 'student') {
        console.log('Setting activeForm to student-home');
        setActiveForm('student-home');
      } else if (userData.userType === 'mentor') {
        console.log('Setting activeForm to mentor-home');
        setActiveForm('mentor-home');
      }
    } else {
      console.log('No user found in sessionStorage');
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    console.log('Logout clicked');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('loginTime');
    setUser(null);
    setActiveForm('login');
  };

  // Clear all sessionStorage data (for development/testing)
  const handleClearAllData = () => {
    console.log('Clear data clicked');
    sessionStorage.clear();
    setUser(null);
    setActiveForm('login');
    alert('All data cleared!');
  };

  // Handle successful login
  const handleLoginSuccess = (userData) => {
    console.log('Login success with user data:', userData);
    setUser(userData);
    // Store login time for session management
    sessionStorage.setItem('loginTime', new Date().getTime().toString());
    if (userData.userType === 'student') {
      setActiveForm('student-home');
    } else if (userData.userType === 'mentor') {
      setActiveForm('mentor-home');
    }
  };

  // Handle navigation to registration forms
  const handleNavigateToRegistration = (userType) => {
    setActiveForm(userType);
  };

  console.log('Current user state:', user);
  console.log('Current activeForm:', activeForm);

  return (
    <div className="App">
      {/* Navigation Header */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
            <i className="bi bi-people-fill me-2"></i>
            CDAC Connect
          </a>
          
          {user ? (
            // Logged in user navigation
            <div className="navbar-nav ms-auto">
              <span className="navbar-text me-3 d-none d-md-block">
                <i className="bi bi-person-circle me-1"></i>
                Welcome, {user.name || user.email} ({user.userType})
              </span>
              
              {/* Navigation buttons for logged-in users */}
              <div className="navbar-nav me-3">
                {user.userType === 'student' && (
                  <>
                    <button
                      className={`nav-link btn btn-link ${activeForm === 'student-home' ? 'active' : ''}`}
                      onClick={() => setActiveForm('student-home')}
                    >
                      <i className="bi bi-house-fill me-1"></i>
                      <span className="d-none d-sm-inline">Home</span>
                    </button>
                    <button
                      className={`nav-link btn btn-link ${activeForm === 'notifications' ? 'active' : ''}`}
                      onClick={() => setActiveForm('notifications')}
                    >
                      <i className="bi bi-bell-fill me-1"></i>
                      <span className="d-none d-sm-inline">Notifications</span>
                    </button>
                  </>
                )}
                {user.userType === 'mentor' && (
                  <>
                    <button
                      className={`nav-link btn btn-link ${activeForm === 'mentor-home' ? 'active' : ''}`}
                      onClick={() => setActiveForm('mentor-home')}
                    >
                      <i className="bi bi-house-fill me-1"></i>
                      <span className="d-none d-sm-inline">Home</span>
                    </button>
                  </>
                )}
                <button
                  className={`nav-link btn btn-link ${activeForm === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveForm('profile')}
                >
                  <i className="bi bi-person-fill me-1"></i>
                  <span className="d-none d-sm-inline">Profile</span>
                </button>
              </div>
              
              <button
                className="btn btn-outline-light btn-sm"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-1"></i>
                <span className="d-none d-sm-inline">Logout</span>
              </button>
            </div>
          ) : (
            // Guest user navigation
            <div className="navbar-nav ms-auto">
              <button
                className={`nav-link btn btn-link ${activeForm === 'login' ? 'active' : ''}`}
                onClick={() => setActiveForm('login')}
              >
                <i className="bi bi-box-arrow-in-right me-1"></i>
                <span className="d-none d-sm-inline">Login</span>
              </button>
              <button
                className={`nav-link btn btn-link ${activeForm === 'student' ? 'active' : ''}`}
                onClick={() => setActiveForm('student')}
              >
                <i className="bi bi-mortarboard-fill me-1"></i>
                <span className="d-none d-sm-inline">Student</span>
              </button>
              <button
                className={`nav-link btn btn-link ${activeForm === 'mentor' ? 'active' : ''}`}
                onClick={() => setActiveForm('mentor')}
              >
                <i className="bi bi-person-plus-fill me-1"></i>
                <span className="d-none d-sm-inline">Mentor</span>
              </button>
            </div>
          )}
          <div className="navbar-nav ms-auto">
            <button className={`nav-link btn btn-link ${activeForm === 'about' ? 'active' : ''}`} onClick={() => setActiveForm('about')}>
              <i className="bi bi-info-circle me-1"></i>About
            </button>
            <button className={`nav-link btn btn-link ${activeForm === 'faq' ? 'active' : ''}`} onClick={() => setActiveForm('faq')}>
              <i className="bi bi-question-circle me-1"></i>FAQ
            </button>
            <button className={`nav-link btn btn-link ${activeForm === 'contact' ? 'active' : ''}`} onClick={() => setActiveForm('contact')}>
              <i className="bi bi-envelope-at me-1"></i>Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Form Content */}
      <main>
        {activeForm === 'login' && <LoginForm onLoginSuccess={handleLoginSuccess} onNavigateToRegistration={handleNavigateToRegistration} />}
        {activeForm === 'student' && <StudentRegistrationForm />}
        {activeForm === 'mentor' && <MentorRegistrationForm />}
        {activeForm === 'student-home' && <StudentHomePage />}
        {activeForm === 'dashboard' && <Dashboard />}
        {activeForm === 'profile' && <ProfilePage />}
        {activeForm === 'meeting-schedule' && <MeetingSchedulePage />}
        {activeForm === 'mentor-home' && <MentorHomePage />}
        {activeForm === 'notifications' && <NotificationPage />}
        {activeForm === 'about' && <AboutPage />}
        {activeForm === 'faq' && <FAQPage />}
        {activeForm === 'contact' && <ContactPage />}
      </main>
    </div>
  );
}

export default App;