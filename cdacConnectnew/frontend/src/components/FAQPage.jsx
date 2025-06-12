import React from 'react';

const faqData = [
  {
    question: "What is CDAC Connect?",
    answer: "CDAC Connect is a mentorship platform that allows current CDAC students to connect with alumni working in top companies for one-on-one guidance and career support."
  },
  {
    question: "How do I book a session with an alumni expert?",
    answer: "When you sign up and select a mentor, your request and question are sent to the mentor. If they approve it, you can schedule a meeting based on the mentor's availability."
  },
  {
    question: "Is there any cost involved in booking a session?",
    answer: "No, booking a session is completely free."
  },
  {
    question: "Can I reschedule or cancel a session?",
    answer: "Yes, you can manage your sessions from your dashboard. Rescheduling and cancellation depend on the expert's policies, which are shown during the booking process."
  },
  {
    question: "Who can use CDAC Connect?",
    answer: "Current CDAC students seeking guidance and CDAC alumni willing to mentor can use the platform."
  },
  {
    question: "How do I become an expert on CDAC Connect?",
    answer: "If you're a CDAC alumnus working in the industry, you can sign up as a mentor. Complete your profile and set your availability to start mentoring students."
  },
  {
    question: "Is CDAC Connect affiliated with the CDAC Institute?",
    answer: "No, CDAC Connect is an independent platform created by CDAC enthusiasts to support student-alumni mentoring. It is not officially affiliated with CDAC."
  },
  {
    question: "What kind of help can I expect from alumni?",
    answer: "You can receive help with interview preparation, resume reviews, project guidance, career advice, and insights into industry roles and expectations."
  }
];

const FAQPage = () => (
  <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow mb-4">
          <div className="card-body">
            <h2 className="mb-4 text-success"><i className="bi bi-question-circle me-2"></i>Frequently Asked Questions</h2>
            <div className="accordion" id="faqAccordion">
              {faqData.map((faq, idx) => (
                <div className="accordion-item" key={idx}>
                  <h2 className="accordion-header" id={`heading${idx}`}>
                    <button className={`accordion-button${idx !== 0 ? ' collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${idx}`} aria-expanded={idx === 0 ? 'true' : 'false'} aria-controls={`collapse${idx}`}>
                      {faq.question}
                    </button>
                  </h2>
                  <div id={`collapse${idx}`} className={`accordion-collapse collapse${idx === 0 ? ' show' : ''}`} aria-labelledby={`heading${idx}`} data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FAQPage; 