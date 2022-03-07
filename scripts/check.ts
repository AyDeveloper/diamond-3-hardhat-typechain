import { ContractReceipt } from "ethers";
import { ethers } from "hardhat";
import { DiamondCutFacet } from "../typechain-types";
import { FacetCutAction, getSelectors } from "./libraries/diamond";

async function main() {
  // const diamondAddr = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const diamondAddr = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";

  let cut = [];
  // deploy new facet
  const t1 = await ethers.getContractFactory("FacetNumber");
  const facet = await t1.deploy();
  await facet.deployed();
  // push the facet into facetCutStruct;
  cut.push({
    facetAddress: facet.address,
    action: FacetCutAction.Add,
    functionSelectors: getSelectors(facet),
  });
  // use the diamondCutFacet to do the upgrade
  const payload = facet.interface.encodeFunctionData("getNum", [6]);
  const cutFacet = await ethers.getContractAt(
    "DiamondCutFacet",
    diamondAddr
  ) 

  await cutFacet.diamondCut(cut, diamondAddr, payload);
  const test = await ethers.getContractAt("FacetNumber", diamondAddr);
  //@ts-ignore
  console.log(await test.getNum(4));
  

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
