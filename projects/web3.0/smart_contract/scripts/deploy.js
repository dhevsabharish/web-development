const main = async () => {
  const transactionsFactory = await hre.ethers.getContractFactory("Transactions");
  const transactionsContract = await transactionsFactory.deploy();

  await transactionsContract.deployed();

  console.log("Transactions address: ", transactionsContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();

// 0x7CaecD89D98d86562c4e95C3a8eb359E0edDD033
// 0xA53A8Da31d27dc0bBAe43bAfDD53b8cb7Cad697A
// 0x03BdBc8307B21194811d8f7ADD7E742F60cDC89d