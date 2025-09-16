
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://<portfolio>:<poi987LKJ654>@portfolio.74j5d25.mongodb.net/?retryWrites=true&w=majority&appName=portfolio"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))


db = client.portfolio_db
collection = db["portfolio_data"]