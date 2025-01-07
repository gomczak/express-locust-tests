A simple REST API with the following endpoints:
GET /api/users - Get all users
GET /api/users/:id - Get a specific user by ID
POST /api/users - Create a new user
PUT /api/users/:id - Update an existing user
DELETE /api/users/:id - Delete a user

You can test these endpoints using tools like Postman or curl. 
Here are some example requests:

# Get all users
curl http://localhost:3000/api/users

# Get single user
curl http://localhost:3000/api/users/1

# Create new user
curl -X POST -H "Content-Type: application/json" \
     -d '{"name":"Bob Johnson"}' \
     http://localhost:3000/api/users

# Update user
curl -X PUT -H "Content-Type: application/json" \
     -d '{"name":"Bob Smith"}' \
     http://localhost:3000/api/users/1

# Delete user
curl -X DELETE http://localhost:3000/api/users/1