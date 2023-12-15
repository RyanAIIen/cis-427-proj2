import { useContext, useEffect, useState } from 'react';
import mqtt, {
  IClientOptions,
  IClientPublishOptions,
  IClientSubscribeOptions,
  MqttClient,
} from 'mqtt';

import { LockContext } from '@/components/LockContext';

const CONNECTION_HOST = 'wss://broker.hivemq.com:8884/mqtt';
const CONNECTION_OPTIONS = {};

const TOPIC_PREFIX = '9qYTNkV39xctgVe46TMqtr9QC';
const topics = {
  status: `${TOPIC_PREFIX}/status`,
  lockRequest: `${TOPIC_PREFIX}/lockRequest`,
  unlockRequest: `${TOPIC_PREFIX}/unlockRequest`,
  actTempPassRequest: `${TOPIC_PREFIX}/actTempPassRequest`,
};

export const MQTTConnection = () => {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');

  const { isLocked, setIsLocked } = useContext(LockContext);

  // https://github.com/mqttjs/MQTT.js#mqttconnecturl-options
  const mqttConnect = (
    host = CONNECTION_HOST,
    options = CONNECTION_OPTIONS
  ) => {
    setConnectionStatus('Connecting...');
    setClient(mqtt.connect(host, options));
  };

  useEffect(() => {
    if (client) {
      mqttPublish(topics.status, isLocked ? 'Locked' : 'Unlocked');

      // https://github.com/mqttjs/MQTT.js#event-connect
      client.on('connect', () => {
        setConnectionStatus('Connected');
        console.log('Connection successful');

        mqttSubscribe(topics.unlockRequest);
        mqttSubscribe(topics.lockRequest);
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
        if (topic === topics.unlockRequest && message) {
          setIsLocked(false);
        } else if (topic === topics.lockRequest && message) {
          setIsLocked(true);
        }
      });
    } else {
      mqttConnect();
    }
  }, [client, isLocked]);

  // https://github.com/mqttjs/MQTT.js#mqttclientendforce-options-callback
  const mqttDisconnect = () => {
    if (client) {
      try {
        client.end(false, () => {
          setConnectionStatus('Disconnecting...');
          console.log('Disconnection successful');
          setConnectionStatus('Disconnected');
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
    options?: IClientPublishOptions
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
  const mqttSubscribe = (topic: string, options?: IClientSubscribeOptions) => {
    if (client) {
      client.subscribe(topic, options, (error) => {
        if (error) {
          console.log('Subscribe error:', error);
          return;
        }
        console.log(`Subscribe to topics: ${topic}`);
      });
    } else {
      console.log('Client not connected');
    }
  };

  // https://github.com/mqttjs/MQTT.js#mqttclientunsubscribetopictopic-array-options-callback
  const mqttUnsubscribe = (
    topic: string,
    options?: IClientSubscribeOptions
  ) => {
    if (client) {
      client.unsubscribe(topic, options, (error) => {
        if (error) {
          console.log('Unsubscribe error', error);
          return;
        }
        console.log(`unsubscribed topic: ${topic}`);
      });
    }
  };

  const isConnected = client && client.connected;

  const btnClass = `p-1 px-2 bg-gray-200 border border-solid border-gray-400 rounded text-xs ${
    !client && 'invisible'
  }`;

  return (
    <div className="text-base text-center">
      <p className="mb-2">
        <span
          className={`mr-1 ${isConnected ? 'text-green-600' : 'text-red-600'}`}
        >
          &#9679;
        </span>
        {connectionStatus}
      </p>

      {/* <button
        className={btnClass}
        onClick={() => {
          if (isConnected) {
            mqttDisconnect();
          } else {
            mqttConnect();
          }
        }}
      >
        {isConnected ? 'Disconnect' : 'Connect'}
      </button> */}

      {/* <input onChange={(event) => setStatus(event.target.value)} />
      <div>{status}</div>
      <button
        className={btnClass}
        onClick={() => mqttPublish(`${TOPIC_PREFIX}/status`, status)}
      >
        Publish
      </button> */}
    </div>
  );
};
