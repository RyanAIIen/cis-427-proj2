import { useEffect, useState } from 'react';
import mqtt, {
  IClientOptions,
  IClientPublishOptions,
  IClientSubscribeOptions,
  MqttClient,
} from 'mqtt';

export const MQTTConnection = () => {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [payload, setPayload] = useState({});
  const [connectionStatus, setConnectionStatus] = useState('');

  // https://github.com/mqttjs/MQTT.js#mqttconnecturl-options
  const mqttConnect = (host: string, options: IClientOptions) => {
    setConnectionStatus('Connecting...');
    setClient(mqtt.connect(host, options));
  };

  useEffect(() => {
    if (client) {
      // https://github.com/mqttjs/MQTT.js#event-connect
      client.on('connect', () => {
        setConnectionStatus('Connected');
        console.log('Connection successful');
      });

      // https://github.com/mqttjs/MQTT.js#event-error
      client.on('error', (error) => {
        console.error('Connection error: ', error);
        client.end();
      });

      // https://github.com/mqttjs/MQTT.js#event-reconnect
      client.on('reconnect', () => {
        setConnectionStatus('Reconnecting...');
      });

      // https://github.com/mqttjs/MQTT.js#event-message
      client.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() };
        setPayload(payload);
        console.log(`Received message '${message}' from topic: ${topic}`);
      });
    }
  }, [client]);

  // https://github.com/mqttjs/MQTT.js#mqttclientendforce-options-callback
  const mqttDisconnect = () => {
    if (client) {
      try {
        client.end(false, () => {
          setConnectionStatus('Disconnecting...');
          console.log('Disconnection successful');
        });
      } catch (error) {
        console.log('Disconnect error:', error);
      }
    }
  };

  // https://github.com/mqttjs/MQTT.js#mqttclientpublishtopic-message-options-callback
  const mqttPublish = (
    topic: string,
    message: string,
    options: IClientPublishOptions
  ) => {
    if (client) {
      client.publish(topic, message, options, (error) => {
        if (error) {
          console.log('Publish error: ', error);
        }
      });
    }
  };

  // https://github.com/mqttjs/MQTT.js#mqttclientsubscribetopictopic-arraytopic-object-options-callback
  const mqttSubscribe = (topic: string, options: IClientSubscribeOptions) => {
    if (client) {
      client.subscribe(topic, options, (error) => {
        if (error) {
          console.log('Subscribe error:', error);
          return;
        }
        console.log(`Subscribe to topics: ${topic}`);
        setIsSubscribed(true);
      });
    }
  };

  // https://github.com/mqttjs/MQTT.js#mqttclientunsubscribetopictopic-array-options-callback
  const mqttUnsubscribe = (topic: string, options: IClientSubscribeOptions) => {
    if (client) {
      client.unsubscribe(topic, options, (error) => {
        if (error) {
          console.log('Unsubscribe error', error);
          return;
        }
        console.log(`unsubscribed topic: ${topic}`);
        setIsSubscribed(false);
      });
    }
  };

  const isConnected = client && client.connected;

  return (
    <div className="text-base text-center">
      <p className="mb-2 text-xs">{connectionStatus}</p>
      <button
        className="p-1 px-2 bg-gray-200 border border-solid border-gray-400 rounded"
        onClick={() => {
          if (isConnected) {
            mqttDisconnect();
          } else {
            mqttConnect('ws://localhost', {
              port: 1883,
              username: 'cis427',
              password: 'GoBlue!',
            });
          }
        }}
      >
        {isConnected ? 'Disconnect' : 'Connect'}
      </button>
    </div>
  );
};
