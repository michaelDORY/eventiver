import os
from dotenv import load_dotenv
from time import sleep
from sensor.sensor import Sensor
from sensor.mqtt_client import MqttClient
from event_manager.event_manager import EventManager


def publish_data(mqtt_client, topic, data, counter=0):
    mqtt_client.publish(topic, data)
    sleep(3)

    if mqtt_client.message_from_client:
        print("Received message from client:")
        print(mqtt_client.message_from_client)
        if mqtt_client.message_from_client["deviceId"] == os.getenv("DEVICE_ID"):
            print("Data published successfully!")
            return

    print("Data not published. Retrying...")
    counter += 1
    if counter < 3:
        publish_data(mqtt_client, topic, data, counter)
    else:
        print("Data not published. Please try again later.")


if __name__ == "__main__":
    load_dotenv()

    mqtt_client = MqttClient(
        os.getenv("AWS_CLIENT_ID"),
        os.getenv("AWS_ENDPOINT"),
        "credentials/rootCA.pem",
        "credentials/privateKey.pem.key",
        "credentials/deviceCert.pem.crt",
    )

    mqtt_client.subscribe_to_topic(os.getenv("AWS_TOPIC"))

    event_manager = EventManager()
    chosen_event_id = event_manager.choose_event()

    print("Reading data from sensor...")

    sensor = Sensor("Temperature Sensor", "temperature", "°C", "Conference Room")

    print("Publishing data to AWS IoT Core...")

    data = sensor.read_data(os.getenv("DEVICE_ID"), chosen_event_id)

    publish_data(mqtt_client, os.getenv("AWS_TOPIC"), data)
