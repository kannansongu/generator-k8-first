#!/bin/bash
sudo docker run --user nodeuser --name digital-service-banker-assignment-test-apiserver -p 3905:3905 --log-driver=splunk --log-opt splunk-token=e1c5e836-107d-4525-9a88-b1c49b5c1bd0 --log-opt splunk-url=https://SPLUNK-INDEX:8088 --log-opt splunk-insecureskipverify=true --log-opt splunk-format=json --log-opt tag="{{.Name}}: {{.ID}}" digital-service-banker-assignment-test-apiserver
