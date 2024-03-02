import { Button } from '@oxygen-ui/react';
import React, { useState } from 'react';
import SignInBox from '../sign-in-box/sign-in-box';

const SignInButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  console.log('modal visible: ', modalVisible);

  return (
    <div className="asgardeo" style={{ padding: '2rem' }}>
      <Button className="ui button primary" onClick={openModal}>
        Sign In
      </Button>

      {modalVisible && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
          }}
        >
          <SignInBox />
        </div>
      )}

      {modalVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 100,
          }}
          onClick={closeModal}
        />
      )}
    </div>
  );
};

export default SignInButton;
