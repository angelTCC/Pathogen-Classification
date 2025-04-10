from flask import Flask
from api.routes import app as api_routes
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
app.register_blueprint(api_routes)

if __name__ == "__main__":
    app.run(debug=True)
