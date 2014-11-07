# Sets Board
We have a 32” TV in our practice space, it would be nice to use it! Ideally a simple app that can run on a raspberry pi connected to the TV and allow for basic set management. TV Will act as a main, view. Mobile devices like phones and tablet can be either viewers or a controler.

## Setup instructions

### Install Node.js on the Raspberry Pi 
(Referenced by http://joshondesign.com/2013/10/23/noderpi)

It's generally recommended to get the latest version of raspbian on your raspberry pi.  Do the following:
```
$ sudo apt-get upgrade;
$ sudo apt-get update
```
Next, install node.  
```
$ wget http://nodejs.org/dist/v0.10.28/node-v0.10.28-linux-arm-pi.tar.gz
$ tar -xvzf node-v0.10.28-linux-arm-pi.tar.gz
$ node-v0.10.28-linux-arm-pi/bin/node --version
```
You should see
```
v0.10.28
```
Point $NODE_JS_HOME to the directory where you un-tarred Node, and add the bin directory to your PATH using whatever system you prefer (bash profile script, command line vars, etc); So in your .bash_profile you can add:
```
NODE_JS_HOME=/home/pi/node-v0.10.28-linux-arm-pi 
PATH=$PATH:$NODE_JS_HOME/bin 
```
then
```
$ source .bash_profile
```
This will let you run node in any directory. To test npm, do:
```
$ npm —version
```
This should give you the version of npm that you are using.

### Installing node packages

To install the node packages, run the following:
```
$ npm install
```
nodejs-model depends on the npm package 'q'. It's package.json has an older version of it. After running npm install,
go into 'node_modules/nodejs-models/' and edit the package.json. 
```
$ cd node_modules/nodejs-models
$ vim package.json

Change the following:
> "q": "<old version of q>"

 to

 > "q": "*",
```
After the package.json is updated run
```
$ npm update
``` 
this will update you to a version of q that will work and not throw errors when one validates the model.

## Starting up the api server:
```
node server.js
```

## TODO
1. Everything :(
