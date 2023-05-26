import random

class Sensor:
    def __init__(self, name, type, unit, location):
        self.name = name
        self.type = type
        self.unit = unit
        self.location = location

    def read_data(self):
        return {
            "name": self.name,
            "value": random.randint(8, 30),
            "unit": self.unit,
            "location": self.location
        }
