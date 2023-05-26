import json
from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient

class MqttClient:
    def __init__(self, client_id, endpoint, root_ca_path, private_key_path, certificate_path):
        self.client = AWSIoTMQTTClient(client_id)
        self.client.configureEndpoint(endpoint, 8883)
        self.client.configureCredentials(root_ca_path, private_key_path, certificate_path)
        self.client.connect()

    def publish(self, topic, message):
        self.client.publish(topic, json.dumps(message), 0)
