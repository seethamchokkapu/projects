
 Feature: Verify BFF_API
 Background: User hits consumer-login API to create jwt token
    When user hits the consumer-login api to create a JWT token
    And the user captures authToken

 Scenario: 1 user hits consumer-summary API to get tenantCode
    When the user hits consumer-summary API to get tenantCode
    And the user captures tenantCode

 Scenario:2 user sends a post request to get-all-consumer-tasks
    When the user lanches get-all-consumer-tasks API
    Then the user captures taskId and taskName

 Scenario:3 user makes a post request to Enroll-API
    When the user launches EnrollApi
    And the user launches EnrollApi to enroll one more task
    And the user lanches get-all-consumer-tasks API
    And the user captures the taskId taskCode pendingTask

 Scenario:4 user makes a post request to task-update API
    When the user launches task-update API
    And the user hits consumer-summary API to get tenantCode
    Then the user captures updated balance
    When the user lanches get-all-consumer-tasks API
    Then the user captures completed task name
    And the user asserts the completed task with pending and available task

 Scenario:5 user sends a post request to get-all-consumer-transactions
    When the user hits consumer-summary API to get tenantCode
    And the user captures walletId
    And the user lanches get-all-consumer-transactions API
    And the user captures balance
    Then the user asserts the balance

 Scenario:6 User makes a post request to get-tenant-by-consumer-code API
    When the user launches get-tenant-by-consumer-code API
    Then the user validates the status code with 200

 Scenario:7 User makes a post request to refresh-token API
    When the user launches refresh-token API
    Then the user validates the access token  

# negative scenarios

 Scenario:8 User makes a post request to get-tenant-by-consumer-code API for failure case
    When the user launches get-tenant-by-consumer-code API for failure case
    Then the user validates the consumer code with 401  

 Scenario:9 User makes a post request to refresh-token API for failure case
    When the user launches refresh-token API for failure case
    Then the user validates the request with 401

 Scenario:10 User makes a post request to consumer-summary API for failure case
    When the user launches consumer-summary API for failure case
    Then user validates the consumer-summary API status with 401

 Scenario:11 user sends a post request to get-all-consumer-tasks API with invalid payload
    When user launches get-all-consumer-tasks API for failure case
    Then user validates the get-all-consumer-tasks API status with 401

 Scenario:12 user sends a post request enroll API with invalid payload
    When user launches enroll API for failure case
    Then user validates the enroll API status with 401

 Scenario:13 user sends a post request get-all-consumer-transactions with invalid payload
    When user launches get-all-consumer-transactions for failure case
    Then user validates the get-all-consumer-transactions status with 401

 Scenario:14 user sends a post request consumer-login with invalid payload
    When user launches consumer-login for failure case
    Then user validates the consumer-login status with 404

 Scenario:15 user sends a post request to task-update api with invalid payload
     When user launches task update api for failure case
     Then user validates the task update API status with 401
