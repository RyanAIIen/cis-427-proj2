package com.example.networkingprojectappver3

import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.hivemq.client.internal.mqtt.message.MqttMessage
import com.hivemq.client.mqtt.MqttClient
import com.hivemq.client.mqtt.datatypes.MqttQos
import com.hivemq.client.mqtt.mqtt3.Mqtt3AsyncClient
import com.hivemq.client.mqtt.mqtt3.Mqtt3AsyncClient.Mqtt3SubscribeAndCallbackBuilder
import com.hivemq.client.mqtt.mqtt3.message.Mqtt3Message
import com.hivemq.client.mqtt.mqtt3.message.connect.connack.Mqtt3ConnAck
import com.hivemq.client.mqtt.mqtt3.message.publish.Mqtt3Publish
import com.hivemq.client.mqtt.mqtt3.message.subscribe.Mqtt3Subscribe
import com.hivemq.client.mqtt.mqtt3.message.subscribe.suback.Mqtt3SubAck
import java.net.SocketAddress
import java.util.UUID
import java.util.concurrent.CompletableFuture
import java.util.function.Consumer

class MainActivity : AppCompatActivity() {

    lateinit var statusApp: TextView
    lateinit var passwordApp: EditText
    lateinit var permPasswordApp: EditText
    lateinit var clientId: String
    lateinit var password: String
    lateinit var client: Mqtt3AsyncClient

    //https://hivemq.github.io/hivemq-mqtt-client/docs/quick-start/
    //https://hivemq.github.io/hivemq-mqtt-client/docs/installation/android/
    //https://community.hivemq.com/t/client-using-kotlin/297
    //https://community.hivemq.com/t/communication-in-between-two-raspberry-pis-using-mqtt-on-local-network/1933/3
    //http://localhost:63342/NetworkingProjectAppVer3/hivemq-mqtt-client-1.3.0-javadoc.jar/com/hivemq/client/mqtt/mqtt3/message/publish/Mqtt3Publish.html?_ijt=5m1pr0j01rcjbntul0clmi9nae&_ij_reload=RELOAD_ON_SAVE
    // Setup MQTT Client - Done
    // subscribe to a topic
    // publish to a topic
    // logic if failure to connect to broker

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        statusApp  = findViewById(R.id.Status)
        statusApp.text = "No Connection"

        // how to build and connect to broker
        client  = MqttClient.builder()
            .useMqttVersion3()
            .identifier(UUID.randomUUID().toString())
            .serverHost("broker.hivemq.com")
            .serverPort(1883)
            .buildAsync();
        client.connectWith()
            .simpleAuth()
                .username("test")
                .password("test".encodeToByteArray())
            .applySimpleAuth()
            .send()

        // how to subscribe
        client.subscribeWith()
            .topicFilter("9qYTNkV39xctgVe46TMqtr9QC/status")
            .qos(MqttQos.EXACTLY_ONCE)
            .callback {
                statusApp.text = it.payloadAsBytes.decodeToString()
            }
            .send()



        // test if connection to broker
        // statusApp.text = connAckFuture.get().returnCode.toString()
    }

    fun unlock(view: View) {

        passwordApp = findViewById(R.id.password)
        password = passwordApp.text.toString()
        // to do

        // how to publish to a topic
        client.publishWith()
            .topic("9qYTNkV39xctgVe46TMqtr9QC/unlockRequest")
            .qos(MqttQos.EXACTLY_ONCE)
            .payload(( /* clientId+"?"+ */ password).encodeToByteArray())
            .send()
    }
    fun lock(view: View) {

        passwordApp = findViewById(R.id.password)
        password = passwordApp.text.toString()
        // to do
        client.publishWith()
            .topic("9qYTNkV39xctgVe46TMqtr9QC/lockRequest")
            .qos(MqttQos.EXACTLY_ONCE)
            .payload(( /* clientId+"?"+ */ password).encodeToByteArray())
            .send()

    }
    fun actTempPass(view: View) {

        permPasswordApp = findViewById(R.id.permPassword)
        password = permPasswordApp.text.toString()
        // to do
        client.publishWith()
            .topic("9qYTNkV39xctgVe46TMqtr9QC/actTempPassRequest")
            .qos(MqttQos.EXACTLY_ONCE)
            .payload(( /* clientId+"?"+ */ password).encodeToByteArray())
            .send()
    }
}

/*
        clientIdApp = findViewById(R.id.clientId)
        clientId = clientIdApp.text.toString()
*/