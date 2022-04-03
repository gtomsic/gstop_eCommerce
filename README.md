# GSTOP-SHOPPING

Open [https://gstop-client.herokuapp.com](https://gstop-client.herokuapp.com) to view it in your browser.

# Instructions before running the programming

## Inside server folder

## I am using postgresl

### This is configure all model to work with postgresql database only

Create a folder => config
Create a json inside config called config.json

```diff

{
"development": {
"username": "db-username",
"password": "db-password",
"database": "db-database",
"host": "127.0.0.1",
"dialect": "postgres"
}
}

```

Create a .env file outside server folder inline with client and server where package.json is

This is required

NODE_ENV = development
PORT = 8000
JWT_SECRET = YOUR_JSON_WEBTOKEN_SECRET_KEY_HERE
PAYPAL_CLIENT_ID = Replace_Your_Paypal_Client_ID_Here

## Note

If you change the port number to your desire port number
You need to change script inside client/package.json

### "proxy": "http://127.0.0.1:8000"

To your desire port number too

In the project directory, you can run:

### `npm install`

On the project folder run (npm install)
Same inside client folder run (npm install)

### `npm run data:import`

This is require import the data first before running anything else

### `npm run dev`

This is going to run both server first and then the client where our front end is located

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm start`

This is going to run just the server for production

### `npm run server`

This is going to run just the server for testing

### `npm run client`

This is going to run just the client

### `npm run build`

Inside client
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## `Using application`

To login as administor

email: "admin@example.com"
password: "password"

Other two account is

jane@example.com
john@example.com

password to all acount is ('password')

You can update your password in your profile
Goodluck everyone

### Note !!!

Note i didn't finished the update review end point
Feel free to finished it if you want
