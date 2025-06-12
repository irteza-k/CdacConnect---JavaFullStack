import React from 'react';

const AboutPage = () => (
  <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-md-10 col-lg-9">
        <div className="card shadow mb-4 border-0" style={{ borderRadius: 20 }}>
          <div className="card-body p-5">
            <h1 className="mb-4 fw-bold text-primary" style={{ fontSize: '2.5rem' }}>
              <i className="bi bi-info-circle me-2"></i>About CDAC Connect
            </h1>
            <p className="lead mb-4" style={{ fontWeight: 400 }}>
              Welcome to <strong>CDAC Connect</strong> – a platform created exclusively for CDAC students to connect with alumni who are now thriving in top companies. 🚀 Our goal is to bridge the gap between aspiring learners and experienced professionals, fostering a community driven by mentorship and mutual growth.
            </p>
            <p className="mb-4">
              With CDAC Connect, students can explore alumni profiles based on domain expertise, industry experience, and current roles. Whether you're seeking career guidance, industry insights, or personalized mentorship, you can easily book one-on-one sessions with those who've walked the same path. 🎯
            </p>
            <p className="mb-5">
              For CDAC alumni, this is a meaningful opportunity to give back, share valuable knowledge, build your personal brand, and inspire the next generation of tech professionals. 🤝 Join us in creating a vibrant and supportive CDAC ecosystem where learning never stops! 🌱
            </p>
            <div className="text-center mb-4">
              <h2 className="made-with-love fw-bold mb-3" style={{ fontSize: '2rem', letterSpacing: 1, display: 'inline-block' }}>
                Made&nbsp;with&nbsp;<span role="img" aria-label="heart" style={{ color: '#e25555', fontSize: '2.2rem', verticalAlign: 'middle' }}>❤️</span>
              </h2>
            </div>
            <div className="developer-profiles d-flex flex-wrap justify-content-center gap-4 mt-4">
              <div className="developer-card text-center p-3 bg-light border-0 shadow-sm" style={{ borderRadius: 16, minWidth: 180, transition: 'transform 0.2s', cursor: 'pointer' }}>
                <div className="developer-photo mb-2 mx-auto" style={{width: 70, height: 70, borderRadius: '50%', background: 'linear-gradient(135deg, #e9ecef 60%, #b3c6e7 100%)', boxShadow: '0 2px 8px rgba(0,0,0,0.07)'}} />
                <p className="developer-name mb-0 fw-semibold mt-2">Atharv Pawar</p>
                <p className="text-muted mb-0" style={{fontSize: '0.98rem'}}>Backend - FrontEnd</p>
              </div>
              <div className="developer-card text-center p-3 bg-light border-0 shadow-sm" style={{ borderRadius: 16, minWidth: 180, transition: 'transform 0.2s', cursor: 'pointer' }}>
                <div className="developer-photo mb-2 mx-auto" style={{width: 70, height: 70, borderRadius: '50%', background: 'linear-gradient(135deg, #e9ecef 60%, #b3c6e7 100%)', boxShadow: '0 2px 8px rgba(0,0,0,0.07)'}} />
                <p className="developer-name mb-0 fw-semibold mt-2">Irteza Zafeer Khan</p>
                <p className="text-muted mb-0" style={{fontSize: '0.98rem'}}>FrontEnd - Backend</p>
              </div>
              <div className="developer-card text-center p-3 bg-light border-0 shadow-sm" style={{ borderRadius: 16, minWidth: 180, transition: 'transform 0.2s', cursor: 'pointer' }}>
                <div className="developer-photo mb-2 mx-auto" style={{width: 70, height: 70, borderRadius: '50%', background: 'linear-gradient(135deg, #e9ecef 60%, #b3c6e7 100%)', boxShadow: '0 2px 8px rgba(0,0,0,0.07)'}} />
                <p className="developer-name mb-0 fw-semibold mt-2">Yuganshu Joshi</p>
                <p className="text-muted mb-0" style={{fontSize: '0.98rem'}}>Database - UI/UX</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage; 