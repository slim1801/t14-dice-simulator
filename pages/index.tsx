import type { NextPage } from "next";
import Head from "next/head";
import { ALL_FACTIONS, BASE_POK_FACTIONS } from "../constants/factions";
import FactionImage from "../components/FactionImage";
import { Layout } from "../components/Layout";
import Link from "next/link";
import styled from "styled-components";
import SelectableButton from "../components/SelectableButton";
import { useDiscordantStarsStateContext } from "../providers/discordantStars/discordantStars.provider";
import { DiscordantStarsActionKind } from "../providers/discordantStars/discordantStars.types";
import { ALL_DISCORDANT_FACTIONS } from "../constants/discordantStars/factions";
import { useMemo } from "react";

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

export const DiscordantStarsButtonContainer = styled.div`
  margin-right: 10px;
  margin-bottom: 15px;
  text-align: right;
  display: flex;
  flex-flow: row-reverse;
`;

const Divider = styled.div`
  height: 2px;
  margin-top: 30px;
  margin-bottom: 30px;
  background-color: white;
`;

const ImageCell = styled.div``;

const Home: NextPage = () => {
  const [{ isDiscordantStars }, setDiscordantStarsState] =
    useDiscordantStarsStateContext();

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
          <DiscordantStarsButtonContainer>
            <SelectableButton
              highlightColor="darkviolet"
              selected={isDiscordantStars}
              onClick={() => {
                setDiscordantStarsState?.({
                  type: DiscordantStarsActionKind.INCLUDE_DISCORDANT_STARS,
                  payload: !isDiscordantStars,
                });
              }}
            >
              Include Discordant Stars
            </SelectableButton>
          </DiscordantStarsButtonContainer>
          {isDiscordantStars && (
            <>
              <ImageGrid>
                {ALL_DISCORDANT_FACTIONS.map((faction) => (
                  <ImageCell key={faction}>
                    <Link href={`/${faction}`}>
                      <a>
                        <FactionImage faction={faction} />
                      </a>
                    </Link>
                  </ImageCell>
                ))}
              </ImageGrid>
              <Divider />
            </>
          )}
          <ImageGrid>
            {BASE_POK_FACTIONS.map((faction) => (
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
