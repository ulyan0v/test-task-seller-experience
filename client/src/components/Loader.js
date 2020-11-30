import React from 'react';
import {connect} from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

const Loader = ({isLoading}) => {
  return (
    <Modal
      show={isLoading}
      keyboard={false}
      className='d-flex justify-content-center align-items-center'
      dialogAs={() => (
        <Spinner animation="grow" variant="light" />
      )}
    />
  );
}

const mapStateToProps = state => {
  return {
    isLoading: state.main.isLoading
  };
}

export default connect(mapStateToProps)(Loader);