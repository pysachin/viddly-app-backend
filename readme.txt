// install as development dependency 
// not reuired in production
npm i jshint --save-dev

// to list all installed dependencies
npm list 
npm list --depth=0

// to create pacakage .json
npm init 
npm init --yes

^ -- caret
major.minotr.patch
^ 4.13.6 = 4.xxx
~ 4.13.6 = 4.13.XX
4.13.6 = exact version 4.13.6

// command to check latest version
npm outdated

npm update 

// npm i -g npm-check-updates
// all packages will be update.
npm-check-updates
ncu -c

npm i
D:\Download\React\[FreeCoursesOnline.Me] Code With Mosh - The Complete Node.js Course\13. Integration Testing
13 - 9
15 - 9

// some import packages.
fawn - for transaction management in mongo
joi-objectid - to validate object id
lodash - very use full library for object manupulation.
joi-password-complexcity - to create pasword comlexixty
jsonwebtoken - package to generate jwt tokens
config - package to get config / eviroment variables
winston@2.4.0 - library for loging
winston-mongodb@3.0.0 - library for loging
supertest - library used to send http request like postman.

//set eviroment variables:
type command in CMD/terminal
for win -? set vidly_jwtPrivateKey=mySecureKey
for mac -? export vidly_jwtPrivateKey=mySecureKey

//heroku
heroku config : to get config
heroku config:set vidly_db="xyz"

