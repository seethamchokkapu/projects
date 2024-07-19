Feature: verifying dataFeed API
Scenario: verifying data-feed/member and tenant api for api response status code
When user hits token api to generate X-API_SESSION-KEY
And user hits data-feed-member api to validate response status code
And user hits tenant api to validate response status code
