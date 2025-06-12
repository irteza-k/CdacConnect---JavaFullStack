import React, { useState } from 'react';
import axios from 'axios';

const MentorRegistrationForm = () => {
  const [formData, setFormData] = useState({
    mentorName: '',
    email: '',
    password: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.mentorName.trim()) {
      newErrors.mentorName = 'Mentor name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
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
      const response = await axios.post('/api/mentors', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setSubmitStatus({
        type: 'success',
        message: 'Mentor registered successfully!'
      });

      // Reset form on successful submission
      setFormData({
        mentorName: '',
        email: '',
        password: '',
        phone: ''
      });

    } catch (error) {
      console.error('Registration error:', error);
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to register mentor. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h3 className="mb-0">
                <i className="bi bi-person-plus-fill me-2"></i>
                Mentor Registration
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
                {/* Mentor Name Field */}
                <div className="mb-3">
                  <label htmlFor="mentorName" className="form-label">
                    <i className="bi bi-person-fill me-1"></i>
                    Mentor Name *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.mentorName ? 'is-invalid' : ''}`}
                    id="mentorName"
                    name="mentorName"
                    value={formData.mentorName}
                    onChange={handleInputChange}
                    placeholder="Enter mentor's full name"
                    disabled={isSubmitting}
                  />
                  {errors.mentorName && (
                    <div className="invalid-feedback">
                      {errors.mentorName}
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
                    placeholder="Enter email address"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="mb-3">
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
                    placeholder="Enter password (min 6 characters)"
                    disabled={isSubmitting}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* Phone Field */}
                <div className="mb-4">
                  <label htmlFor="phone" className="form-label">
                    <i className="bi bi-telephone-fill me-1"></i>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    disabled={isSubmitting}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">
                      {errors.phone}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Registering...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-person-plus-fill me-2"></i>
                        Register Mentor
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Additional Info */}
              <div className="mt-4 text-center">
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

export default MentorRegistrationForm; 