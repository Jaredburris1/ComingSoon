// App.tsx
import React, { useRef, useEffect, useState, FormEvent } from 'react';
import emailjs from 'emailjs-com';

// MatrixBackground Component
const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%';
    const chars = matrixChars.split('');
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#073DE8'; //Blue Lettering Falling
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(text, x, y);
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const intervalId = setInterval(draw, 33);
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};

// EmailSender Component using EmailJS
const EmailSender: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Replace these with your actual EmailJS credentials
    const serviceID = 'service_qm7h6mj';
    const templateID = 'template_92embj8';
    const userID = '9hgv2kZ3kfElWDGVD';

    const templateParams = {
      user_email: email,
    };

    emailjs
      .send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatusMessage('Thank you! We will notify you soon.');
        setEmail('');
      })
      .catch((error) => {
        console.error('FAILED...', error);
        setStatusMessage('An error occurred. Please try again later.');
      });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '1rem',
        }}
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            maxWidth: '300px',
            marginRight: '10px',
            padding: '0.5rem',
          }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Notify Me
        </button>
      </form>
      {statusMessage && (
        <p style={{ marginTop: '1rem', textAlign: 'center', color: '#fff' }}>
          {statusMessage}
        </p>
      )}
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <div>
      <MatrixBackground />
      <div
        style={{
          minHeight: '100vh',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          textAlign: 'center',
          padding: '0 15px',
        }}
      >
        <h1
          style={{
            fontSize: '3.75rem',
            fontWeight: 300,
            lineHeight: 1.2,
            marginBottom: '0.5rem',
          }}
        >
          Wizness Professionals, Coming Soon
        </h1>
        <p
          style={{
            fontSize: '1.25rem',
            fontWeight: 300,
            marginBottom: '1rem',
          }}
        >
          Our website is under construction. Stay tuned—add your email below for a
          notification on launch!
        </p>
        <EmailSender />
      </div>
      <footer
        style={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '10px 0',
          textAlign: 'center',
          color: '#fff',
          zIndex: 2,
        }}
      >
        <small>
          &copy; {new Date().getFullYear()} Wizness Professionals. All rights
          reserved.
        </small>
      </footer>
    </div>
  );
};

export default App;
