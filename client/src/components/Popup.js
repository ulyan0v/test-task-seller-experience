import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {hideMessage} from '../redux/reducers/main';
import config from '../config';
import Alert from 'react-bootstrap/Alert';


const Popup = props => {
  const {type, messageText, hideMessage, showMessage} = props;

  useEffect(() => {
    const closePopup = setTimeout(() => {
      if (showMessage) hideMessage();
    }, config.popupDisplayTime);

    return () => clearTimeout(closePopup);
  }, [showMessage, hideMessage]);

  const handleClose = () => {
    hideMessage();
  }

  if (!showMessage) return null;

  return (
    <div className='fixed-top d-flex justify-content-center p-4'>
      <Alert variant={type} className='alert-dismissible'>
        <button
          type='button'
          className='close'
          onClick={handleClose}
        >
          &times;
        </button>
        {messageText}
      </Alert>
    </div>
  );
}

const mapStateToProps = state => {
  return {...state.main.popup};
}

const mapDispatchToProps = {
  hideMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(Popup);