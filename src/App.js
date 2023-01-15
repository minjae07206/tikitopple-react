import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import './App.css';
import {Navbar, Container, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Game from './components/Game.js';
import io from 'socket.io-client';
function App() {
  return (
    <div className="App">
     <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Game></Game>
    </div>
  );
}

export default App;
