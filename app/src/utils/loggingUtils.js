import Keycloak from 'keycloak-js';

const login = () => {
  var keycloak = Keycloak({
    realm: `spacer`,
    url: `https://spacer-magic.mac.pl:8080/auth`,
    clientId: `spacer`,
    'ssl-required': 'all',
    resource: `spacer`,
    'public-client': true,
    'confidential-port': 0,
  });

  keycloak
    .init({
      // flow: 'implicit',
      promiseType: 'native',
      onLoad: 'login-required',
    })
    .then((authenticated) => {
      console.log(JSON.stringify(keycloak.tokenParsed));
      const authenticatedUser = keycloak.idTokenParsed.name;
      const id = keycloak.idTokenParsed.jti;
      const email = keycloak.idTokenParsed.email;
      console.log('id', id);
      console.log('authenticatedUser', authenticatedUser);
      console.log('email', email);
      console.log('You are log in!');
      console.log('authenticated', authenticated);
      return authenticated;
    })
    .catch((error) => {
      console.error(error);
    });
  keycloak.onTokenExpired = () => {
    keycloak
      .updateToken(30)
      .then((refreshed) => {
        if (refreshed) {
          // this.$store.commit("TOKEN_SET", keycloak.token);
        } else {
          console.log('Token is still valid');
        }
      })
      .catch((error) => {
        console.log('CATCH?! ');
        console.error(error);
      });
  };
};

export default login;
