# Kickstarter Success Web-Back-End

## The idea behind the Kickstarter Success web application

Kickstarter success is an application that takes in the main information of a Kickstarter campaign
and predicts if the campaign is going to be successful.

## The Web-Back-End

The Web Back End of the Kickstarter success portion involves creating a database in which the web front end can

- Register a new user.
- Log in to the Database.
- Send information to tables where it can be Read, Written to, updated, and even deleted.

### The Link to the API

[Kickstarter Success](https://bw1kickstartersuccess.herokuapp.com/)

### The Endpoints

[Examples of Enpoint Use](https://documenter.getpostman.com/view/11972563/T1LTfjyj)

#### Authorization

- /api/auth/register 
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

- /api/auth/login
    - The endpoint in which a User Logs into the back-end
        - requirements
            1. Username
            2. Password
    
    - What will be sent back
        - On succcess, it will welcome and then send an access Token
                The token is required for most other routes.


#### Campaigns

/api/campaign

##### Get

Sending a get request to /api/campaign will resolve a list of campaigns created.

##### Post

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

/api/campaign/#

