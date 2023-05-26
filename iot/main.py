import os
from dotenv import load_dotenv
from sensor.sensor import Sensor
from sensor.mqtt_client import MqttClient
from event_manager.event_manager import EventManager

if __name__ == "__main__":
    load_dotenv()

    mqtt_client = MqttClient(
        os.getenv("AWS_CLIENT_ID"),
        os.getenv("AWS_ENDPOINT"),
        "credentials/rootCA.pem",
        "credentials/privateKey.pem.key",
        "credentials/deviceCert.pem.crt",
    )

    event_manager = EventManager()
    chosen_event_id = event_manager.choose_event()

    print("Reading data from sensor...")

    sensor = Sensor("Temperature Sensor", "temperature", "°C", "Conference Room")

    print("Publishing data to AWS IoT Core...")

    data = sensor.read_data(chosen_event_id)

    result = mqtt_client.publish(os.getenv("AWS_TOPIC"), data)

    print("Done.")
