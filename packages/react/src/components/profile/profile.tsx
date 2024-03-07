import {Box, Container, Typography} from '@oxygen-ui/react';
import {UserIcon} from '@oxygen-ui/react-icons';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {me} from 'asgardeo-core';
import {useConfig} from '../asgardeo-provider/asgardeo-context';
import './profile.scss';
import {MeAPIResponseInterface} from '../../models/me';

/**
 * Profile component to display user profile information.
 *
 * @component
 * @returns {ReactElement} The Profile component
 * @example
 * ```tsx
 * <Profile />
 * ```
 */
const Profile: FunctionComponent = () => {
  const [meInfo, setMeInfo] = useState<MeAPIResponseInterface>({} as MeAPIResponseInterface);
  const {config} = useConfig();

  useEffect(() => {
    me(config.baseUrl).then((response: MeAPIResponseInterface) => {
      setMeInfo(response);
    });
  }, []);

  if (Object.keys(meInfo).length) {
    return (
      <Box className="profile-component-box asgardeo">
        <Box className="identifier-box">
          <UserIcon className="profile-icon" verticalAlign="middle" />
          <Typography className="profile-sub-title">Account</Typography>
        </Box>
        <Typography variant="h3" className="profile-title">
          Account
        </Typography>
        <Typography variant="h5" className="profile-sub-title">
          Manage your account settings
        </Typography>

        <Typography variant="h5" className="profile-title-1">
          Profile
        </Typography>
        <Container className="title-underline" />

        <Box className="profile-info-box">
          {meInfo.name && meInfo.profileUrl ? (
            <>
              {meInfo.profileUrl && <img src={meInfo.profileUrl} alt="profile" />}
              <Typography className="profile-sub-title">{`${meInfo.name?.givenName ?? ''} ${meInfo.name?.familyName ?? ''}`}</Typography>
            </>
          ) : (
            <Typography className="profile-no-details">No profile details have been set with this account</Typography>
          )}
        </Box>

        <Typography variant="h5" className="profile-title-1">
          Username
        </Typography>
        <Container className="title-underline" />
        <Typography className="profile-sub-title">{meInfo.userName}</Typography>

        <Typography variant="h5" className="profile-title-1">
          Email Addresses
        </Typography>
        <Container className="title-underline" />
        {meInfo.emails ? (
          <Typography className="profile-sub-title">{meInfo.emails[0]}</Typography>
        ) : (
          <Typography className="profile-no-details">No email addresses have been set with this account</Typography>
        )}
      </Box>
    );
  }

  return <Typography className="profile-sub-title">No profile information available</Typography>;
};

export default Profile;
