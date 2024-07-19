
Feature: Verify redemption negative API

 Scenario: user makes a post request to prizeout redemption success Api second time with same request id
    When the user launches the on-session API_URL
    And user captures the main total wallet balance
    And the user lanches redemption balance API_URL
    And the user launches the prizeout redemption success Api
    And user checks the redemption success status
    Then user asserts the redemption request is completed or not
    When the user launches the prizeout redemption success Api

 Scenario: user makes a post request to prizeout redemption fail Api second time with same request id
    When the user launches on-session API_URL
    And the user lanches redemption balance API_URL
    And the user lanches the prizeout redemption fail Api
    And the user lanches the prizeout redemption fail Api