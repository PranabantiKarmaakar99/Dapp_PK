// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { ethers, upgrades } = require("hardhat");


async function getBalances(address){

const balanceBigInt = await hre.ethers.provider.getBalance(address);
return hre.ethers.utils.formatEther(balanceBigInt);

}

async function consoleBalances(addresses) {
let counter = 0;
for (const address of addresses) {

   console.log (`Address ${counter} balance:` , await getBalances(address))

};

counter++



}

async function consoleLists(lists) {

  for (const list of lists) {
   
    const timestamp = list.timestamp;
    const name = list.name;
    const sender = list.sender;
    const message = list.message;


    console.log(`At ${timestamp},name: ${name},address: ${sender},message: ${message}`)


  }



}

async function main() {

  const [owner,from1,from2,from3] = await hre.ethers.getSigners();

  // const contract = await hre.ethers.deployContract("Chai");

  // await contract.waitForDeployment(1);
  const Chai = await ethers.getContractFactory("Chai");
  const contract = await Chai.deploy();

  //await contract.deployed();

  //await contract.deployTransaction.wait(1);
  console.log("Address of Contract",contract.address);

  const addresses = [owner.address,from1.address,from2.address,from3.address];
  console.log ("Before buying chai");
  await consoleBalances(addresses);


  const amount = {value:hre.ethers.utils.parseEther("1")};
   await contract.connect(from1).TransferMoney("from1","very nice chai",amount);
   await contract.connect(from2).TransferMoney("from2","very nice course",amount);
   await contract.connect(from3).TransferMoney("from3","great work",amount);


   console.log ("After buying chai");
   await consoleBalances(addresses);







 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
