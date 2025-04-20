import React from 'react';

const FAQPage: React.FC = () => {
  const faqs = [
    {
      question: 'What is the Alumni Network?',
      answer: 'The Alumni Network is a platform that connects alumni and students for mentorship, career opportunities, and knowledge sharing.',
    },
    {
      question: 'How can I join the Mentorship Program?',
      answer: 'You can join the Mentorship Program by navigating to the Mentorship page and submitting a request to connect with a mentor or mentee.',
    },
    {
      question: 'How do I post a job or internship?',
      answer: 'To post a job or internship, go to the Post Job page and fill out the required details.',
    },
    {
      question: 'Who can access the Alumni Directory?',
      answer: 'The Alumni Directory is accessible to registered users of the platform, including alumni and students.',
    },
    {
      question: 'How can I contact support?',
      answer: 'You can contact support by visiting the Support page or emailing us at info@alumninetwork.edu.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-900">{faq.question}</h2>
            <p className="text-gray-600 mt-2">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;