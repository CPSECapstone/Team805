# Team805
CSC 402-07 - CloudHaven

CloudHaven is a vendor-neutral "users' platform". It creates better application usability, integration, security, and rapid development by extracting/consolodating user data and functionality, seamlessly integrated via UI-as-a-Service.

http://cloudhaven.net

## Use Case: Doctor gets a new patient
![Use Case](https://github.com/CPSECapstone/Team805/blob/main/Sample%20Use%20Case%20Sequence%20Diagram.png)
Over the course of the quarter we have worked up to validating the following scenario: A doctor recieves a new patient and must add them to their system. The doctor logins into their Cloud Haven system, and creates a new patient record in a registered vendor system. To test this flow yourself you must run the vendor system (the vendor directory), then run cloud haven (the frontend directory).

## Setup:
`git clone https://github.com/CPSECapstone/Team805.git`

at this point, you will need to set up a .env file in backend/. See the 'Env' Section for what variables you need.

Run `npm install` in /backend, /vendor, and /frontend to install npm dependencies

`cd vendor` and `node api.js` to start mock vendor api

`cd ../frontend` and `npm start` to run frontend

`cd ../backend` and `npm start` to run backend

## Env:
A .env file in /backend is required to store secrets. The variables you must include are:  
**ACCESS_PRIV_KEY**=access token secret, should be a generated string of at least 60 characters  
**REFRESH_PRIV_KEY**=refresh token secret, should be a generated string of at least 60 characters  
**dbUser**=mongoDb username  
**dbPass**=mongoDb password  

## Continuous Integration:
Link to TravisCI:

https://travis-ci.org/github/CPSECapstone/Team805

## Testing:
`./build_tests.sh` will run tests on both backend and frontend

## JIRA:
http://platinum.cscaws.com:8080/secure/RapidBoard.jspa?rapidView=43&view=planning.nodetail&issueLimit=100 
