import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";

import Layout from "../../../components/Layout";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/campaign";

const RequestIndex = () => {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [requests, setRequests] = useState([]);
  const [requestsCount, setRequestsCount] = useState(0);

  useEffect(() => {
    const handleRouteChange = async () => {
      const currentPath = router.asPath;
      setAddress(currentPath.slice(11, 53));

      const campaign = Campaign(currentPath.slice(11, 53));
      const requestCount = await campaign.methods.getRequestsCount().call();

      const requests = await Promise.all(
        Array(parseInt(requestCount))
          .fill()
          .map((element, index) => {
            return campaign.methods.requests(index).call();
          })
      );

      setRequests(requests);
      setRequestsCount(requestCount);
    };
    handleRouteChange();
  }, [router.asPath]);

  return (
    <Layout>
      <h3>Request</h3>
      <Link route={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary>Add Request</Button>
        </a>
      </Link>
    </Layout>
  );
};

export default RequestIndex;
