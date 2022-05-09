o "* Request for authorization"
RESULT=`curl --insecure --data "client_id=admin-cli&username=admin&password=admin&grant_type=password" https://sso.mac.pl:8008/auth/realms/master/protocol/openid-connect/token`

echo "\n"
echo "* Recovery of the token"
TOKEN=`echo $RESULT | sed 's/.*access_token":"//g' | sed 's/".*//g'`

# echo "\n"
# echo "* Display token"
# echo $TOKEN

KO='a42911e9-b39f-4f56-99b5-d63f40c2a33c'
RMS='5e8a75f4-5d97-4240-b8cd-99da9414b581'
SIEC_1='6ae8e81c-13cc-4c92-9eab-47dff6012ae5'
SIEC_4_8='91e0de8b-855c-48e8-9261-58bf0877602d'
USERS='83cd1c95-9521-4d78-9598-0a057a93b9bf'
MARKETING='d6e6e95d-f7f0-47a3-81e2-570da6f63099'

while IFS=, read -r field1 field2 field3 field4
do
	#check groups
	# curl -v -X GET https://sso.mac.pl:8008/auth/admin/realms/MAC-realm/users/groups -H "Content-Type: application/json" -H "Authorization: bearer $TOKEN"

	#get all events
	# curl -v -X GET https://sso.mac.pl:8008/auth/admin/realms/MAC-realm/users/events -H "Content-Type: application/json" -H "Authorization: bearer $TOKEN"
	#
	  echo "\n"
	    echo " * user creation\n"
	        USER=`curl --insecure -v https://sso.mac.pl:8008/auth/admin/realms/MAC-realm/users?email=$field1 -H "Content-Type: application/json" -H "Authorization: bearer $TOKEN"`
		  ID=`echo $USER | sed 's/.*id":"//g' | sed 's/".*//g'`
		    echo "USER $USER"
	      done < data.csv

