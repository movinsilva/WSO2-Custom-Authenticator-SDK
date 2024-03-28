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

import { Box, MenuItem, Typography, UserDropdownMenu } from "@oxygen-ui/react";
import React, { FunctionComponent } from "react";
import { useAuthentication } from "../asgardeo-provider/asgardeo-context";
import "./user-button.scss";
import { UserIcon } from "@oxygen-ui/react-icons";

const UserButton: FunctionComponent = () => {
  const { signOut, user } = useAuthentication();

  return (
    <UserDropdownMenu
      className="asgardeo user-button"
      triggerOptions={{
        children: (
          <div className="user-button-img-container">
            {user ? (
              user.profileUrl ? (
                <img src={user.profileUrl} alt="profile" />
              ) : user.photos ? (
                <img
                  src={user.photos[0].value}
                  referrerPolicy="no-referrer"
                  alt="federated-login"
                />
              ) : (
                <div className="default-profile-icon-container">
                  <UserIcon
                    className="profile-icon"
                    size={28}
                    verticalAlign="middle"
                  />
                </div>
              )
            ) : null}
          </div>
        ),
      }}
    >
      {user && (
        <Box className="profile-info-box">
          {user.name || user.profileUrl ? (
            <div className="profile-detail-section">
              {user.profileUrl ? (
                <img src={user.profileUrl} alt="profile" className="user-img" />
              ) : user.photos ? (
                <img
                  src={user.photos[0].value}
                  referrerPolicy="no-referrer"
                  alt="federated-login"
                  className="user-img"
                />
              ) : null}
              <Typography className="profile-sub-title">{`${
                user.name?.givenName ?? ""
              } ${user.name?.familyName ?? ""}`}</Typography>
            </div>
          ) : (
            <Typography className="profile-no-details">
              No profile details have been set with this account
            </Typography>
          )}
        </Box>
      )}
      <div className="menu-item-container">
        <MenuItem>Manage Account</MenuItem>
        <MenuItem onClick={signOut}>Sign Out</MenuItem>
      </div>
    </UserDropdownMenu>
  );
};

export default UserButton;
