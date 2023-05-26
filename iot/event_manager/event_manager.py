import requests
import os
import random


class EventManager:
    def __init__(self):
        self.backend_url = os.getenv("BACKEND_URL")
        self.manager_email = os.getenv("MANAGER_EMAIL")
        self.manager_password = os.getenv("MANAGER_PASSWORD")
        self.events = []
        self.login()

    def login(self):
        response = requests.post(
            self.backend_url + "/auth/login",
            json={"email": self.manager_email, "password": self.manager_password},
        )

        if response.status_code == 200:
            self.headers = {"Authorization": "Bearer " + response.json()["token"]}
        else:
            print("Failed to login:", response.status_code)

    def get_events(self):
        response = requests.get(self.backend_url + "/event", headers=self.headers)

        if response.status_code == 200:
            return response.json()
        else:
            print("Failed to get events:", response.status_code)
            return []

    def choose_event(self):
        events = self.get_events()

        if not events:
            print("No events to choose from.")
            return None

        print("Please choose an event:")
        for i, event in enumerate(events, 1):
            print(f'{i}. {event["name"]}')

        event_number = int(input("Enter the number of the event: "))

        if event_number < 1 or event_number > len(events):
            print("Invalid choice.")
            return None

        chosen_event = events[event_number - 1]
        print(f'You chose event: {chosen_event["name"]}')
        return chosen_event["id"]
