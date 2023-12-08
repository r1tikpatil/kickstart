import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";

import Layout from "../../components/Layout";
import Factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

const CampaignNew = () => {
  const [minContribution, setMinContribution] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();
      await Factory.methods.createCampaign(minContribution).send({
        from: accounts[0],
      });
    } catch (error) {
      console.log(error.message);
      setErrorMsg(error.message);
    }
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
        <Button primary type="submit">
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

export default CampaignNew;
