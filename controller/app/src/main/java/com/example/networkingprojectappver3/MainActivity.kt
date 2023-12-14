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
import com.hivemq.client.mqtt.mqtt3.message.subscribe.suback.Mqtt3SubAck
import java.util.UUID
import java.util.concurrent.CompletableFuture
import java.util.function.Consumer

class MainActivity : AppCompatActivity() {

    lateinit var statusApp: TextView
    lateinit var clientIdApp: EditText
    lateinit var passwordApp: EditText
    lateinit var clientIdForTempPasswordApp: EditText
    lateinit var permPasswordApp: EditText
    lateinit var status: String
    lateinit var clientId: String
    lateinit var password: String
    lateinit var clientIdForTempPassword: String
    lateinit var permPassword: String
    lateinit var subscribeClient: Mqtt3AsyncClient
    lateinit var publishClient: Mqtt3AsyncClient
    lateinit var connAckFuturePub: CompletableFuture<Mqtt3ConnAck>
    lateinit var connAckFutureSub: CompletableFuture<Mqtt3ConnAck>
    lateinit var message: Consumer<Mqtt3Publish>

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



        subscribeClient  = MqttClient.builder()
            .useMqttVersion3()
            .identifier(UUID.randomUUID().toString())
            .serverHost("mqtt-dashboard.com")
            .buildAsync();
        subscribeClient.connectWith()
            .simpleAuth()
            .username("test")
            .password("test".encodeToByteArray())
            .applySimpleAuth()
            .send()
        subscribeClient.subscribeWith()
            .topicFilter("testtopic/1")
            .callback {
                    statusApp.text = it.payload.get().asCharBuffer()
                }
            .send()


        publishClient  = MqttClient.builder()
            .useMqttVersion3()
            .identifier(UUID.randomUUID().toString())
            .serverHost("mqtt-dashboard.com")
            .buildAsync();
        connAckFuturePub = publishClient.connectWith()
            .simpleAuth()
            .username("test")
            .password("test".encodeToByteArray())
            .applySimpleAuth()
            .send()
        publishClient.publishWith()
            .topic("testtopic/1")
            .qos(MqttQos.EXACTLY_ONCE)
            .payload("placeholder".encodeToByteArray())
            .send()

        //statusApp.text = pubMessage.toString()
        //statusApp.text = connAckFuturePub.get().returnCode.toString()
    }


    fun updateStatus(view: View) {
        statusApp.text = " "
    }

    fun unlock(view: View) {
        clientIdApp = findViewById(R.id.clientId)
        clientId = clientIdApp.text.toString()
        passwordApp = findViewById(R.id.password)
        password = passwordApp.text.toString()
        // to do

    }
    fun lock(view: View) {
        clientIdApp = findViewById(R.id.clientId)
        clientId = clientIdApp.text.toString()
        passwordApp = findViewById(R.id.password)
        password = passwordApp.text.toString()
        // to do
    }
    fun actTempPass(view: View) {
        clientIdForTempPasswordApp = findViewById(R.id.clientIdForTemp)
        clientIdForTempPassword = clientIdForTempPasswordApp.text.toString()
        permPasswordApp = findViewById(R.id.permPassword)
        password = permPasswordApp.text.toString()
        // to do
    }

}

/*
        clientIdApp = findViewById(R.id.clientId)
        clientId = clientIdApp.text.toString()
*/