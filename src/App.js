// App.js
import React from 'react';
import MatrixBackground from './Components/MatrixBackground'; // Adjust the path if needed
import EmailSender from './Components/EmailSender';
import Footer from './Components/Footer';
import './App.css'; // Import your global CSS file

function App() {
  return (
    <div>
      <MatrixBackground />

      {/* Container with flex centering and full viewport height */}
      <div className="container flex-center min-vh-100">
        <div className="row w-100">
          <div className="col centered text-center">
            <h1 className="display-3 text-white">
              Wizness Professionals, Coming Soon
            </h1>
            <p className="lead text-white">
              Our website is under construction. Stay tuned—add your email below for a notification on launch!
            </p>
            <EmailSender />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
