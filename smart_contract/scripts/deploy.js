
const hre = require("hardhat");

const main = async() => {

  const Lottery = await hre.ethers.getContractFactory("Lottery");
  const lottery = await Lottery.deploy();

  await lottery.deployed();

  console.log("Transactions deployed to:", transactions.address);
}

  const runMain = async () => {
    try{
      await main();
        process.exit(0);
    }catch(error) {
      console.error(error)
      process.exit(1);
    }
}

runMain();

