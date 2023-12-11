import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Card, Grid, Button } from "semantic-ui-react";

import web3 from "../../ethereum/web3";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

const CampaignShow = () => {
  const router = useRouter();

  const [values, setValues] = useState({
    minimumContribution: "",
    balance: "",
    requestsCount: "",
    approversCount: "",
    manager: "",
    address: "",
  });

  useEffect(() => {
    const handleRouteChange = async () => {
      const currentPath = router.asPath;
      const campaign = Campaign(currentPath.slice(11));
      const summary = await campaign.methods.getSummary().call();

      const obj = {
        minimumContribution: summary[0],
        balance: summary[1],
        requestsCount: summary[2],
        approversCount: summary[3],
        manager: summary[4],
        address: currentPath.slice(11),
      };

      setValues(obj);
    };
    handleRouteChange();
  }, [router.asPath]);

  const renderCards = () => {
    const {
      minimumContribution,
      balance,
      requestsCount,
      approversCount,
      manager,
    } = values;

    const items = [
      {
        header: manager,
        description:
          "The manager created this campaign and can create request to withdraw money.",
        meta: "Address of Manager",
        style: { overflowWrap: "break-word" },
      },
      {
        header: `${minimumContribution}`,
        description:
          "You must contribute at least this much wei to become an approver.",
        meta: "Minimum Contribution (wei)",
      },
      {
        header: `${requestsCount}`,
        description:
          "A request tries to withdraw money from the contract. Request must be approved by approvers.",
        meta: "Number of Requests",
      },
      {
        header: `${approversCount}`,
        description:
          "Number of people who have already donated to this campaign.",
        meta: "Number of Approvers",
      },
      {
        header: web3.utils.fromWei(`${balance}`, "ether"),
        description:
          "The balance is how much money this campaign has left to spend.",
        meta: "Campaign Balance (ether)",
      },
    ];

    return <Card.Group items={items}></Card.Group>;
  };

  return (
    <Layout>
      <h3>Campaign Show!!</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>{renderCards()}</Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={values.address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link route={`/campaigns/${values.address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

export default CampaignShow;
