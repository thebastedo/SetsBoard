# Sets Board
We have a 32” TV in our practice space, it would be nice to use it! Ideally a simple app that can run on a raspberry pi connected to the TV and allow for basic set management. TV Will act as a main, view. Mobile devices like phones and tablet can be either viewers or a controler.

## Setup instructions
nodejs-model depends on the npm package 'q'. It's package.json has an older version of it. After running 
```
npm install
```
Go into 'node_modules/nodejs-models/' and edit the package.json. Remove the version number for the 'q' dependancy and replace it with '*'. After the package.json is updated run
```
npm update
``` 
this will update you to a version of q that will work and not throw errors when one validates the model.

## Starting up the api server:
```
node server.js
```

## TODO
1. Everything :(
