import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xC78Dc0c4eFc26a0250EECeF26a3A994d243C73e4"
);

export default instance;
