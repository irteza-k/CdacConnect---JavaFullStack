import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalMentors: 0,
    totalMeetings: 0,
    activeConnections: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // In a real app, you'd have a dashboard endpoint
      // For now, we'll simulate the data
      setStats({
        totalStudents: 125,
        totalMentors: 45,
        totalMeetings: 89,
        activeConnections: 67
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color, gradient }) => (
    <div className="col-12 col-sm-6 col-lg-3 mb-4">
      <div className="card h-100 shadow-custom">
        <div className="card-body text-center">
          <div className={`mb-3 ${gradient} rounded-circle d-inline-flex align-items-center justify-content-center`} 
               style={{ width: '60px', height: '60px' }}>
            <i className={`bi ${icon} fs-3 text-white`}></i>
          </div>
          <h3 className="text-gradient fw-bold mb-1">{value}</h3>
          <p className="text-muted mb-0">{title}</p>
        </div>
      </div>
    </div>
  );

  const RecentActivityCard = () => (
    <div className="col-12 col-lg-6 mb-4">
      <div className="card shadow-custom">
        <div className="card-header">
          <h5 className="mb-0">
            <i className="bi bi-clock-history me-2"></i>
            Recent Activity
          </h5>
        </div>
        <div className="card-body">
          <div className="list-group list-group-flush">
            <div className="list-group-item border-0 px-0">
              <div className="d-flex align-items-center">
                <div className="bg-success rounded-circle me-3" style={{ width: '10px', height: '10px' }}></div>
                <div className="flex-grow-1">
                  <h6 className="mb-1">New student registration</h6>
                  <small className="text-muted">John Doe registered as a student</small>
                </div>
                <small className="text-muted">2 min ago</small>
              </div>
            </div>
            <div className="list-group-item border-0 px-0">
              <div className="d-flex align-items-center">
                <div className="bg-primary rounded-circle me-3" style={{ width: '10px', height: '10px' }}></div>
                <div className="flex-grow-1">
                  <h6 className="mb-1">Meeting scheduled</h6>
                  <small className="text-muted">Java mentoring session scheduled</small>
                </div>
                <small className="text-muted">15 min ago</small>
              </div>
            </div>
            <div className="list-group-item border-0 px-0">
              <div className="d-flex align-items-center">
                <div className="bg-warning rounded-circle me-3" style={{ width: '10px', height: '10px' }}></div>
                <div className="flex-grow-1">
                  <h6 className="mb-1">New mentor joined</h6>
                  <small className="text-muted">Sarah Wilson joined as a mentor</small>
                </div>
                <small className="text-muted">1 hour ago</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const QuickActionsCard = () => (
    <div className="col-12 col-lg-6 mb-4">
      <div className="card shadow-custom">
        <div className="card-header">
          <h5 className="mb-0">
            <i className="bi bi-lightning me-2"></i>
            Quick Actions
          </h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-6">
              <button className="btn btn-primary w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3">
                <i className="bi bi-person-plus fs-4 mb-2"></i>
                <span>Register</span>
              </button>
            </div>
            <div className="col-6">
              <button className="btn btn-success w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3">
                <i className="bi bi-calendar-plus fs-4 mb-2"></i>
                <span>Schedule</span>
              </button>
            </div>
            <div className="col-6">
              <button className="btn btn-info w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3">
                <i className="bi bi-search fs-4 mb-2"></i>
                <span>Find Mentor</span>
              </button>
            </div>
            <div className="col-6">
              <button className="btn btn-warning w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3">
                <i className="bi bi-gear fs-4 mb-2"></i>
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="text-gradient mb-1">Dashboard</h1>
              <p className="text-muted mb-0">Welcome to CDAC Connect</p>
            </div>
            <div className="d-none d-md-block">
              <button className="btn btn-outline-primary">
                <i className="bi bi-download me-2"></i>
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <StatCard 
          title="Total Students" 
          value={stats.totalStudents} 
          icon="bi-people" 
          color="primary"
          gradient="bg-primary"
        />
        <StatCard 
          title="Total Mentors" 
          value={stats.totalMentors} 
          icon="bi-person-workspace" 
          color="success"
          gradient="bg-success"
        />
        <StatCard 
          title="Total Meetings" 
          value={stats.totalMeetings} 
          icon="bi-calendar-check" 
          color="info"
          gradient="bg-info"
        />
        <StatCard 
          title="Active Connections" 
          value={stats.activeConnections} 
          icon="bi-link-45deg" 
          color="warning"
          gradient="bg-warning"
        />
      </div>

      {/* Content Cards */}
      <div className="row">
        <RecentActivityCard />
        <QuickActionsCard />
      </div>

      {/* Responsive Features Demo */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card shadow-custom">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-phone me-2"></i>
                Responsive Features
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-md-6 col-lg-3 mb-3">
                  <div className="alert alert-info">
                    <strong>Mobile First:</strong> Optimized for all screen sizes
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3 mb-3">
                  <div className="alert alert-success">
                    <strong>Touch Friendly:</strong> Large buttons and touch targets
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3 mb-3">
                  <div className="alert alert-warning">
                    <strong>Fast Loading:</strong> Vite-powered development
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3 mb-3">
                  <div className="alert alert-primary">
                    <strong>Modern UI:</strong> Bootstrap 5 with custom styling
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 