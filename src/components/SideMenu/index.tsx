import {
  Flex,
  useDisclosure,
  Icon,
  Box,
  Logo,
  Text,
  Button,
  VStack,
  Heading
} from "@chakra-ui/react"

import { useRouter } from "next/router"

export const SideMenu = () => {
  const router = useRouter();

  return(
    <VStack h="100vh" my={5} spacing={8} w="15%" position="absolute" boxShadow="lg" bgColor="white">
      <Heading as="h3" fontSize="16px">Governance</Heading>
      <Button onClick={() => {router.push('/')}} w="80%" fontSize="15px">Connect Wallet</Button>
      <Button onClick={() => {router.push('/council')}} w="80%" fontSize="15px">Council</Button>
      <Button onClick={() => {router.push('/treasury')}} w="80%" fontSize="15px">Treasury</Button>
      <Button onClick={() => {router.push('/bounties')}} w="80%" fontSize="15px">Bounties</Button>
      <Button onClick={() => {router.push('/technical-committee')}} w="80%" fontSize="15px">Tech. Committee</Button>
      <Button onClick={() => {router.push('/')}} w="80%" fontSize="15px">Change Network</Button>
    </VStack>
  )
};

export default SideMenu;