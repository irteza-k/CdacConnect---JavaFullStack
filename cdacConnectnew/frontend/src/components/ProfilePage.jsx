import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  
  // Skill management states for mentors
  const [newSkill, setNewSkill] = useState('');
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [isDeletingSkill, setIsDeletingSkill] = useState(false);
  
  // Confirmation modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [confirmCallback, setConfirmCallback] = useState(null);
  
  // Password change states
  const [currentPassword, setCurrentPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Calendly link management for mentors
  const [calendlyLink, setCalendlyLink] = useState('');
  const [isEditingCalendly, setIsEditingCalendly] = useState(false);
  const [isSavingCalendly, setIsSavingCalendly] = useState(false);
  const [calendlyStatus, setCalendlyStatus] = useState(null);

  // Get user data from sessionStorage
  const savedUser = sessionStorage.getItem('user');
  const user = savedUser ? JSON.parse(savedUser) : null;

  // Helper function to extract skill names from various formats
  const getSkillNames = (skills) => {
    if (!skills || !Array.isArray(skills)) return [];
    return skills.map(skill => {
      if (typeof skill === 'string') return skill;
      if (skill && typeof skill === 'object' && skill.skillName) return skill.skillName;
      return String(skill);
    });
  };

  // Fetch detailed user data from backend
  useEffect(() => {
    if (user) {
      fetchUserDetails(user);
    }
  }, [user?.id, user?.userType]);

  // Fetch detailed user data from backend
  const fetchUserDetails = async (userInfo) => {
    try {
      setIsLoading(true);
      const endpoint = userInfo.userType === 'student' 
        ? `/api/students/${userInfo.id}` 
        : `/api/mentors/${userInfo.id}`;
      
      const response = await axios.get(endpoint);
      console.log('Profile data response:', response.data);
      console.log('Skills data:', response.data.skills);
      console.log('Skills type:', typeof response.data.skills);
      if (response.data.skills && response.data.skills.length > 0) {
        console.log('First skill:', response.data.skills[0]);
        console.log('First skill type:', typeof response.data.skills[0]);
      }
      
      let userDataWithSkills = response.data;
      
      // For mentors, fetch skills separately using the skills endpoint
      if (userInfo.userType === 'mentor') {
        try {
          const skillsResponse = await axios.get(`/api/mentors/${userInfo.id}/skills`);
          console.log('Skills API response:', skillsResponse.data);
          userDataWithSkills.skills = skillsResponse.data;
        } catch (skillsError) {
          console.error('Error fetching mentor skills:', skillsError);
          userDataWithSkills.skills = [];
        }
      }
      
      setUserData(userDataWithSkills);
    } catch (error) {
      console.error('Error fetching user details:', error);
      setError('Failed to load user profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Validation function
  const validateField = (fieldName, value) => {
    const errors = {};

    switch (fieldName) {
      case 'email':
        if (!value.trim()) {
          errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          errors.phone = 'Phone number is required';
        } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, ''))) {
          errors.phone = 'Please enter a valid phone number';
        }
        break;
      case 'studName':
      case 'mentorName':
        if (!value.trim()) {
          errors[fieldName] = 'Name is required';
        }
        break;
      case 'password':
        if (value && value.length < 6) {
          errors.password = 'Password must be at least 6 characters long';
        }
        break;
      default:
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Start editing a field
  const startEditing = (fieldName, currentValue) => {
    if (fieldName === 'password') {
      // Show password verification modal for password changes
      setShowPasswordModal(true);
      setCurrentPassword('');
      return;
    }
    
    setEditingField(fieldName);
    setEditValue(currentValue || '');
    setValidationErrors({});
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingField(null);
    setEditValue('');
    setValidationErrors({});
  };

  // Handle password verification
  const handlePasswordVerification = async () => {
    if (!currentPassword.trim()) {
      setValidationErrors({ currentPassword: 'Current password is required' });
      return;
    }

    try {
      // Verify current password by attempting login
      const loginEndpoint = user.userType === 'student' 
        ? '/api/students/login' 
        : '/api/mentors/login';
      
      const response = await axios.post(loginEndpoint, {
        email: user.email,
        password: currentPassword
      });

      if (response.status === 200) {
        // Password is correct, proceed to edit password
        setShowPasswordModal(false);
        setCurrentPassword('');
        setEditingField('password');
        setEditValue('');
        setValidationErrors({});
      }
    } catch (error) {
      setValidationErrors({ currentPassword: 'Current password is incorrect' });
    }
  };

  // Save field update
  const saveField = async (fieldName) => {
    if (!validateField(fieldName, editValue)) {
      return;
    }

    setConfirmAction('updateField');
    setConfirmMessage(`Are you sure you want to update your ${fieldName} to "${editValue}"?`);
    setConfirmCallback(() => async () => {
      setIsSubmitting(true);
      setSubmitStatus(null);

      try {
        const endpoint = user.userType === 'student' 
          ? `/api/students/${user.id}` 
          : `/api/mentors/${user.id}`;
        
        const updateData = { [fieldName]: editValue };
        
        const response = await axios.put(endpoint, updateData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Update local state
        setUserData(prev => ({
          ...prev,
          [fieldName]: editValue
        }));

        // Update sessionStorage if email or name changed
        if (fieldName === 'email' || fieldName === 'studName' || fieldName === 'mentorName') {
          const updatedUser = { ...user };
          if (fieldName === 'email') updatedUser.email = editValue;
          if (fieldName === 'studName') updatedUser.name = editValue;
          if (fieldName === 'mentorName') updatedUser.name = editValue;
          sessionStorage.setItem('user', JSON.stringify(updatedUser));
        }

        setSubmitStatus({
          type: 'success',
          message: `${fieldName} updated successfully!`
        });

        setEditingField(null);
        setEditValue('');

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 3000);

      } catch (error) {
        console.error('Error updating field:', error);
        setSubmitStatus({
          type: 'error',
          message: error.response?.data?.message || `Failed to update ${fieldName}. Please try again.`
        });
      } finally {
        setIsSubmitting(false);
      }
    });
    setShowConfirmModal(true);
  };

  // Render field with edit functionality
  const renderEditableField = (fieldName, label, value, type = 'text', placeholder = '') => {
    const isEditing = editingField === fieldName;
    const fieldError = validationErrors[fieldName];

    return (
      <div className="mb-3">
        <label className="form-label fw-bold">
          <i className="bi bi-person-fill me-1"></i>
          {label}
        </label>
        
        {isEditing ? (
          <div>
            <input
              type={type}
              className={`form-control ${fieldError ? 'is-invalid' : ''}`}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder={placeholder}
              disabled={isSubmitting}
            />
            {fieldError && (
              <div className="invalid-feedback">
                {fieldError}
              </div>
            )}
            <div className="mt-2">
              <button
                className="btn btn-success btn-sm me-2"
                onClick={() => saveField(fieldName)}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-1" role="status"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check me-1"></i>
                    Save
                  </>
                )}
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={cancelEditing}
                disabled={isSubmitting}
              >
                <i className="bi bi-x me-1"></i>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-muted">{value || 'Not set'}</span>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => startEditing(fieldName, value)}
            >
              <i className="bi bi-pencil me-1"></i>
              Edit
            </button>
          </div>
        )}
      </div>
    );
  };

  // Fetch mentor skills separately
  const fetchMentorSkills = async () => {
    if (user.userType !== 'mentor') return;
    
    try {
      const skillsResponse = await axios.get(`/api/mentors/${user.id}/skills`);
      console.log('Refreshed skills:', skillsResponse.data);
      setUserData(prev => ({
        ...prev,
        skills: skillsResponse.data
      }));
    } catch (error) {
      console.error('Error refreshing mentor skills:', error);
    }
  };

  // Add skill to mentor
  const addSkill = async () => {
    if (!newSkill.trim()) {
      setSubmitStatus({
        type: 'error',
        message: 'Please enter a skill name'
      });
      return;
    }

    setIsAddingSkill(true);
    setSubmitStatus(null);

    try {
      // Get current skill names using the helper function
      const currentSkillNames = getSkillNames(userData.skills);
      
      if (currentSkillNames.includes(newSkill.trim())) {
        setSubmitStatus({
          type: 'error',
          message: 'This skill already exists'
        });
        return;
      }

      const updatedSkills = [...currentSkillNames, newSkill.trim()];
      
      const response = await axios.post(`/api/mentors/${user.id}/skills`, updatedSkills, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Refresh skills from API instead of updating local state
      await fetchMentorSkills();

      setSubmitStatus({
        type: 'success',
        message: `Skill '${newSkill.trim()}' added successfully!`
      });

      setNewSkill('');

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);

    } catch (error) {
      console.error('Error adding skill:', error);
      setSubmitStatus({
        type: 'error',
        message: error.response?.data || 'Failed to add skill. Please try again.'
      });
    } finally {
      setIsAddingSkill(false);
    }
  };

  // Delete skill from mentor
  const deleteSkill = async (skillName) => {
    setConfirmAction('deleteSkill');
    setConfirmMessage(`Are you sure you want to delete the skill '${skillName}'? This will remove it from your profile but keep it in the skills database.`);
    setConfirmCallback(() => async () => {
      setIsDeletingSkill(true);
      setSubmitStatus(null);

      try {
        const response = await axios.delete(`/api/mentors/${user.id}/skills/${encodeURIComponent(skillName)}`);

        // Refresh skills from API instead of updating local state
        await fetchMentorSkills();

        setSubmitStatus({
          type: 'success',
          message: `Skill '${skillName}' deleted successfully!`
        });

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 3000);

      } catch (error) {
        console.error('Error deleting skill:', error);
        setSubmitStatus({
          type: 'error',
          message: error.response?.data || 'Failed to delete skill. Please try again.'
        });
      } finally {
        setIsDeletingSkill(false);
      }
    });
    setShowConfirmModal(true);
  };

  // Render skills section for mentors
  const renderSkillsSection = () => {
    if (user.userType !== 'mentor') return null;

    // Get skill names using the helper function
    const skillNames = getSkillNames(userData.skills);

    return (
      <div className="mb-4">
        <label className="form-label fw-bold">
          <i className="bi bi-tools me-1"></i>
          Skills
        </label>
        
        {/* Current Skills */}
        <div className="mb-3">
          {skillNames.length > 0 ? (
            <div className="d-flex flex-wrap gap-2">
              {skillNames.map((skillName, index) => (
                <span key={index} className="badge bg-success d-flex align-items-center">
                  {skillName}
                  <button
                    type="button"
                    className="btn-close btn-close-white ms-2"
                    style={{fontSize: '0.6rem', opacity: '0.8'}}
                    onClick={() => deleteSkill(skillName)}
                    disabled={isDeletingSkill}
                    title={`Remove ${skillName} from your profile`}
                  >
                    <span className="visually-hidden">Remove {skillName}</span>
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-muted">No skills added yet</p>
          )}
        </div>

        {/* Add New Skill */}
        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addSkill()}
            disabled={isAddingSkill}
          />
          <button
            className="btn btn-primary"
            onClick={addSkill}
            disabled={isAddingSkill || !newSkill.trim()}
          >
            {isAddingSkill ? (
              <>
                <span className="spinner-border spinner-border-sm me-1" role="status"></span>
                Adding...
              </>
            ) : (
              <>
                <i className="bi bi-plus me-1"></i>
                Add
              </>
            )}
          </button>
        </div>
        
        <small className="text-muted">
          Click the X button on any skill to remove it from your profile (skill remains in database), or add new skills above
        </small>
      </div>
    );
  };

  // Fetch Calendly link for mentors
  useEffect(() => {
    if (user && user.userType === 'mentor') {
      axios.get(`/api/mentors/${user.id}/calendly-link`).then(res => {
        setCalendlyLink(res.data || '');
      }).catch(() => setCalendlyLink(''));
    }
  }, [user?.id, user?.userType]);

  const saveCalendlyLink = async () => {
    if (!calendlyLink.trim()) {
      setCalendlyStatus({ type: 'error', message: 'Please enter a Calendly link.' });
      return;
    }
    setIsSavingCalendly(true);
    setCalendlyStatus(null);
    try {
      await axios.put(`/api/mentors/${user.id}/calendly-link`, calendlyLink, { headers: { 'Content-Type': 'text/plain' } });
      setCalendlyStatus({ type: 'success', message: 'Calendly link updated successfully!' });
      setIsEditingCalendly(false);
    } catch (error) {
      setCalendlyStatus({ type: 'error', message: 'Failed to update Calendly link.' });
    } finally {
      setIsSavingCalendly(false);
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
            <p className="mt-3">Loading profile...</p>
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
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div className="alert alert-warning" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              Please log in to view your profile.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Profile Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <div className="mb-3">
                <div className="bg-white text-primary rounded-circle d-inline-flex align-items-center justify-content-center" 
                     style={{width: '80px', height: '80px'}}>
                  <i className="bi bi-person-fill fs-1"></i>
                </div>
              </div>
              <h2 className="mb-2">
                {userData.studName || userData.mentorName || 'User Profile'}
              </h2>
              <p className="mb-0">
                <i className="bi bi-person-badge me-1"></i>
                {user.userType === 'student' ? 'Student' : 'Mentor'} Account
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {submitStatus && (
        <div className="row mb-4">
          <div className="col-12">
            <div className={`alert alert-${submitStatus.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`} role="alert">
              {submitStatus.message}
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setSubmitStatus(null)}
              ></button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Information */}
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card shadow">
            <div className="card-header bg-light">
              <h4 className="mb-0">
                <i className="bi bi-gear-fill me-2"></i>
                Profile Information
              </h4>
            </div>
            <div className="card-body p-4">
              
              {/* User Type */}
              <div className="mb-4">
                <label className="form-label fw-bold">
                  <i className="bi bi-person-badge me-1"></i>
                  Account Type
                </label>
                <div className="d-flex align-items-center">
                  <span className="badge bg-primary fs-6">
                    {user.userType === 'student' ? 'Student' : 'Mentor'}
                  </span>
                </div>
              </div>

              {/* Name Field */}
              {user.userType === 'student' 
                ? renderEditableField('studName', 'Full Name', userData.studName, 'text', 'Enter your full name')
                : renderEditableField('mentorName', 'Full Name', userData.mentorName, 'text', 'Enter your full name')
              }

              {/* Email Field */}
              {renderEditableField('email', 'Email Address', userData.email, 'email', 'Enter your email address')}

              {/* Phone Field */}
              {renderEditableField('phone', 'Phone Number', userData.phone, 'tel', 'Enter your phone number')}

              {/* Password Field */}
              {renderEditableField('password', 'Password', '', 'password', 'Enter new password (min 6 characters)')}

              {/* Skills (for mentors only) */}
              {renderSkillsSection()}

              {/* Calendly Link (for mentors only) */}
              {user.userType === 'mentor' && (
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    <i className="bi bi-calendar-event me-1"></i>
                    Calendly Link
                  </label>
                  {isEditingCalendly ? (
                    <div className="d-flex gap-2 align-items-center">
                      <input
                        type="url"
                        className="form-control"
                        placeholder="Enter your Calendly link (https://calendly.com/...)"
                        value={calendlyLink}
                        onChange={e => setCalendlyLink(e.target.value)}
                        disabled={isSavingCalendly}
                      />
                      <button className="btn btn-success" onClick={saveCalendlyLink} disabled={isSavingCalendly}>
                        {isSavingCalendly ? <span className="spinner-border spinner-border-sm"></span> : <i className="bi bi-check"></i>}
                      </button>
                      <button className="btn btn-secondary" onClick={() => setIsEditingCalendly(false)} disabled={isSavingCalendly}>
                        <i className="bi bi-x"></i>
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-between align-items-center">
                      <span>
                        {calendlyLink ? (
                          <a href={calendlyLink} target="_blank" rel="noopener noreferrer">{calendlyLink}</a>
                        ) : (
                          <span className="text-muted">Not set</span>
                        )}
                      </span>
                      <button className="btn btn-outline-primary btn-sm" onClick={() => setIsEditingCalendly(true)}>
                        <i className="bi bi-pencil me-1"></i> Edit
                      </button>
                    </div>
                  )}
                  {calendlyStatus && (
                    <div className={`alert alert-${calendlyStatus.type === 'success' ? 'success' : 'danger'} mt-2 py-1 mb-0`}>{calendlyStatus.message}</div>
                  )}
                </div>
              )}

              {/* Additional Info */}
              <div className="mt-4 p-3 bg-light rounded">
                <h6 className="text-muted">
                  <i className="bi bi-info-circle me-1"></i>
                  Profile Information
                </h6>
                <small className="text-muted">
                  Click the "Edit" button next to any field to update your information. 
                  All changes require confirmation before being saved.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Verification Modal */}
      {showPasswordModal && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-shield-lock text-warning me-2"></i>
                  Verify Current Password
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowPasswordModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Please enter your current password to proceed with password change:</p>
                <input
                  type="password"
                  className={`form-control ${validationErrors.currentPassword ? 'is-invalid' : ''}`}
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handlePasswordVerification()}
                />
                {validationErrors.currentPassword && (
                  <div className="invalid-feedback">
                    {validationErrors.currentPassword}
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowPasswordModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handlePasswordVerification}
                >
                  Verify & Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>
                  Confirm Action
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowConfirmModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>{confirmMessage}</p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowConfirmModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={() => {
                    if (confirmCallback) {
                      confirmCallback();
                    }
                    setShowConfirmModal(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage; 