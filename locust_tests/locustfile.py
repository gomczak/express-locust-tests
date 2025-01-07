from locust import HttpUser, task, between
import random

class APIUser(HttpUser):
    # Wait between 1 and 5 seconds between tasks
    wait_time = between(1, 5)
    
    def on_start(self):
        # Initialize any data you need for the test
        self.test_user = {"name": f"User_{''.join(random.choices('abcdefghijklmnopqrstuvwxyz', k=8))}"}
    
    @task(3)  # Weight of 3 (more frequent)
    def get_users(self):
        # Test GET /api/users endpoint
        self.client.get("/api/users")
    
    @task(2)
    def get_single_user(self):
        # Test GET /api/users endpoint with random existing ID (1-7)
        user_id = random.randint(1, 7)  # There are 7 users in the sample data
        self.client.get(f"/api/users/{user_id}")
    
    @task(2)  # Weight of 1 (less frequent)
    def create_user(self):
        # Test POST /api/users endpoint
        response = self.client.post("/api/users", json=self.test_user)
        if response.status_code == 201:
            # Store the ID of the newly created user
            self.created_user_id = response.json()['id']
    
    @task(1)
    def update_user(self):
        # Test PUT /api/users/id endpoint
        if hasattr(self, 'created_user_id'):
            self.client.put(f"/api/users/{self.created_user_id}", json=self.test_user)
    
    @task(1)
    def delete_user(self):
        # Test DELETE /api/users endpoint with the ID of the user we just created
        if hasattr(self, 'created_user_id'):
            self.client.delete(f"/api/users/{self.created_user_id}")
            delattr(self, 'created_user_id')