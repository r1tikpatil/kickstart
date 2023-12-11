import React, { useEffect, useState } from "react";
import { Button, Table } from "semantic-ui-react";
import { useRouter } from "next/router";

import Layout from "../../../components/Layout";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

const RequestIndex = () => {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [requests, setRequests] = useState([]);
  const [requestsCount, setRequestsCount] = useState(0);
  const [approversCount, setApproversCount] = useState(0);

  useEffect(() => {
    const handleRouteChange = async () => {
      const currentPath = router.asPath;
      setAddress(currentPath.slice(11, 53));

      const campaign = Campaign(currentPath.slice(11, 53));
      const requestCount = await campaign.methods.getRequestsCount().call();
      const approversCount = await campaign.methods.approversCount().call();

      const requests = await Promise.all(
        Array(parseInt(requestCount))
          .fill()
          .map((element, index) => {
            return campaign.methods.requests(index).call();
          })
      );

      setRequests(requests);
      setRequestsCount(requestCount);
      setApproversCount(approversCount);
    };
    handleRouteChange();
  }, [router.asPath]);

  const renderRows = () => {
    return requests.map((req, index) => {
      return (
        <RequestRow
          key={index}
          approversCount={approversCount}
          id={index}
          request={req}
          address={address}
        />
      );
    });
  };

  const { Header, Cell, HeaderCell, Row, Body } = Table;

  return (
    <Layout>
      <h3>Request</h3>
      <Link route={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary>Add Request</Button>
        </a>
      </Link>

      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>

        <Body>{renderRows()}</Body>
      </Table>
    </Layout>
  );
};

export default RequestIndex;
