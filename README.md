# Oberon Client

> Frontend client for Oberon chat built in React and Redux

## Development

### Development Environment

The Oberon chat client requires the following packages to be installed:

- Node >= 6

Then install global packages:

```
npm --global install node-sass yarn
```

Install local packages:

```
yarn install
```

### Development Server

To start the Oberon chat client:

1. Create a `.env` file. Use the example file as a starting point: `cp .env.example .env`.

1. (Optional) Update values in `.env` to match the development environment.

1. Start the client server `yarn start`.

1. To ensure client authentication works correctly, configure a DNS
   service to route traffic from `localhost:4030` to `chat.dev`. We recommend
   using [puma-dev](https://github.com/puma/puma-dev).

**Note:** the client can also be run as a desktop application using `yarn
electron`.

#### Desktop Application

To run the desktop application use `yarn electron`.

#### Portable Application

To run the portable development server run `PORT=7030 yarn portable`.

**Note**: In order to run the server a production build must be generated using `yarn build`.
