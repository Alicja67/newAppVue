### Scrpts
#### export DB from SSO
```sh
docker exec -it sso bash
```
```sh
keycloak/bin/standalone.sh -Dkeycloak.migration.action=export -Dkeycloak.migration.provider=singleFile -Dkeycloak.migration.file=keycloak-export.json -Djboss.http.port=8888 -Djboss.https.port=9999 -Djboss.management.http.port=7777
```
```sh
exit
```
```sh
sudo docker cp sso:/opt/jboss/keycloak-export.json ~/Projects/iron_ant(multibook_kl4_www)/keycloak/
```


#### copy file from
```sh
sudo docker cp sso:/opt/jboss/keycloak-export.json ~/Projects/iron_ant(multibook_kl4_www)/Keycloak/
```
#### copy file to
```sh
sudo docker cp  ~/Projects/iron_ant(multibook_kl4_www)/keycloak/keycloak-export.json sso:/opt/jboss/
```

#### import DB

```sh
# STEP 1
# local
sudo docker cp  ~/Projects/iron_ant(multibook_kl4_www)/keycloak/keycloak-export.json sso:/opt/jboss/
# server
sudo docker cp  /opt/ia_container/iron_ant(multibook_kl4_www)/Keycloak/keycloak-export.json sso:/opt/jboss/
```
```sh
# STEP 2
docker exec -it sso bash
```
```sh
# STEP 3
keycloak/bin/standalone.sh -Dkeycloak.migration.action=import -Dkeycloak.migration.provider=singleFile -Dkeycloak.migration.file=/opt/jboss/keycloak-export-local.json -Dkeycloak.migration.strategy=OVERWRITE_EXISTING -Djboss.http.port=8888 -Djboss.https.port=9999 -Djboss.management.http.port=7777
```
```sh
exit
```

#### remove all docker volume except sso
```sh
docker volume ls | grep -v -e "aplikacja-dyrektora" | awk '//{print $2}' | xargs -I % sh -c 'docker volume rm %'
docker volume ls | grep -v -e "iron-ant_postgres_data" | awk '//{print $2}' | xargs -I % sh -c 'docker volume rm %'
docker volume ls | grep -v -e "iron-ant" | awk '//{print $2}' | xargs -I % sh -c 'docker volume rm %'
# remove all volume except aplikacja-dyrektora and iron-ant project
docker volume ls | grep -v  -E "iron-ant|aplikacja-dyrektora" | awk '//{print $2}' | xargs -I % sh -c 'docker volume rm %'
```
