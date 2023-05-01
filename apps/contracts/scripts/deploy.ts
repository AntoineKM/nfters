import { ethers } from "hardhat";

async function main() {
  const nftersFactory = await ethers.getContractFactory("Nfters");
  const nfters = await nftersFactory.deploy("Nfters", "AKM");

  await nfters.deployed();
  console.log(`Deployed nfters to ${nfters.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
