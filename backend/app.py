from fastapi import FastAPI
import requests
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_URL = "https://api.chainbase.online/v1"
HEADERS = {
    "accept": "application/json",
    "x-api-key": "2XDpWewEl2VHYli1Y4ta056YW76"
}

@app.get("/token-holders/{wallet_address}")
async def get_token_holders(wallet_address: str):
    api_url = f"{BASE_URL}/token/holders?chain_id=1&contract_address={wallet_address}&page=1&limit=20"
    response = requests.get(api_url, headers=HEADERS)
    
    if response.status_code != 200:
        return {"error": "Failed to fetch data from the provided API."}
    
    response_data = response.json()
    token_holders_data = response_data.get('data', [])
    count = response_data.get('count', 0)

    return {"data": token_holders_data, "count": count}

@app.get("/token-transfers/{wallet_address}")
def get_token_transfers(wallet_address: str):
    api_url = f"{BASE_URL}/token/transfers?chain_id=1&contract_address={wallet_address}&page=20&limit=100"
    response = requests.get(api_url, headers=HEADERS)

    if response.status_code == 200:
        data = response.json().get("data", [])
        return {"data": data}
    else:
        return {"error": "Failed to fetch data from API"}

@app.get("/token-metadata/{wallet_address}")
def get_token_metadata(wallet_address: str):
    api_url = f"{BASE_URL}/token/metadata?chain_id=1&contract_address={wallet_address}"
    response = requests.get(api_url, headers=HEADERS)

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
