from fastapi import FastAPI
import requests
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Your provided API details
API_URL = "https://api.chainbase.online/v1/token/holders?chain_id=1&contract_address=0xb24cd494faE4C180A89975F1328Eab2a7D5d8f11&page=1&limit=20"
HEADERS = {
    "accept": "application/json",
    "x-api-key": "2XDpWewEl2VHYli1Y4ta056YW76"
}
# this function will show the list of top token holders for that particular contract
@app.get("/token-holders")
async def get_token_holders():
    response = requests.get(API_URL, headers=HEADERS)
    
    # Check if the response is successful
    if response.status_code != 200:
        return {"error": "Failed to fetch data from the provided API."}

    response_data = response.json()

    # Extract the needed information
    token_holders_data = response_data.get('data', [])
    count = response_data.get('count', 0)

    return {
        "data": token_holders_data,
        "count": count
    }
# fucntion that will show all the transfers done by a particular contract
@app.get("/token-transfers")
def get_token_transfers():
    url = "https://api.chainbase.online/v1/token/transfers?chain_id=1&contract_address=0xb24cd494faE4C180A89975F1328Eab2a7D5d8f11&page=20&limit=100"
    headers = {
        "accept": "application/json",
        "x-api-key": "2XDpWewEl2VHYli1Y4ta056YW76"
    }
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json().get("data", [])
        return {"data": data}
    else:
        return {"error": "Failed to fetch data from API"}

# this function will show the meta data for that particular token
@app.get("/token-metadata")
def get_token_metadata():
    url = "https://api.chainbase.online/v1/token/metadata?chain_id=1&contract_address=0xb24cd494faE4C180A89975F1328Eab2a7D5d8f11"
    headers = {
        "accept": "application/json",
        "x-api-key": "2XDpWewEl2VHYli1Y4ta056YW76"
    }
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        resp_data = response.json().get("data", {})
        return {
            "name": resp_data.get("name", ""),
            "symbol": resp_data.get("symbol", ""),
            "total_supply": resp_data.get("total_supply", ""),
            "current_usd_price": resp_data.get("current_usd_price", 0)
        }
    else:
        return {"error": "Failed to fetch data from API"}
