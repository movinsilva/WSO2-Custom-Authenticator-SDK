import React, {FunctionComponent, PropsWithChildren} from 'react';
import {useAuthentication} from '../asgardeo-provider/asgardeo-context';
import {SignedPropsInterface} from '../../models/auth';

/**
 * This component shows the child component only if the user is authenticated.
 * Otherwise, it shows the placeholder.
 *
 * @component
 * @param {SignedInPropsInterface} props The props of the component
 * @returns {ReactElement} The authenticated component.
 * @example
 * ```tsx
 * <SignedIn fallback={<div>Not authenticated</div>}>
 *  <div>Authenticated</div>
 * </SignedIn>
 * ```
 */
const SignedIn: FunctionComponent<PropsWithChildren<SignedPropsInterface>> = (
  props: PropsWithChildren<SignedPropsInterface>,
) => {
  const {fallback, children} = props;
  const {isAuthenticated} = useAuthentication();

  return <>{isAuthenticated ? children : fallback ?? null}</>;
};

export default SignedIn;
