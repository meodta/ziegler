import React, { useEffect }  from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export const LoginScreen = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0()

  useEffect(() => {
    if (isAuthenticated) {
      console.log('is authenticated. now checking if has enough permissions');
    }
  }, [ isAuthenticated ]);

  // if (

  // TODO: Error screen
  return null;
};
