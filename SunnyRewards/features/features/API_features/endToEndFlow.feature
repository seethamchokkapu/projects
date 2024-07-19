Feature: verifying Api end-to-end flow

Scenario: verifying data-feed/member api
When user hits data-feed-member api to create a new consumerCode
And user hits the consumer-login api to create a JWT token
And the user captures authToken
And the user hits consumer-summary API to get tenantCode
And the user captures tenantCode
And the user lanches get-all-consumer-tasks API
Then the user captures taskId and taskName
When the user launches EnrollApi
And the user launches EnrollApi to enroll one more task
And the user lanches get-all-consumer-tasks API
And the user captures the taskId taskCode pendingTask
And the user launches task-update API
And the user hits consumer-summary API to get tenantCode
Then the user captures updated balance
And the user lanches get-all-consumer-tasks API
Then the user captures the consumer_task_id, task_id and tenantCode
And the user captures completed task name
And the user asserts the completed task with pending and available task
When the user lanches balance API_URL
And the user launches the prizeout success Api