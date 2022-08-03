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

  const [addresses, setAddresses] = React.useState([]);
  const [proposalCount, setProposalCount] = React.useState(0);
  const [proposalList, setProposalList] = React.useState([]);
  const [memberCount, setMemberCount] = React.useState(0);

  React.useEffect(() => {
    const getTechnicalCommittee = async () => {
      const technicalCommitteeMembers = await data.query.technicalCommittee.members.call();
      const technicalCommitteeProposalCount = await data.query.technicalCommittee.proposalCount.call();
      const technicalCommitteeProposals = await data.query.technicalCommittee.proposals.call();
      const technicalCommitteeMemberCount = await data.query.technicalCommittee.members.call();


      setAddresses(technicalCommitteeMembers.toJSON())
      setProposalCount(technicalCommitteeProposalCount.toJSON())
      setProposalList(technicalCommitteeProposals.toJSON())
      setMemberCount(technicalCommitteeMemberCount.toJSON().length)
    }
    getTechnicalCommittee();
  }, [])

  return (

    <VStack justifyContent="center" alignItems="center" h="100vh">
      <Grid h="25%" w="60%" gap={5} gridTemplateColumns={"1fr 1fr 1fr"}>
      <Flex h="100%" fontWeight="600" borderRadius="sm" justifyContent="center" alignItems="center" boxShadow="md">
        Proposal Count : {proposalCount}
      </Flex>
      <Flex h="100%" fontWeight="600" borderRadius="sm" justifyContent="center" alignItems="center" boxShadow="md">
         Active Proposals : {proposalList.length}
      </Flex>
      <Flex h="100%" fontWeight="600" borderRadius="sm" justifyContent="center" alignItems="center" boxShadow="md">
        Committee Members : {memberCount}
      </Flex>
      </Grid>
      <Box border="1px solid white" w="60%">
      <TableComponent name={"MEMBERS"} addresses={addresses} />
      </Box>
    </VStack>
  );
}

export default Structure;




