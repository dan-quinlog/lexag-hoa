import { Amplify } from 'aws-amplify';

// Configure Amplify with your Cognito settings
const authConfig = {
  Auth: {
    Cognito: {
      region: import.meta.env.VITE_AWS_REGION,
      userPoolId: import.meta.env.VITE_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
    }
  }
};

Amplify.configure(authConfig);

export { authConfig };
