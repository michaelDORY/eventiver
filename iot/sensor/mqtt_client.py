import json
from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient


class MqttClient:
    def __init__(self, client_id, endpoint, root_ca_path, private_key_path, certificate_path):
        self.client = AWSIoTMQTTClient(client_id)
        self.client.configureEndpoint(endpoint, 8883)
        self.client.configureCredentials(root_ca_path, private_key_path, certificate_path)
        self.client.connect()

    def on_message_callback(self, client, userdata, message):
        self.message_from_client = json.loads(message.payload.decode("utf-8"))

    def subscribe_to_topic(self, topic):
        self.client.subscribe(topic, 1, self.on_message_callback)

    def publish(self, topic, message):
        return self.client.publish(topic, json.dumps(message), 0)
