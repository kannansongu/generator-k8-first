#!/bin/bash


sudo docker service create --read-only \
	--user nodeuser \
	--name digital-service-banker-assignment-test-apiserver --replicas 1 -p 3905:3905 \
	--network nextgennet1 \
	--log-driver=splunk \
	--log-opt splunk-token=e1c5e836-107d-4525-9a88-b1c49b5c1bd0 \
	--log-opt splunk-url=https://SPLUNK-INDEX:8088 \
	--log-opt splunk-insecureskipverify=true \
	--log-opt splunk-format=json \
	--log-opt tag="{{.Name}}: {{.ID}}" \
	--secret jwt_certificate \
	--secret symmetric_key \
	--secret digitalDBUsername \
	--secret digitalDBPassword \
	--secret digitalDB \
	--secret ping_host \
	--secret ping_client_id \
	--secret ping_client_secret \
	--secret ping_username \
	--secret ping_password \
        --secret sitecore_client_ping_client_id \
        --secret sitecore_client_ping_client_secret \
	--mount type=bind,src=/apps/ansible-container/build/microsvc/projects/configmaps/digital-service-banker-assignment-test,dst=/nodeapp/configmaps \
	--env FRB_SECRET_PATH=/run/secrets \
	--env FRB_CONFIGMAP_PATH=/nodeapp/configmaps \
	--env ENVIRONMENT=np1 \
	--health-cmd "curl http://localhost:3905/v1/liveStatus" --health-interval 60s --health-retries 3 --health-timeout 30s  \
	--mount type=tmpfs,destination=/tmp \
	--env HOME=/tmp digital-service-banker-assignment-test-apiserver \
