import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";

import Layout from "../../../components/Layout";
import { Link } from "../../../routes";

const RequestIndex = () => {
  const router = useRouter();
  const [address, setAddress] = useState("");

  useEffect(() => {
    const handleRouteChange = async () => {
      const currentPath = router.asPath;
      setAddress(currentPath.slice(11, 53));
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
