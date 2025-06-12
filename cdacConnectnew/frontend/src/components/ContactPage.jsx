import React, { useState } from 'react';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ type: 'success', message: 'Thank you for reaching out! We will get back to you soon.' });
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7">
          <div className="card shadow border-0" style={{ borderRadius: 20 }}>
            <div className="card-body p-5">
              <h2 className="mb-4 text-info fw-bold">
                <i className="bi bi-envelope-at me-2"></i>Contact Us
              </h2>
              <p className="mb-4 lead">We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, fill out the form below or email us directly.</p>
              <div className="mb-4">
                <i className="bi bi-envelope-fill me-2 text-primary"></i>
                <strong>Email:</strong> <a href="mailto:support@cdacconnect.com">support@cdacconnect.com</a>
              </div>
              <form onSubmit={handleSubmit} className="mb-3">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold">Name</label>
                  <input type="text" className="form-control" id="name" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">Email</label>
                  <input type="email" className="form-control" id="email" name="email" value={form.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label fw-semibold">Message</label>
                  <textarea className="form-control" id="message" name="message" rows="4" value={form.message} onChange={handleChange} required></textarea>
                </div>
                <button type="submit" className="btn btn-info px-4 fw-bold">
                  <i className="bi bi-send me-1"></i>Send Message
                </button>
              </form>
              {status && (
                <div className={`alert alert-${status.type === 'success' ? 'success' : 'danger'} mt-3`}>
                  {status.message}
                </div>
              )}
              <div className="mt-4 text-center text-muted">
                <i className="bi bi-people-fill me-2"></i>
                <span>Thank you for helping us build a stronger CDAC community!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 