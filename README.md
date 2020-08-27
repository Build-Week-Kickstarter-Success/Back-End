# Kickstarter Success Web-Back-End

## The idea behind the Kickstarter Success web application

Kickstarter success is an application that takes in the main information of a Kickstarter campaign
and predicts if the campaign is going to be successful.

## The Web-Back-End

The Web Back End of the Kickstarter success portion involves creating a database in which the web front end can

- Register a new user.
- Log in to the Database.
- Send information to tables where it can be Read, Written to, updated, and even deleted.

## The Links

[Marketing page](https://distracted-hopper-7d1791.netlify.app/)

[Kickstarter Success API](https://bw1kickstartersuccess.herokuapp.com/)

## The Endpoints

[Examples of Enpoint Use](https://documenter.getpostman.com/view/11972563/T1LTfjyj)

### Authorization

- `/api/auth/register`
    - The endpoint in which Registration is sent to the database
        - requirements
            1. Username
            2. Password
            3. First Name
            4. Last Name
            5. Email
        - Optional
            6. Avatar

    - What will be sent back
        - Success if everything required is in, it should respond back with
            all information that was sent to it, including a user ID and a Role(default to user)

- `/api/auth/login`
    - The endpoint in which a User Logs into the back-end
        - requirements
            1. Username
            2. Password
    
    - What will be sent back
        - On succcess, it will welcome and then send an access Token
                The token is required for most other routes.


### Campaigns

`/api/campaign`

#### Get

Sending a get request to /api/campaign will resolve a list of campaigns created.

You can also get individual campaigns by inputting a campaign ID at the end 
`/api/campaign/#`

#### Post

In order to send a post request to post a campaign, a user needs to be logged in.
   An authorization Token must be present and sent with Bearer + Token

- Requirements

   1. name - Name of the campaign - String
   2. desc - A Description of the Video - String
   3. disable_communication - If the creator wants to be contacted or not. Boolean.
   4. keywords - Words that can be searched for the campaign, can use multiple seperated by comma - String
   5. country - Country of Origin
   6. currency - Currency accepted
   7. goal - Amount aimed to be reached.
   8. campaign_length - length of campaign.

- Optional

   9. video - A string that can be turned into a link for a video, 
            required by Kickstarter to be present

User ID is a required parameter, but should post with the proper ID with Token Present.

- What will it send back?
    - The information sent to it, including Campaign ID.

#### Update

`/api/campaign/#`

- By putting in an id of a campaign you want to adjust, you can use any of the fields on their own to update information

#### Delete

You can delete a campaign by it's ID. `/api/campaign/#`


### Predictions

Predictions are posted at `/api/prediction`

You can get by `/api/prediction/#`

Also, you can get predictions tied to campaigns with `api/campaign/#/prediction`

#### Post
- Requirements
    1. campaign_id - where the Campaign ID is placed.
    2. success - if true, will be 1, if false, will be 0. 1= success, 0= fail.

#### Delete

- You can delete the prediction at `api/prediction/#` where number is the prediction posted.

## Additional Endpoints not required for MVP

### Users
If you're an Admin user (role: 1), You can get a list of users (/api/users)
Also, as Admin, you can Edit and Delete those users as well, if needed.

### Rewards and Updates
Kickstarters have Rewards and Updates, and there's no exception to this API.
`/api/rewards` and `/api/updates` can be posted to with the required campaign_id in them.

Also, you can get the rewards for campaigns by `/api/campaigns/#/rewards`
and the same for updates by `/api/campaigns/#/updates`

## Testing

The testing suites used are Supertest and Jest. In order to have different environments black boxed from each other, a library called Cross-env is used.

### server.test.js

The server test file is built to check to make sure that the Database being used is the testing database (location `/database/test.db3`) and ensure that it's a seperate environment from production or development.

The next test checks to make sure that an 'ok' status of 200 is sent on access.

An additional check is made to check an open endpoint with a status of 'ok': `/api/campaign.`

### authentication.test.js

At the beginning of each test, the users database is truncated, or cleared, before each individual test. No test chains off each other, and are independent of each other.

Two tests for each endpoint for authentication. `/api/auth/register` and `/api/auth/login` which checks both for Json objects and a success response.

All 4 tests involve registering different user profiles to the register endpoint, and two require using the credentials and loging in.

