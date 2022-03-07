import { ContractReceipt } from "ethers";
import { ethers } from "hardhat";
import { DiamondCutFacet } from "../typechain-types";
import { FacetCutAction, getSelectors } from "./libraries/diamond";

async function main() {
  const diamondAddr = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";

  let cut = [];
  // deploy new facet
  const t4 = await ethers.getContractFactory("Facet2");
  const facet = await t4.deploy();
  await facet.deployed();
  // push the facet into facetCutStruct;
  cut.push({
    facetAddress: facet.address,
    action: FacetCutAction.Add,
    functionSelectors: getSelectors(facet),
  });
  // use the diamondCutFacet to do the upgrade
  const payload = facet.interface.encodeFunctionData('sumUp', [2,4]);
  const cutFacet = await ethers.getContractAt(
    "DiamondCutFacet",
    diamondAddr
  ) 
  await cutFacet.diamondCut(cut, diamondAddr, payload);

  const test5 = await ethers.getContractAt("Facet2", diamondAddr);
  //@ts-ignore
  console.log(await test5.sumUp(4,7));
  

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
