import React, { useState, useEffect } from "react";
import { Card, Button } from "semantic-ui-react";

import Layout from "../components/Layout";
import factory from "../ethereum/factory";
import { Link } from "../routes";

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
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>

        <Link route="/campaigns/new">
          <a>
            <Button
              content="Create Campaign"
              icon="add circle"
              primary
              labelPosition="left"
              floated="right"
            />
          </a>
        </Link>

        {renderCampaigns()}
      </div>
    </Layout>
  );
};

export default CampaignIndex;
