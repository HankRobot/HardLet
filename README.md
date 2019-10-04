# ArduinoNEM
This project is focused on deploying NEM Catapult only on Arduino devices via RESTFUL API, the goal is to use NODEMCU to act as a hardware wallet to store private keys and authorize transactions for NEM Blockchain (Kinda like Trezor)

# This repository is currently in development...
1. AnnounceTransaction is the REST API for announcing payload to MIJIN TESTNET (you cannot generate payload on arduino, hence it has to be transfered from a node)
2. CheckAccountTransactons is for checking the transactions via REST API using public key
3. CheckTransaction is for checking transaction using a hash.

# Getting Started
1. Download the zip code of this file, then extract it.
2. Open the Hardlet folder and upload the Hardlet.ino file to a NODEMCU.
3. Go to the bin folder of the Hardlet folder, and launch Hardlet.exe.

# Contribute
1. Basic mosaic transaction is done.
2. Account generation?
3. Other transaction types

#HAPPY CODING!!! :heart:
