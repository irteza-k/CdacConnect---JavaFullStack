import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentHomePage = () => {
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [searchSkill, setSearchSkill] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  // New state for enhanced meeting request
  const [mentorSkills, setMentorSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [question, setQuestion] = useState('');
  const [isLoadingSkills, setIsLoadingSkills] = useState(false);

  // Get user data from sessionStorage
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

  // Fetch all mentors on component mount
  useEffect(() => {
    fetchMentors();
  }, []);

  // Filter mentors when search skill changes
  useEffect(() => {
    if (searchSkill.trim() === '') {
      setFilteredMentors(mentors);
    } else {
      const filtered = mentors.filter(mentor => 
        mentor.skills && mentor.skills.some(skill => 
          skill.toLowerCase().includes(searchSkill.toLowerCase())
        )
      );
      setFilteredMentors(filtered);
    }
  }, [searchSkill, mentors]);

  // Fetch all mentors from API
  const fetchMentors = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/mentors');
      setMentors(response.data);
      setFilteredMentors(response.data);
    } catch (error) {
      console.error('Error fetching mentors:', error);
      setError('Failed to load mentors. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch mentor skills when mentor is selected
  const fetchMentorSkills = async (mentorId) => {
    try {
      setIsLoadingSkills(true);
      const response = await axios.get(`/api/mentors/${mentorId}/skills`);
      setMentorSkills(response.data || []);
    } catch (error) {
      console.error('Error fetching mentor skills:', error);
      setMentorSkills([]);
    } finally {
      setIsLoadingSkills(false);
    }
  };

  // Handle mentor selection
  const handleMentorSelect = async (mentor) => {
    setSelectedMentor(mentor);
    setShowMentorModal(true);
    setSelectedSkills([]);
    setQuestion('');
    setSubmitStatus(null);
    
    // Fetch mentor skills
    await fetchMentorSkills(mentor.mentorId);
  };

  // Handle skill selection
  const handleSkillToggle = (skillName) => {
    setSelectedSkills(prev => {
      if (prev.includes(skillName)) {
        return prev.filter(skill => skill !== skillName);
      } else {
        return [...prev, skillName];
      }
    });
  };

  // Handle mentor selection submission
  const handleMentorSubmission = async () => {
    if (!selectedMentor) return;

    // Validation
    if (selectedSkills.length === 0) {
      setSubmitStatus({
        type: 'error',
        message: 'Please select at least one skill.'
      });
      return;
    }

    if (!question.trim()) {
      setSubmitStatus({
        type: 'error',
        message: 'Please enter your question.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const requestData = {
        studentId: user.id,
        mentorId: selectedMentor.mentorId,
        skills: selectedSkills,
        question: question.trim()
      };

      const response = await axios.post('/api/meetings', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setSubmitStatus({
        type: 'success',
        message: `Meeting request sent successfully to ${selectedMentor.mentorName}!`
      });

      // Close modal after successful submission
      setTimeout(() => {
        setShowMentorModal(false);
        setSelectedMentor(null);
        setSelectedSkills([]);
        setQuestion('');
        setSubmitStatus(null);
      }, 2000);

    } catch (error) {
      console.error('Error sending meeting request:', error);
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to send meeting request. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchSkill(e.target.value);
  };

  // Clear search
  const clearSearch = () => {
    setSearchSkill('');
  };

  if (isLoading) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading mentors...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="alert alert-danger" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
              <button 
                className="btn btn-outline-danger btn-sm ms-3"
                onClick={fetchMentors}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Welcome Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h2 className="mb-2">
                <i className="bi bi-mortarboard-fill me-2"></i>
                Welcome, {user.name || 'Student'}!
              </h2>
              <p className="mb-0">Discover and connect with mentors who can help you grow</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="row mb-4">
        <div className="col-md-8 mx-auto">
          <div className="card">
            <div className="card-body">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search mentors by skill (e.g., Java, React, Python)"
                  value={searchSkill}
                  onChange={handleSearchChange}
                />
                {searchSkill && (
                  <button 
                    className="btn btn-outline-secondary" 
                    type="button"
                    onClick={clearSearch}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                )}
              </div>
              {searchSkill && (
                <small className="text-muted">
                  Showing {filteredMentors.length} mentor(s) with "{searchSkill}" skill
                </small>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="row">
        {filteredMentors.length === 0 ? (
          <div className="col-12 text-center">
            <div className="card">
              <div className="card-body py-5">
                <i className="bi bi-search display-1 text-muted"></i>
                <h4 className="mt-3">No mentors found</h4>
                <p className="text-muted">
                  {searchSkill 
                    ? `No mentors found with "${searchSkill}" skill. Try a different search term.`
                    : 'No mentors available at the moment.'
                  }
                </p>
                {searchSkill && (
                  <button 
                    className="btn btn-primary"
                    onClick={clearSearch}
                  >
                    View All Mentors
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          filteredMentors.map((mentor) => (
            <div key={mentor.mentorId} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm hover-shadow">
                <div className="card-body">
                  <div className="text-center mb-3">
                    <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" 
                         style={{width: '60px', height: '60px'}}>
                      <i className="bi bi-person-fill fs-4"></i>
                    </div>
                  </div>
                  
                  <h5 className="card-title text-center mb-2">{mentor.mentorName}</h5>
                  <p className="card-text text-center text-muted mb-3">
                    <i className="bi bi-envelope-fill me-1"></i>
                    {mentor.email}
                  </p>
                  
                  {mentor.skills && mentor.skills.length > 0 && (
                    <div className="mb-3">
                      <h6 className="text-muted mb-2">
                        <i className="bi bi-tools me-1"></i>
                        Skills:
                      </h6>
                      <div className="d-flex flex-wrap gap-1">
                        {mentor.skills.map((skill, index) => (
                          <span 
                            key={index} 
                            className="badge bg-light text-dark border"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="d-grid">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => handleMentorSelect(mentor)}
                    >
                      <i className="bi bi-person-plus-fill me-1"></i>
                      Connect with Mentor
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Mentor Selection Modal */}
      {showMentorModal && selectedMentor && (
        <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <i className="bi bi-person-plus-fill me-2"></i>
                  Connect with {selectedMentor.mentorName}
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setShowMentorModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {/* Status Messages */}
                {submitStatus && (
                  <div className={`alert alert-${submitStatus.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`} role="alert">
                    {submitStatus.message}
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setSubmitStatus(null)}
                    ></button>
                  </div>
                )}

                <div className="row mb-4">
                  <div className="col-md-6">
                    <h6 className="text-primary">
                      <i className="bi bi-person-fill me-2"></i>
                      Mentor Details:
                    </h6>
                    <ul className="list-unstyled">
                      <li><strong>Name:</strong> {selectedMentor.mentorName}</li>
                      <li><strong>Email:</strong> {selectedMentor.email}</li>
                      <li><strong>Phone:</strong> {selectedMentor.phone}</li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <h6 className="text-primary">
                      <i className="bi bi-person-fill me-2"></i>
                      Student Details:
                    </h6>
                    <ul className="list-unstyled">
                      <li><strong>Name:</strong> {user.name || 'Unknown'}</li>
                      <li><strong>Email:</strong> {user.email}</li>
                    </ul>
                  </div>
                </div>

                {/* Skills Selection */}
                <div className="mb-4">
                  <h6 className="text-primary">
                    <i className="bi bi-tools me-2"></i>
                    Select Skills for Discussion:
                  </h6>
                  {isLoadingSkills ? (
                    <div className="text-center py-3">
                      <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                      Loading skills...
                    </div>
                  ) : mentorSkills.length > 0 ? (
                    <div className="row">
                      {mentorSkills.map((skill, index) => (
                        <div key={index} className="col-md-6 mb-2">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`skill-${index}`}
                              checked={selectedSkills.includes(skill.skillName)}
                              onChange={() => handleSkillToggle(skill.skillName)}
                              disabled={isSubmitting}
                            />
                            <label className="form-check-label" htmlFor={`skill-${index}`}>
                              {skill.skillName}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted">No skills available for this mentor.</p>
                  )}
                  {selectedSkills.length > 0 && (
                    <div className="mt-2">
                      <small className="text-success">
                        <i className="bi bi-check-circle me-1"></i>
                        Selected: {selectedSkills.join(', ')}
                      </small>
                    </div>
                  )}
                </div>

                {/* Question Input */}
                <div className="mb-4">
                  <h6 className="text-primary">
                    <i className="bi bi-chat-dots me-2"></i>
                    Your Question:
                  </h6>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Please describe what you'd like to discuss with the mentor about the selected skills..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    disabled={isSubmitting}
                  ></textarea>
                  <small className="text-muted">
                    Be specific about what you want to learn or discuss.
                  </small>
                </div>

                {/* Meeting Request Summary */}
                {selectedSkills.length > 0 && question.trim() && (
                  <div className="alert alert-info">
                    <h6 className="alert-heading">
                      <i className="bi bi-info-circle me-2"></i>
                      Meeting Request Summary:
                    </h6>
                    <ul className="mb-0">
                      <li><strong>Skills:</strong> {selectedSkills.join(', ')}</li>
                      <li><strong>Question:</strong> {question}</li>
                      <li><strong>Status:</strong> Will be sent as "Pending" for mentor review</li>
                    </ul>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowMentorModal(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handleMentorSubmission}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Sending Request...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send me-1"></i>
                      Send Meeting Request
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentHomePage; 