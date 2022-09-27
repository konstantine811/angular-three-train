export const APP_ROUTES = {
  dashboard: {
    name: 'dashboard',
    children: {
      portfolio: 'portfolio',
      map: 'map',
      uiTest: 'ui-test',
    },
  },
  auth: {
    name: 'auth',
    children: {
      signUp: 'sign-up',
      signIn: 'sign-in',
      verifyEmail: 'verify-email',
      forgotPassword: 'forgot-password',
    },
  },
};
