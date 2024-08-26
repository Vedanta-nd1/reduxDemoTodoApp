# server.py
# A simple HTTP server that serves a random todo-list item from a list of items
# The server listens on port 8000 and responds to requests to /api/todos

import http.server
import socketserver
import random
import json

PORT = 8000

# Sample todo-list items
todo_list = [
    "Set up Redux store",
    "Create Redux actions",
    "Create Redux reducers",
    "Connect React components to Redux",
    "Implement Redux middleware",
    "Optimize component re-renders",
    "Manage component state with useState",
    "Handle side effects with useEffect",
    "Implement form handling in React",
    "Configure Redux DevTools",
    "Create reusable components",
    "Implement routing with React Router",
    "Set up API integration with Redux Thunk",
    "Handle errors and loading states",
    "Create a global state for theme management",
    "Use Redux for global state management",
    "Refactor class to functional components",
    "Implement memoization with React.memo",
    "Use PropTypes for component validation",
    "Deploy React app to production"
]

# Helper function to get 1 random todo-list item
def get_random_todos():
    return random.sample(todo_list, 1)

# Custom request handler
class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/todos':
            # Set the response code to 200 (OK)
            self.send_response(200)

            # Set the header to indicate JSON content
            self.send_header('Content-type', 'application/json')
            self.end_headers()

            # Get 1 random todo-list item
            random_todos = get_random_todos()

            # Convert the list to JSON and write it to the response
            self.wfile.write(json.dumps(random_todos).encode())

        else:
            # Handle other paths (e.g., return a 404)
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'Not Found')

# Set up the server
with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    httpd.serve_forever()
