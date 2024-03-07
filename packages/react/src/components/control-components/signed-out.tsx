import React, {FunctionComponent, PropsWithChildren} from 'react';
import {useAuthentication} from '../asgardeo-provider/asgardeo-context';
import {SignedPropsInterface} from '../../models/auth';

/**
 * This component shows the child component only if the user is not authenticated.
 *
 * @component
 * @param {SignedOutPropsInterface} props The props of the component
 * @returns {ReactElement} The authenticated component.
 * @example
 * ```tsx
 * <SignedOut fallback={<div>Authenticated</div>}>
 * <div>Not authenticated</div>
 * </SignedOut>
 * ```
 */
const SignedOut: FunctionComponent<PropsWithChildren<SignedPropsInterface>> = (
  props: PropsWithChildren<SignedPropsInterface>,
) => {
  const {fallback, children} = props;
  const {isAuthenticated} = useAuthentication();

  return <>{!isAuthenticated ? children : fallback ?? null}</>;
};

export default SignedOut;
