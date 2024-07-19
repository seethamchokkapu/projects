
Feature: Verify redemption API
Scenario: user makes a post request to on-session API
    When the user launches on-session API_URL
    And user captures the main wallet balance

Scenario: user makes a post request to balance API
    When the user lanches balance API_URL

Scenario: user makes a post request to prizeout success Api
    When the user launches on-session API_URL
    And the user launches the prizeout success Api
    And user checks the success status
    Then user asserts the request is completed or not

Scenario: user makes a post request to prizeout fail Api
    When the user launches on-session API_URL
    And the user lanches balance API_URL
    And the user lanches the prizeout fail Api

# negative scenarios
Scenario:user makes a post request to on-session API with invalid payload
    When the user launches on-session API with invalid payload

Scenario:user makes a post request to balance API with invalid payload
    When the user launches balance API with invalid payload
    Then user validates the  balance API status with 400

Scenario:user makes a post request to prizeout success API with invalid payload
    When the user launches prizeout success API with invalid payload
    Then user validates the  prizeout success API status with 400
    
Scenario:user makes a post request to prizeout fail API with invalid payload
    When the user launches prizeout fail API with invalid payload
    Then user validates the  prizeout fail API status with 400
 


