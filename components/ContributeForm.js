import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";

import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
import { Router } from "../routes";

const ContributeForm = ({ address }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    const campaign = Campaign(address);
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether"),
      });

      Router.replaceRoute(`/campaigns/${address}`);
    } catch (err) {
      setErrorMsg(err.message);
    }
    setLoading(false);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit} error={errorMsg !== ""}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          label="ether"
          labelPosition="right"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Form.Field>
      <Message error header="!Oops" content={errorMsg} />
      <Button loading={loading} primary>
        Contribute!
      </Button>
    </Form>
  );
};

export default ContributeForm;
