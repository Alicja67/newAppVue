const logOut = () => {
  const KEYCLOAK = 'spacer-magic.mac.pl:8080';
  const MY_REALM = 'spacer';
  const REDIRECT_URI = 'https://spacer-magic.mac.pl:8081';
  const URL = `https://${KEYCLOAK}/auth/realms/${MY_REALM}/protocol/openid-connect/logout?redirect_uri=${REDIRECT_URI}`;
  console.log('You are logged out');
  window.location.replace(URL);
};

export default logOut;
