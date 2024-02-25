import React, { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import { useAuthentication } from '../asgardeo-provider/asgardeo-provider';

/**
 * Prop types of the Authenticated component.
 */
interface AuthenticatedComponentPropsInterface {
  fallback?: ReactNode;
}

/**
 * This component shows the child component only if the user is authenticated. Otherwise, it shows the placeholder.
 *
 * @param {AuthenticatedComponentPropsInterface} props The props of the component
 * @returns {ReactElement} The authenticated component.
 */
export const AuthenticatedComponent: FunctionComponent<PropsWithChildren<AuthenticatedComponentPropsInterface>> = (
  props: PropsWithChildren<AuthenticatedComponentPropsInterface>,
) => {
  const { fallback, children } = props;
  const isAuthenticated = useAuthentication();

  return (
    <>
      {' '}
      { isAuthenticated ? children : fallback ?? null }
      {' '}
    </>
  );
};
