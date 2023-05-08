# api

This is the Express API for the Ternoa assessment.

## Getting Started

This app is made with [Turborepo](https://turbo.build/repo) and [Yarn](https://yarnpkg.com/) but if you want to run it independently you can use the following commands:

1. Clone the repository

```bash
git clone https://github.com/AntoineKM/ternoa-assessment
```

2. Go to the app directory

```bash
cd ternoa-assessment/apps/api
```

3. Install dependencies

```bash
yarn install
```

4. Setup the environment variables

Copy the [`.env.example`](.env.example) file and rename it to `.env.local` and fill the variables.

5. Now you can use the following commands:

- `yarn dev` - Runs `nodemon --exec ts-node src/index` to start the API in development mode
- `yarn build` - Runs `tsc` to build the API
- `yarn start` - Runs `node dist/index` to start the API in production mode (only after `yarn build`)

## Routes

| Method | Route | Description | Parameters |
| --- | --- | --- | --- |
| GET | `/` | Returns an health check | - |
| GET | `/uwucrew` | Returns the list of NFTs from the UwU Crew collection | `limit` (optional) - Number of NFTs to return (default 10).<br>`cursor` (optional) - The cursor for pagination. |
| GET | `/auctions` | Returns the list of NFTs from the Auctions collection | `limit` (optional) - Number of NFTs to return (default 10).<br>`cursor` (optional) - The cursor for pagination. |

## Choices

- TypeScript - For type safety
- Express - For building the REST API server
- Moralis - For connecting to Web3 and interacting with the Ethereum blockchain
- Dotenv Flow - To load environment variables from multiple `.env` files
- Nodemon - To automatically restart the server on code changes during development

## Demo

Visit [deployment demo](https://api-nft.hop.sh) to see the project in action.

## License
[MIT](LICENSE)
