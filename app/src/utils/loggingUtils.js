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
      // console.log('TOKEN', this.decodeToken(keycloak.token));
      console.log('You are log in!');
      return authenticated;
    })
    .catch((error) => {
      console.error(error);
    });
};

export default login;
