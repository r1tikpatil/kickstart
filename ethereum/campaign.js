import web3 from "./web3";
import Campaig from "./build/Campaign.json";

const Campaign = (address) => {
  return new web3.eth.Contract(JSON.parse(Campaig.interface), address);
};

export default Campaign;
