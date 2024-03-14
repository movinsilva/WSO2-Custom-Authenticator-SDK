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

import { me } from "@asgardeo/ui-core";
import { Box, MenuItem, Typography, UserDropdownMenu } from "@oxygen-ui/react";
import React, { useEffect, useState, FunctionComponent } from "react";
import { MeAPIResponseInterface } from "../../models/me";
import {
  useAuthentication,
  useConfig,
} from "../asgardeo-provider/asgardeo-context";
import "./user-button.scss";

const UserButton: FunctionComponent = () => {
  const [meInfo, setMeInfo] = useState<MeAPIResponseInterface>(
    {} as MeAPIResponseInterface
  );
  const { config } = useConfig();

  useEffect(() => {
    me(config.baseUrl).then((response: MeAPIResponseInterface) => {
      setMeInfo(response);
    });
  }, []);

  return (
    <UserDropdownMenu
      className="asgardeo user-button"
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
          <div className="profile-detail-section">
            {meInfo.profileUrl && (
              <img className="user-img" src={meInfo.profileUrl} alt="profile" />
            )}
            <Typography className="profile-sub-title">{`${
              meInfo.name?.givenName ?? ""
            } ${meInfo.name?.familyName ?? ""}`}</Typography>
          </div>
        ) : (
          <Typography className="profile-no-details">
            No profile details have been set with this account
          </Typography>
        )}
      </Box>
      <div className="menu-item-container">
        <MenuItem>Manage Account</MenuItem>
        <MenuItem>Sign Out</MenuItem>
      </div>
    </UserDropdownMenu>
  );
};

export default UserButton;
