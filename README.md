# CIS-427 Project 2

Designing and Prototyping a Smart Lock System using MQTT.

## Getting Started

This project consists of 3 sub-projects:

- **Broker**: An [Eclipse Mosquitto](https://mosquitto.org/) message broker that implements the MQTT
  protocol.
- **Controller**: An Android MQTT "controller" client application.
- **Smart Lock**: An MQTT-based IoT "device" client application.


### Broker

1.  First, Install [Docker](https://docs.docker.com/install/)
    and [Docker Compose](https://docs.docker.com/compose/install/)
1.  From a terminal, run the broker container:

        $ docker-compose up --build -d

It will be running at [ws://localhost:1883](ws://localhost:1883) -- the development username and password are `cis427` and `GoBlue!`.

### Smart Lock

The smart lock application is a Node.js / React / Next.js MQTT client app. It simulates an IoT
smart device that connects to the Mosquitto broker.

The easiest way to install Node.js is with [NVM](https://github.com/nvm-sh/nvm):

- On Linux & macOS: https://github.com/nvm-sh/nvm#installing-and-updating
- On Windows: https://github.com/coreybutler/nvm-windows#installation--upgrades
  (_IMPORTANT:_ [run installer as Administrator](https://stackoverflow.com/questions/50563188/access-denied-issue-with-nvm-in-windows-10))

Once you have installed NVM, open a terminal and run:

```bash
nvm install 20
corepack enable
pnpm dev
```

Go to [http://localhost:3000](http://localhost:3000) to see the Smart Lock UI in a web browser.

### Controller

The controller interface is an Android app. Follow the [Android build steps](https://developer.android.com/build)
to run it.

If you need a controller for development or testing and do not want to run Android, you can
download and run [MQTTX](https://mqttx.app/downloads). From the MQTTX interface, add a connection
to host `ws://localhost:1883`, then click "Connect". Now you can send and receive messages with the
broker.
