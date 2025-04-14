const { ethers, network } = require("hardhat");
const fs = require("fs");

async function main() {
  // Get network name
  const networkName = network.name;
  console.log(`Deploying NCommerce contract to ${networkName}...`);

  // Get signers
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying with account: ${deployer.address}`);

  // Check deployer balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(`Account balance: ${ethers.formatEther(balance)} ETH`);

  // Get the ContractFactory
  const NCommerce = await ethers.getContractFactory("NCommerce");

  // Deploy the contract
  const ncommerce = await NCommerce.deploy();

  // Wait for the contract to be deployed
  await ncommerce.waitForDeployment();

  console.log("NCommerce deployed to:", await ncommerce.getAddress());

  if (networkName !== "hardhat" && networkName !== "localhost") {
    console.log("Waiting for block confirmations...");

    // Wait for 6 block confirmations
    await ncommerce.deployTransaction.wait(6);

    console.log("Verifying contract...");

    try {
      // Verify the contract on Etherscan
      await hre.run("verify:verify", {
        address: ncommerce.address,
        constructorArguments: [], // No constructor arguments for this contract
      });

      console.log("Contract verified on Etherscan");
    } catch (error) {
      console.error("Error verifying contract:", error);
    }
  }

  return ncommerce;
}

// Execute the deployment
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = main;
