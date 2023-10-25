# contract address of developer DAO : 0xb24cd494faE4C180A89975F1328Eab2a7D5d8f11
# wallet address of Samarth : : 0x584038c4bF13fBd8536B41b8b9b23fda611CA72B
#API key : 2XDpWewEl2VHYli1Y4ta056YW76

# ##################  this is for token holders
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

url = "https://api.chainbase.online/v1/token/transfers?chain_id=1&contract_address=0xb24cd494faE4C180A89975F1328Eab2a7D5d8f11&page=1&limit=100"
headers = {
    "accept": "application/json",
    "x-api-key": "2XDpWewEl2VHYli1Y4ta056YW76"
}
response = requests.get(url, headers=headers)
print(response.text)
#######################