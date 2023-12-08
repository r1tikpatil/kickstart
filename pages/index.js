import React, { useState, useEffect } from "react";
import { Card } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import factory from "../ethereum/factory";

const CampaignIndex = () => {
  const [campaigns, setCampaigns] = useState([]);

  const fetchDeployedCampaigns = async () => {
    const allCampaigns = await factory.methods.getDeployedCampaigns().call();
    setCampaigns(allCampaigns);
  };

  useEffect(() => {
    fetchDeployedCampaigns();
  }, []);

  const renderCampaigns = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: <a>View Campaign</a>,
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  };

  return <div>{renderCampaigns()}</div>;
};

export default CampaignIndex;
