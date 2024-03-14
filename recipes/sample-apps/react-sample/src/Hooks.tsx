import { useAuthentication } from "@asgardeo/react-ui";
//import { useAuthentication } from "../../../../packages/react/src/components/asgardeo-provider/asgardeo-context.ts";

import React from "react";

export function Hooks(): React.ReactElement {
  const { accessToken, isAuthenticated } = useAuthentication();

  return (
    <div style={{ margin: "2rem" }}>
      <div style={{ fontSize: "2rem" }}>Custom Hooks Available</div>
      <div style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        1. useAuthentication()
      </div>
      <div style={{ fontSize: "1rem" }}>
        <b>Access Token:</b> {accessToken ?? "..."}
      </div>
      <div style={{ fontSize: "1rem", marginTop: "12px" }}>
        <b>Is Authenticated:</b> {isAuthenticated?.toString() ?? "..."}
      </div>
    </div>
  );
}
