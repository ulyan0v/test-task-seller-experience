import React from 'react';
import Routes from './components/Routes';
import Popup from './components/Popup';
import Loader from './components/Loader';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './App.css';


const App = () => {
  return (
    <Container>
      <Row>
        <Routes />
        <Loader />
        <Popup />
      </Row>
    </Container>
  );
}

export default App;
