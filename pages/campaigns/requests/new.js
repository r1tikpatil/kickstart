import React, { useState, useEffect } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import { useRouter } from "next/router";

import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout";

const RequestNew = () => {
  const defaultValue = {
    description: "",
    value: "",
    recipient: "",
  };

  const router = useRouter();
  const [address, setAddress] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(defaultValue);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMsg("");
    const campaign = Campaign(address);
    try {
      const { description, value, recipient } = values;
      const accounts = await web3.eth.getAccounts();

      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({
          from: accounts[0],
        });

      Router.pushRoute(`/campaigns/${address}/requests`);
    } catch (err) {
      setErrorMsg(err.message);
    }
    setLoading(false);
    setValues(defaultValue);
  };

  useEffect(() => {
    const handleRouteChange = async () => {
      const currentPath = router.asPath;
      setAddress(currentPath.slice(11, 53));
    };
    handleRouteChange();
  }, [router.asPath]);

  return (
    <Layout>
      <Link route={`/campaigns/${address}/requests`}>
        <a>Back</a>
      </Link>
      <h3>Create a Request</h3>

      <Form onSubmit={handleSubmit} error={errorMsg !== ""}>
        <Form.Field>
          <label>Description</label>
          <Input
            name="description"
            onChange={handleChange}
            value={values.description}
          />
        </Form.Field>

        <Form.Field>
          <label>Value in Ether</label>
          <Input name="value" onChange={handleChange} value={values.value} />
        </Form.Field>

        <Form.Field>
          <label>Recipient</label>
          <Input
            name="recipient"
            onChange={handleChange}
            value={values.recipient}
          />
        </Form.Field>

        <Message error header="!Oops" content={errorMsg} />

        <Button primary loading={loading}>
          Create!{" "}
        </Button>
      </Form>
    </Layout>
  );
};

export default RequestNew;
