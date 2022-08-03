import React from "react";
import { ContextProvider } from "../../src/context/Provider/ContextProvider";
import {
  Flex,
  Box,
  VStack,
  Grid
} from '@chakra-ui/react'
import TableComponent from "./Table";

const Structure = () => {
  const { data } = React.useContext(ContextProvider);

  const [bountyCountNum, setBountyCount] = React.useState(0);
  const [bountyApprovals, setBountyApprovals] = React.useState([]);
  const [bountyDescriptions, setBountyDescriptions] = React.useState([]);
  const [bountyInfo, setBountyInfo] = React.useState([]);
  const [bountyFunds, setBountyFunds] = React.useState([]);
  const [childBounties, setChildBounties] = React.useState([]);

  React.useEffect(() => {
    const getBounties = async () => {
      const bountyApprovals = await data.query.bounties.bountyApprovals.call();
      const bountyCount = await data.query.bounties.bountyCount.call();
      const bountyDescriptions = await Promise.all(Array.from({ length: bountyCount.toNumber() }, (_, index) => data.query.bounties.bountyDescriptions(index)));
      const bountiesThathaveBeenMade = await Promise.all(Array.from({ length: bountyCount.toNumber() }, (_, index) => data.query.bounties.bounties(index)));
      const childBountyCount = await data.query.childBounties.childBountyCount.call();
     const bountyData = bountyDescriptions.map((bountyDescription, index) => {
       return {
         bountyDescription: bountyDescription.toHuman(),
         bounty: bountiesThathaveBeenMade[index].toJSON(),
       }
     })

      setBountyCount(bountyCount.toJSON());
      setBountyApprovals(bountyApprovals.toHuman());
      setBountyDescriptions(bountyDescriptions.map((bounty) => bounty.toHuman()));
      setBountyInfo(bountyData.map((bounty, i) => bounty.bounty));
      setBountyFunds(bountyData.filter((bounty, i) => bounty.bounty !== null).map((bounty, i) => typeof bounty.bounty.value === 'number' && bounty.bounty.value).reduce((a, b) => a + b, 0));
      setChildBounties(childBountyCount.toJSON());
    }
    getBounties();
  }, [])

  return (

    <VStack justifyContent="center" alignItems="center" h="100vh">
      <Grid h="25%" w="60%" gap={5} gridTemplateColumns={"1fr 1fr 1fr"}>
      <Flex h="100%" fontWeight="600" borderRadius="sm" justifyContent="center" alignItems="center" boxShadow="md">
        Bounty Count : {bountyCountNum}
      </Flex>
      <Flex h="100%" fontWeight="600" borderRadius="sm" justifyContent="center" alignItems="center" boxShadow="md">
         Active Proposals : {bountyFunds/1000000000000 + "MDOT"}
      </Flex>
      <Flex h="100%" fontWeight="600" borderRadius="sm" justifyContent="center" alignItems="center" boxShadow="md">
        Child Bounty Counts : {childBounties}
      </Flex>
      </Grid>
      <Box border="1px solid white" w="60%">
       <TableComponent name={"Bounty"} addresses={bountyInfo} />
      </Box>
    </VStack>
  );
}

export default Structure;




