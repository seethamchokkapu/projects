Feature: Verify benifitsBff Api

Scenario:User make a get request to get consumer by email API
When user hits get consumer by email API to validate the response status code

Scenario: User make a post request to get tenant by consumercode Api
When user hits get tenant by consumercode Api to validate the response code

# Scenario:User make a post request to wallets API
#  When user hits the wallets API to get wallet details
#  Then user captures all the wallet details to verify them in db
#  And user verifies wallet API response with the db data from wallet table

# Scenario: User hits transactions Api to get transactions of the consumer
#  When user hits transactions api to get transaction history of the consumer
#  Then user captures the transaction details of Today, This Month and Previous Trasactions