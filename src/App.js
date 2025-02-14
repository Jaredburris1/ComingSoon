// App.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MatrixBackground from './Components/MatrixBackground'; // Adjust the path if needed
import EmailSender from './Components/EmailSender';
import Footer from './Components/Footer';

function App() {
  return (
    <div>
      <MatrixBackground />

      <Container 
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }} >
        
        <Row className="w-100">
          <Col md={{ span: 6, offset: 3 }} className="text-center">

            <h1 className="display-3 text-white">Wizness Professionals, Coming Soon</h1>
            <p className="lead text-white">
              Our website is under construction. Stay tuned, Add your email below for a notification on launch!
            </p>
          
            <EmailSender />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default App;