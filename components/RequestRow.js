import React from "react";
import { Table, Button } from "semantic-ui-react";

import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";

const RequestRow = ({ request, address, id, approversCount }) => {
  const { Row, Cell } = Table;
  const { description, value, recipient, approvalCount, complete } = request;

  const readyToFinalize =
    parseInt(approvalCount) > parseInt(approversCount) / 2;

  const handleApprove = async () => {
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(id).send({
      from: accounts[0],
    });
  };

  const handleFinalize = async () => {
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(id).send({
      from: accounts[0],
    });
  };

  return (
    <Row disabled={complete} positive={readyToFinalize && !complete}>
      <Cell>{id}</Cell>
      <Cell>{description}</Cell>
      <Cell>{web3.utils.fromWei(value, "ether")}</Cell>
      <Cell>{recipient}</Cell>
      <Cell>
        {parseInt(approvalCount)}/{parseInt(approversCount)}
      </Cell>
      <Cell>
        {!complete && (
          <Button color="green" basic onClick={handleApprove}>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {!complete && (
          <Button color="teal" basic onClick={handleFinalize}>
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
};

export default RequestRow;
