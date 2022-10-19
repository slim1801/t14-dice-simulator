import type { NextPage } from "next";
import Head from "next/head";
import { ALL_FACTIONS } from "../constants/factions";
import FactionImage from "../components/FactionImage";
import { Layout } from "../components/Layout";
import Link from "next/link";
import styled from "styled-components";

const Heading = styled.h1`
  text-align: center;
`;

const ImageGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 10px;
  row-gap: 10px;
`;

const ImageCell = styled.div``;

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>TI4 Dice Simulator</title>
        <meta name="description" content="Dice Simulator for TI4" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <Heading>TI4 Dice Simulator</Heading>
          <ImageGrid>
            {ALL_FACTIONS.map((faction) => (
              <ImageCell key={faction}>
                <Link href={`/${faction}`}>
                  <a>
                    <FactionImage faction={faction} />
                  </a>
                </Link>
              </ImageCell>
            ))}
          </ImageGrid>
        </Layout>
      </main>
    </div>
  );
};

export default Home;
