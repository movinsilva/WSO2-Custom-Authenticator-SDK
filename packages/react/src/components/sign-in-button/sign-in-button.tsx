import {Box, Button, CircularProgress} from '@oxygen-ui/react';
import React, {useState} from 'react';
import SignInBox from '../sign-in/sign-in-box/sign-in-box';
import './sign-in-button.scss';

const SignInButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="asgardeo" style={{padding: '2rem'}}>
      <Button className="ui button primary" onClick={openModal}>
        Sign In
      </Button>

      {modalVisible && (
        <Box className="popup-box">{isLoading ? <CircularProgress /> : <SignInBox setIsLoading={setIsLoading} />}</Box>
      )}

      {modalVisible && <Box className="popup-box-overlay" onClick={closeModal} />}
    </div>
  );
};

export default SignInButton;
