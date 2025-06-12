import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'approved', 'rejected'
  const [mentorCalendlyLinks, setMentorCalendlyLinks] = useState({});

  // Get user data from sessionStorage
  const savedUser = sessionStorage.getItem('user');
  const user = savedUser ? JSON.parse(savedUser) : null;

  // Fetch notifications on component mount
  useEffect(() => {
    if (user && user.id) {
      fetchNotifications();
    }
  }, [user?.id]);

  // Fetch meeting notifications for the student
  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Fetching notifications for student ID:', user.id);
      
      const response = await axios.get(`/api/meetings/student/${user.id}/details`);
      
      console.log('Notifications response:', response.data);
      
      setNotifications(response.data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setError('Failed to load notifications. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter notifications based on status
  const getFilteredNotifications = () => {
    if (filter === 'all') return notifications;
    return notifications.filter(notification => 
      notification.meeting.status === filter.toUpperCase()
    );
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

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  // Get status message
  const getStatusMessage = (status) => {
    switch (status) {
      case 'PENDING':
        return 'Your meeting request is pending approval';
      case 'APPROVED':
        return 'Your meeting request has been approved!';
      case 'REJECTED':
        return 'Your meeting request has been rejected';
      case 'COMPLETED':
        return 'Meeting has been completed';
      case 'CANCELLED':
        return 'Meeting has been cancelled';
      default:
        return 'Unknown status';
    }
  };

  // Helper to get Calendly link for a mentor
  const getCalendlyLink = async (mentorId) => {
    if (mentorCalendlyLinks[mentorId]) return mentorCalendlyLinks[mentorId];
    try {
      const res = await axios.get(`/api/mentors/${mentorId}/calendly-link`);
      setMentorCalendlyLinks(prev => ({ ...prev, [mentorId]: res.data }));
      return res.data;
    } catch {
      setMentorCalendlyLinks(prev => ({ ...prev, [mentorId]: '' }));
      return '';
    }
  };

  const handleScheduleMeeting = async (mentorId) => {
    const link = await getCalendlyLink(mentorId);
    if (link) {
      window.open(link, '_blank', 'noopener');
    } else {
      alert('Mentor has not set a Calendly link yet.');
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
            <p className="mt-3">Loading notifications...</p>
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
                onClick={fetchNotifications}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredNotifications = getFilteredNotifications();

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h2 className="mb-2">
                <i className="bi bi-bell-fill me-2"></i>
                Meeting Notifications
              </h2>
              <p className="mb-0">Track the status of your meeting requests with mentors</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="bi bi-funnel me-2"></i>
                  Filter Notifications
                </h5>
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className={`btn btn-outline-primary ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                  >
                    All ({notifications.length})
                  </button>
                  <button
                    type="button"
                    className={`btn btn-outline-warning ${filter === 'pending' ? 'active' : ''}`}
                    onClick={() => setFilter('pending')}
                  >
                    Pending ({notifications.filter(n => n.meeting.status === 'PENDING').length})
                  </button>
                  <button
                    type="button"
                    className={`btn btn-outline-success ${filter === 'approved' ? 'active' : ''}`}
                    onClick={() => setFilter('approved')}
                  >
                    Approved ({notifications.filter(n => n.meeting.status === 'APPROVED').length})
                  </button>
                  <button
                    type="button"
                    className={`btn btn-outline-danger ${filter === 'rejected' ? 'active' : ''}`}
                    onClick={() => setFilter('rejected')}
                  >
                    Rejected ({notifications.filter(n => n.meeting.status === 'REJECTED').length})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-light">
              <h4 className="mb-0">
                <i className="bi bi-list-ul me-2"></i>
                Notifications ({filteredNotifications.length})
              </h4>
            </div>
            <div className="card-body">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-inbox display-1 text-muted"></i>
                  <h4 className="mt-3 text-muted">No Notifications</h4>
                  <p className="text-muted">
                    {filter === 'all' 
                      ? "You don't have any meeting requests yet." 
                      : `No ${filter} notifications found.`
                    }
                  </p>
                </div>
              ) : (
                <div className="row">
                  {filteredNotifications.map((notification, index) => (
                    <div key={index} className="col-12 mb-3">
                      <div className="card border-0 shadow-sm">
                        <div className="card-body">
                          <div className="row align-items-center">
                            {/* Status Icon */}
                            <div className="col-md-1 text-center">
                              <div className={`rounded-circle d-flex align-items-center justify-content-center mx-auto`}
                                   style={{
                                     width: '50px', 
                                     height: '50px',
                                     backgroundColor: notification.meeting.status === 'APPROVED' ? '#d4edda' :
                                                    notification.meeting.status === 'REJECTED' ? '#f8d7da' :
                                                    notification.meeting.status === 'PENDING' ? '#fff3cd' : '#e2e3e5'
                                   }}>
                                <i className={`bi ${
                                  notification.meeting.status === 'APPROVED' ? 'bi-check-circle-fill text-success' :
                                  notification.meeting.status === 'REJECTED' ? 'bi-x-circle-fill text-danger' :
                                  notification.meeting.status === 'PENDING' ? 'bi-clock-fill text-warning' : 'bi-question-circle-fill text-secondary'
                                } fs-4`}></i>
                              </div>
                            </div>

                            {/* Notification Content */}
                            <div className="col-md-8">
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <h6 className="mb-1">
                                  <i className="bi bi-person-workspace me-2"></i>
                                  {notification.mentor.mentorName}
                                </h6>
                                <span className={getStatusBadgeClass(notification.meeting.status)}>
                                  {notification.meeting.status}
                                </span>
                              </div>
                              
                              <p className="text-muted mb-2">
                                <strong>Question:</strong> {notification.meeting.question}
                              </p>
                              
                              <div className="d-flex flex-wrap gap-2 mb-2">
                                <strong>Skills:</strong>
                                {notification.meeting.selectedSkills?.split(',').map((skill, skillIndex) => (
                                  <span key={skillIndex} className="badge bg-info">
                                    {skill.trim()}
                                  </span>
                                ))}
                              </div>
                              
                              <p className="text-muted mb-0">
                                <small>
                                  <i className="bi bi-calendar me-1"></i>
                                  Requested: {formatDate(notification.meeting.requestDate)}
                                </small>
                              </p>
                            </div>

                            {/* Status Message */}
                            <div className="col-md-3">
                              <div className="text-end">
                                <p className="text-muted small mb-2">
                                  {getStatusMessage(notification.meeting.status)}
                                </p>
                                {notification.meeting.status === 'APPROVED' && (
                                  <button
                                    className="btn btn-success btn-sm"
                                    onClick={() => handleScheduleMeeting(notification.mentor.mentorId)}
                                    disabled={mentorCalendlyLinks[notification.mentor.mentorId] === ''}
                                    title={mentorCalendlyLinks[notification.mentor.mentorId] === '' ? 'Mentor has not set a Calendly link yet.' : 'Schedule Meeting'}
                                  >
                                    <i className="bi bi-calendar-check me-1"></i>
                                    Schedule Meeting
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
            onClick={fetchNotifications}
            disabled={isLoading}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>
            Refresh Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage; 