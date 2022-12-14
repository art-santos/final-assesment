import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import React from 'react';
import { ApiPromise, WsProvider } from "@polkadot/api";


export default function Home() {

  React.useEffect(() => {
    const connectToApi = async () => {
      const wsProvider = new WsProvider('wss://rpc.polkadot.io');

      const api = await ApiPromise.create({ provider: wsProvider });
      const consts = api.consts;

      const { council, democracy, referenda, treasury, bounties } = consts

      // const launchPeriod = api.consts.democracy.launchPeriod.toString();
      
      // console.log('launchPeriod', (Math.ceil((parseInt(launchPeriod) / 10)/60)/24), 'days')
      // console.log('democracy', ((referenda)))
      // console.log(council, democracy, treasury, bounties)
      //COUNCIL
      const councilMembers = await api.query.council.members();
      const primeMember = await api.query.council.prime();
      const runnersUp = await api.query.elections.runnersUp();


      //TREASURY
        const treasuryApprovals = await api.query.treasury.approvals.call();

        const treasuryProposalsCount = await api.query.treasury.proposalCount.call();

        const treasuryProposals = await Promise.all(
          Array.from(Array(treasuryProposalsCount.toNumber()).keys()).map(async (index) => {
            const proposal = await api.query.treasury.proposals(index);
            return proposal;
          })
        );

        const treasuryApprovedProposals = await Promise.all(
          treasuryApprovals.map((Number) => api.query.treasury.proposals(Number))
        );

        console.log('treasuryApprovedProposals', treasuryApprovedProposals.map((proposal) => proposal.toJSON()))

        console.log('treasuryProposalsCount', treasuryProposalsCount.toJSON())

        console.log('treasuryProposals', treasuryProposals.map((proposal) => proposal.toJSON()))

        console.log('treasuryApprovals', treasuryApprovals.map((approved) => approved.toString()))       


      return { council, democracy, treasury, bounties };
    }

    connectToApi();
  }, [])

  




  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}
