import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x07b4065FAFd8Cbc54903D469E7002cac36a22F83"
);

export default instance;
