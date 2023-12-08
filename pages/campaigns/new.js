import React from "react";
import { Button, Form, Input } from "semantic-ui-react";

import Layout from "../../components/Layout";

const CampaignNew = () => {
  return (
    <Layout>
      <h3>Create a Campaign</h3>

      <Form>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input label="wei" placeholder="" labelPosition="right" />
        </Form.Field>

        <Button primary type="submit">
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

export default CampaignNew;
