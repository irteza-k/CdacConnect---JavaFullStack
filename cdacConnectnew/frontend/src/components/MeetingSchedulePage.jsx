import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MeetingSchedulePage = () => {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState('');
  const [skill, setSkill] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState('');

  // Get user data from sessionStorage
  const savedUser = sessionStorage.getItem('user');
  const user = savedUser ? JSON.parse(savedUser) : null;

  // Get current date and time
  useEffect(() => {
    const now = new Date();
    const formattedDateTime = now.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:MM
    setCurrentDateTime(formattedDateTime);
  }, []);

  // Fetch mentors on component mount
  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const response = await axios.get('/api/mentors');
      setMentors(response.data);
    } catch (error) {
      console.error('Error fetching mentors:', error);
      setMessage('Error loading mentors. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedMentor || !skill || !topic || !description) {
      setMessage('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const studentId = user ? user.id : null;
      if (!studentId) {
        setMessage('User not found. Please log in again.');
        return;
      }
      
      const meetingData = {
        studentId: parseInt(studentId),
        mentorId: parseInt(selectedMentor),
        skill: skill,
        topic: topic,
        description: description,
        scheduledDateTime: currentDateTime,
        status: 'PENDING'
      };

      const response = await axios.post('/api/meetings', meetingData);
      
      if (response.status === 201) {
        setMessage('Meeting scheduled successfully!');
        // Reset form
        setSelectedMentor('');
        setSkill('');
        setTopic('');
        setDescription('');
      }
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      setMessage('Error scheduling meeting. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Schedule Meeting</h3>
            </div>
            <div className="card-body">
              <div className="alert alert-info">
                <strong>Note:</strong> Meetings can only be scheduled for the current date and time.
                <br />
                <strong>Current Date & Time:</strong> {new Date(currentDateTime).toLocaleString()}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="mentor" className="form-label">Select Mentor *</label>
                  <select
                    id="mentor"
                    className="form-select"
                    value={selectedMentor}
                    onChange={(e) => setSelectedMentor(e.target.value)}
                    required
                  >
                    <option value="">Choose a mentor...</option>
                    {mentors.map((mentor) => (
                      <option key={mentor.id} value={mentor.id}>
                        {mentor.name} - {mentor.skills.join(', ')}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="skill" className="form-label">Skill *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="skill"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    placeholder="Enter the skill for the meeting"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="topic" className="form-label">Topic *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter meeting topic"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description *</label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter meeting description"
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Scheduled Date & Time</label>
                  <input
                    type="text"
                    className="form-control"
                    value={new Date(currentDateTime).toLocaleString()}
                    disabled
                    readOnly
                  />
                  <small className="form-text text-muted">
                    Meeting will be scheduled for the current date and time
                  </small>
                </div>

                {message && (
                  <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
                    {message}
                  </div>
                )}

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Scheduling...' : 'Schedule Meeting'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingSchedulePage; 