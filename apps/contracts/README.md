# contracts

This is the contracts for the Ternoa assessment.

## Getting Started

This app is made with [Turborepo](https://turbo.build/repo) and [Yarn](https://yarnpkg.com/) but if you want to run it independently you can use the following commands:

1. Clone the repository

```bash
git clone https://github.com/AntoineKM/ternoa-assessment
```

2. Go to the app directory

```bash
cd ternoa-assessment/apps/contracts
```

3. Install dependencies

```bash
yarn install
```

4. Now you can use the following commands:

- `yarn n` - Runs `hardhat node` to start the local blockchain
- `yarn compile` - Runs `hardhat compile` to compile the contracts
- `yarn deploy` - Runs `hardhat run scripts/deploy.ts` to deploy the contracts
- `yarn deploy:local` - Runs `hardhat run scripts/deploy.ts --network localhost` to deploy the contracts on the local blockchain

## Choices

- TypeScript - For type safety
- Hardhat - For compiling, testing and deploying the contracts
- OpenZeppelin - For using the ERC721 standard

## License
[MIT](LICENSE)
