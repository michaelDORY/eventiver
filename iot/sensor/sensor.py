import random


class Sensor:
    def __init__(self, name, type, unit, location):
        self.name = name
        self.unit = unit
        self.type = type
        self.location = location

    def read_data(self, device_id, event_id):
        return {
            "name": self.name,
            "value": random.randint(8, 30),
            "unit": self.unit,
            "location": self.location,
            "eventId": event_id,
            "deviceId": device_id,
        }
