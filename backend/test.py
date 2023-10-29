
import requests
url = "https://api.chainbase.online/v1/token/holders?chain_id=1&contract_address=0xb24cd494faE4C180A89975F1328Eab2a7D5d8f11&page=1&limit=20"

headers = {
    "accept": "application/json",
    "x-api-key": "2XDpWewEl2VHYli1Y4ta056YW76"
}
response = requests.get(url, headers=headers)
print(response.text)
########################
##################### token transfers to the contracts
import requests
url ="https://api.chainbase.online/v1/token/transfers?chain_id=1&contract_address=0xb24cd494faE4C180A89975F1328Eab2a7D5d8f11&page=1&limit=100"


headers = {
    "accept": "application/json",
    "x-api-key": "2XDpWewEl2VHYli1Y4ta056YW76"
}
response = requests.get(url, headers=headers)
print(response.text)
#######################

url = f"https://api.chainbase.online/v1/nft/transfers?chain_id=1&contract_address={contract_address}&token_id={token_id}&page=1&limit=20"


api_url =f"https://api.chainbase.online/v1/token/transfers?chain_id=1&contract_address={contract_address}&address={address}&page=1&limit=20"