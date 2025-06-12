import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLoginSuccess, onNavigateToRegistration }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'student' // 'student' or 'mentor'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    if (!formData.userType) {
      newErrors.userType = 'Please select user type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Determine API endpoint based on user type

      const endpoint = formData.userType === 'student' ? '/api/students/login' : '/api/mentors/login';
      console.log(formData.userType);
      const response = await axios.post(endpoint, {
        email: formData.email,
        password: formData.password
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setSubmitStatus({
        type: 'success',
        message: `Welcome back! ${formData.userType === 'student' ? 'Student' : 'Mentor'} login successful.`
      });

      // Store user data and token in sessionStorage
      const userData = {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        userType: response.data.userType || formData.userType
      };
      
      sessionStorage.setItem('user', JSON.stringify(userData));
      sessionStorage.setItem('token', response.data.token); // Store the JWT token

      // Set default axios headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      // Reset form on successful submission
      setFormData({
        email: '',
        password: '',
        userType: 'student'
      });

      // Call the onLoginSuccess callback
      if (onLoginSuccess) {
        onLoginSuccess(userData);
      }

    } catch (error) {
      console.error('Login error:', error);
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.message || 'Login failed. Please check your credentials and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h3 className="mb-0">
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Login
              </h3>
            </div>
            <div className="card-body p-4">
              {/* Status Messages */}
              {submitStatus && (
                <div className={`alert alert-${submitStatus.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`} role="alert">
                  {submitStatus.message}
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setSubmitStatus(null)}
                    aria-label="Close"
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                {/* User Type Selection */}
                <div className="mb-3">
                  <label htmlFor="userType" className="form-label">
                    <i className="bi bi-person-badge me-1"></i>
                    Login As *
                  </label>
                  <select
                    className={`form-select ${errors.userType ? 'is-invalid' : ''}`}
                    id="userType"
                    name="userType"
                    value={formData.userType}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  >
                    <option value="student">Student</option>
                    <option value="mentor">Mentor</option>
                  </select>
                  {errors.userType && (
                    <div className="invalid-feedback">
                      {errors.userType}
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    <i className="bi bi-envelope-fill me-1"></i>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    <i className="bi bi-lock-fill me-1"></i>
                    Password *
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    disabled={isSubmitting}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="d-grid mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Logging in...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Login
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Registration Links */}
              <div className="text-center">
                <hr className="my-3" />
                <p className="text-muted mb-2">Don't have an account?</p>
                <div className="d-grid gap-2">
                  <button 
                    type="button"
                    className="btn btn-outline-success btn-sm"
                    onClick={() => onNavigateToRegistration && onNavigateToRegistration('student')}
                  >
                    <i className="bi bi-mortarboard-fill me-1"></i>
                    Register as Student
                  </button>
                  <button 
                    type="button"
                    className="btn btn-outline-info btn-sm"
                    onClick={() => onNavigateToRegistration && onNavigateToRegistration('mentor')}
                  >
                    <i className="bi bi-person-plus-fill me-1"></i>
                    Register as Mentor
                  </button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-3 text-center">
                <small className="text-muted">
                  <i className="bi bi-info-circle me-1"></i>
                  All fields marked with * are required
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 