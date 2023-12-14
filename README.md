# CIS-427 Project 2

Designing and Prototyping a Smart Lock System using MQTT.

## Getting Started

### Prerequisites

This project consists of 3 sub-projects:

- Broker: An [Eclipse Mosquitto](https://mosquitto.org/) message broker that implements the MQTT protocol.
- Smart Lock: An MQTT-based IoT "device" client application.
- Controller: An Android MQTT "controller" client application.

#### The Broker

1.  First, Install [Docker](https://docs.docker.com/install/)
    and [Docker Compose](https://docs.docker.com/compose/install/)
1.  From a terminal, run the broker container:

        $ docker-compose up --build -d

1.  You can make a test connection to the broker by downloading and running
    [MQTTX](https://mqttx.app/downloads). Add a connection to host `mqtt://localhost`.
    Click "Connect"; a connection log should show in `./broker/log/mosquitto.log`.
