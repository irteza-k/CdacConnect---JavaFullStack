import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MentorHomePage.css';

const MentorHomePage = () => {
  const [meetingRequests, setMeetingRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionStatus, setActionStatus] = useState(null);

  // Get user data from sessionStorage
  const savedUser = sessionStorage.getItem('user');
  const user = savedUser ? JSON.parse(savedUser) : null;

  // Check session on component mount
  useEffect(() => {
    if (!user) {
      console.error('No user found in session');
      window.location.href = '/login';
      return;
    }
    
    // Check if token exists
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('No token found in session');
      window.location.href = '/login';
      return;
    }

    // Set default axios headers
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, []);

  // Fetch meeting requests on component mount
  useEffect(() => {
    if (user && user.id) {
      fetchMeetingRequests();
    }
  }, [user?.id]);

  // Fetch meeting requests for the mentor
  const fetchMeetingRequests = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const token = sessionStorage.getItem('token');
      if (!token) {
        setError('Session expired. Please log in again.');
        setIsLoading(false);
        return;
      }
      const response = await axios.get(`/api/meetings/mentor/${user.id}/requests`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMeetingRequests(response.data || []);
    } catch (error) {
      console.error('Error fetching meeting requests:', error);
      setError('Failed to load meeting requests. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle accept/reject meeting request
  const handleMeetingAction = async (meetingId, action) => {
    try {
      setActionStatus({ type: 'loading', message: `${action}ing meeting request...` });
      const token = sessionStorage.getItem('token');
      if (!token) {
        setActionStatus({
          type: 'error',
          message: 'Session expired. Please log in again.'
        });
        return;
      }
      const response = await axios.put(`/api/meetings/${meetingId}`,
        {
          status: action === 'accept' ? 'APPROVED' : 'REJECTED',
          mentorId: Number(user.id)
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.status === 200) {
        setActionStatus({
          type: 'success',
          message: `Meeting request ${action}ed successfully!`
        });
        setMeetingRequests(prev =>
          prev.map(meeting =>
            meeting.meeting.meetingId === meetingId
              ? { ...meeting, meeting: { ...meeting.meeting, status: action === 'accept' ? 'APPROVED' : 'REJECTED' } }
              : meeting
          )
        );
        setTimeout(() => {
          setActionStatus(null);
        }, 3000);
      }
    } catch (error) {
      console.error(`Error ${action}ing meeting request:`, error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      }
      setActionStatus({
        type: 'error',
        message: `Failed to ${action} meeting request. Please try again.`
      });
      setTimeout(() => {
        setActionStatus(null);
      }, 5000);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'PENDING':
        return 'badge bg-warning text-dark';
      case 'APPROVED':
        return 'badge bg-success';
      case 'REJECTED':
        return 'badge bg-danger';
      case 'COMPLETED':
        return 'badge bg-primary';
      case 'CANCELLED':
        return 'badge bg-secondary';
      default:
        return 'badge bg-secondary';
    }
  };

  if (isLoading) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading meeting requests...</p>
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
                onClick={fetchMeetingRequests}
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
                <i className="bi bi-person-workspace me-2"></i>
                Welcome, {user?.name || 'Mentor'}!
              </h2>
              <p className="mb-0">Manage your meeting requests and help students learn</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Status Messages */}
      {actionStatus && (
        <div className="row mb-3">
          <div className="col-12">
            <div className={`alert alert-${actionStatus.type === 'success' ? 'success' : actionStatus.type === 'error' ? 'danger' : 'info'} alert-dismissible fade show`} role="alert">
              {actionStatus.type === 'loading' && (
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              )}
              {actionStatus.message}
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setActionStatus(null)}
              ></button>
            </div>
          </div>
        </div>
      )}

      {/* Meeting Requests Section */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-light">
              <h3 className="mb-0">
                <i className="bi bi-calendar-check me-2"></i>
                Meeting Requests
                <span className="badge bg-primary ms-2">{meetingRequests.length}</span>
              </h3>
            </div>
            <div className="card-body">
              {meetingRequests.length === 0 ? (
                <div className="text-center py-4">
                  <i className="bi bi-inbox display-1 text-muted"></i>
                  <h4 className="mt-3 text-muted">No Meeting Requests</h4>
                  <p className="text-muted">You don't have any meeting requests at the moment.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Student</th>
                        <th>Email</th>
                        <th>Skills</th>
                        <th>Question</th>
                        <th>Request Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {meetingRequests.map((request) => (
                        <tr key={request.meeting.meetingId}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar-circle me-2">
                                <i className="bi bi-person-fill"></i>
                              </div>
                              <div>
                                <strong>{request.student.studName || request.student.mentorName}</strong>
                              </div>
                            </div>
                          </td>
                          <td>
                            <a href={`mailto:${request.student.email}`} className="text-decoration-none">
                              {request.student.email}
                            </a>
                          </td>
                          <td>
                            <div className="skills-container">
                              {request.meeting.selectedSkills?.split(',').map((skill, index) => (
                                <span key={index} className="badge bg-info me-1 mb-1">
                                  {skill.trim()}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td>
                            <div className="question-text">
                              {request.meeting.question}
                            </div>
                          </td>
                          <td>
                            <small className="text-muted">
                              {formatDate(request.meeting.requestDate)}
                            </small>
                          </td>
                          <td>
                            <span className={getStatusBadgeClass(request.meeting.status)}>
                              {request.meeting.status}
                            </span>
                          </td>
                          <td>
                            {request.meeting.status === 'PENDING' && (
                              <div className="btn-group" role="group">
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={() => handleMeetingAction(request.meeting.meetingId, 'accept')}
                                  title="Accept meeting request"
                                >
                                  <i className="bi bi-check-lg"></i>
                                </button>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleMeetingAction(request.meeting.meetingId, 'reject')}
                                  title="Reject meeting request"
                                >
                                  <i className="bi bi-x-lg"></i>
                                </button>
                              </div>
                            )}
                            {request.meeting.status !== 'PENDING' && (
                              <small className="text-muted">No actions available</small>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="row mt-3">
        <div className="col-12 text-center">
          <button 
            className="btn btn-outline-primary"
            onClick={fetchMeetingRequests}
            disabled={isLoading}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>
            Refresh Meeting Requests
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorHomePage; 