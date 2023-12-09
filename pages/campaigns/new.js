import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";

import Layout from "../../components/Layout";
import Factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

const CampaignNew = () => {
  const [minContribution, setMinContribution] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      console.log(parseInt(minContribution));
      const accounts = await web3.eth.getAccounts();
      await Factory.methods.createCampaign(minContribution).send({
        from: accounts[0],
      });
      Router.pushRoute("/");
    } catch (error) {
      setErrorMsg(error.message);
    }

    setMinContribution("");
    setLoading(false);
  };

  return (
    <Layout>
      <h3>Create a Campaign</h3>

      <Form onSubmit={handleSubmit} error={errorMsg !== ""}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            placeholder=""
            labelPosition="right"
            value={minContribution}
            onChange={(e) => setMinContribution(e.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMsg} />
        <Button loading={loading} primary type="submit">
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

export default CampaignNew;
