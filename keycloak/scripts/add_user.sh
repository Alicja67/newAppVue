#!/bin/bash

echo "* Request for authorization"
RESULT=`curl --data "client_id=admin-cli&username=admin&password=admin&grant_type=password" https://sso.mac.pl:8008/auth/realms/master/protocol/openid-connect/token`

echo "\n"
echo "* Recovery of the token"
TOKEN=`echo $RESULT | sed 's/.*access_token":"//g' | sed 's/".*//g'`

echo "\n"
echo "* Display token"
echo $TOKEN

echo "\n"
echo " * user creation\n"
curl -v https://sso.mac.pl:8008/auth/admin/realms/MAC-realm/users -H "Content-Type: application/json" -H "Authorization: bearer $TOKEN"   --data '{"username" : "test2", "enabled": true, "email" : "test2@test.com", "firstName": "Bill", "lastName": "Burke","credentials" : [{ "type" : "password", "value" : "test2" ,"temporary":true} ],"realmRoles": [ "user", "offline_access"  ], "clientRoles": {"account": ["manage-account" ] } }'
# curl -X GET -H "Accept: application/json" -H "Authorization: bearer $TOKEN" https://sso.mac.pl:8008/auth/admin/realms/MAC-realm/users/count
