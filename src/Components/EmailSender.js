// EmailSender.js
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Form, Button } from 'react-bootstrap';

const EmailSender = () => {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    // Set up your template parameters (customize as needed)
    const templateParams = {
      message: email,
    };

    // Replace the placeholders below with your actual EmailJS keys
    emailjs.send(
      'service_qm7h6mj',    // e.g., "service_xxx"
      'template_92embj8',   // e.g., "template_xxx"
      templateParams,
      '9hgv2kZ3kfElWDGVD'        // e.g., "user_xxx" (or your public key)
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setStatusMessage('Thank you! We will notify you soon.');
      setEmail(''); // Clear the email input
    })
    .catch((err) => {
      console.error('FAILED...', err);
      setStatusMessage('Failed to send email. Please try again later.');
    });
  };

  return (
    <div>
      <Form onSubmit={sendEmail} className="d-flex justify-content-center mt-4">
        <Form.Control
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ maxWidth: '300px', marginRight: '10px' }}
        />
        <Button variant="light" type="submit">
          Notify Me
        </Button>
      </Form>
      {statusMessage && (
        <p className="mt-3 text-white text-center">
          {statusMessage}
        </p>
      )}
    </div>
  );
};

export default EmailSender;
