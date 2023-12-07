import React, { useEffect } from "react";
import factory from "../ethereum/factory";

const CampaignIndex = () => {
    
  const fetchDeployedCampaigns = async () => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    console.log(campaigns);
  };

  useEffect(() => {
    fetchDeployedCampaigns();
  }, []);

  return (
    <div>
      <p>this is me</p>
    </div>
  );
};

export default CampaignIndex;
