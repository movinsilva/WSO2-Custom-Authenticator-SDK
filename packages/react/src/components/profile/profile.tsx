/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { Box, Container, Typography } from "@oxygen-ui/react";
import { UserIcon } from "@oxygen-ui/react-icons";
import React, { FunctionComponent } from "react";
import { useAuthentication } from "../asgardeo-provider/asgardeo-context";
import "./profile.scss";

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
  const { user } = useAuthentication();

  if (user) {
    return (
      <Box className="profile-component-box asgardeo">
        <Box className="identifier-box">
          <UserIcon className="profile-icon" verticalAlign="middle" size={12} />
          <Typography className="profile-sub-title">Account</Typography>
        </Box>
        <Typography variant="h3" className="profile-title">
          Account
        </Typography>
        <Typography variant="h5" className="profile-sub-title">
          View your account details
        </Typography>

        <Typography variant="h5" className="profile-title-1">
          Profile
        </Typography>
        <Container className="title-underline" />

        <Box className="profile-info-box">
          {user.name || user.profileUrl ? (
            <>
              {user.profileUrl ? (
                <img src={user.profileUrl} alt="profile" />
              ) : user.photos ? (
                <img
                  src={user.photos[0].value}
                  referrerPolicy="no-referrer"
                  alt="federated-login"
                />
              ) : null}
              <Typography className="profile-sub-title">{`${
                user.name?.givenName ?? ""
              } ${user.name?.familyName ?? ""}`}</Typography>
            </>
          ) : (
            <Typography className="profile-no-details">
              No profile details have been set with this account
            </Typography>
          )}
        </Box>

        <Typography variant="h5" className="profile-title-1">
          Username
        </Typography>
        <Container className="title-underline" />
        <Typography className="profile-sub-title">{user.userName}</Typography>

        <Typography variant="h5" className="profile-title-1">
          Email Addresses
        </Typography>
        <Container className="title-underline" />
        {user.emails ? (
          <Typography className="profile-sub-title">
            {user.emails[0]}
          </Typography>
        ) : (
          <Typography className="profile-no-details">
            No email addresses have been set with this account
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Typography className="profile-sub-title">
      No profile information available
    </Typography>
  );
};

export default Profile;
