import {Box, MenuItem, Typography, UserDropdownMenu} from '@oxygen-ui/react';
import React, {useEffect, useState} from 'react';
import {FunctionComponent} from 'react';
import {MeAPIResponseInterface} from '../../models/me';
import {useConfig} from '../asgardeo-provider/asgardeo-context';
import {me} from '@asgardeo/ui-core';
import './user-button.scss';

const UserButton: FunctionComponent = () => {
  const [meInfo, setMeInfo] = useState<MeAPIResponseInterface>({} as MeAPIResponseInterface);
  const {config} = useConfig();

  useEffect(() => {
    me(config.baseUrl).then((response: MeAPIResponseInterface) => {
      setMeInfo(response);
    });
  }, []);

  return (
    <UserDropdownMenu
      className="asgardeo"
      triggerOptions={{
        children: (
          <div className="user-button-img-container">
            {meInfo.profileUrl && <img src={meInfo.profileUrl} alt="profile" />}
          </div>
        ),
      }}
    >
      <Box className="profile-info-box">
        {meInfo.name && meInfo.profileUrl ? (
          <>
            {meInfo.profileUrl && <img className="user-img" src={meInfo.profileUrl} alt="profile" />}
            <Typography className="profile-sub-title">{`${meInfo.name?.givenName ?? ''} ${meInfo.name?.familyName ?? ''}`}</Typography>
          </>
        ) : (
          <Typography className="profile-no-details">No profile details have been set with this account</Typography>
        )}
      </Box>
      <MenuItem>Profile</MenuItem>
      <MenuItem>Logout</MenuItem>
    </UserDropdownMenu>
  );
};

export default UserButton;
