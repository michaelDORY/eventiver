import time
import os
from dotenv import load_dotenv
from sensor.sensor import Sensor
from sensor.mqtt_client import MqttClient

if __name__ == "__main__":
    load_dotenv()

    sensor = Sensor("Temperature Sensor", "temperature", "°C", "Conference Room")

    mqtt_client = MqttClient(
        os.getenv("AWS_CLIENT_ID"),
        os.getenv("AWS_ENDPOINT"),
        "credentials/rootCA.pem",
        "credentials/privateKey.pem.key",
        "credentials/deviceCert.pem.crt"
    )

    for i in range(5):
        data = sensor.read_data()
        mqtt_client.publish(os.getenv("AWS_TOPIC"), data)
        time.sleep(10)
