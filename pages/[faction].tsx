import Faction from "../components/Faction";
import { Layout } from "../components/Layout";
import { ALL_DISCORDANT_FACTIONS } from "../constants/discordantStars/factions";
import { ALL_FACTIONS } from "../constants/factions";
import { Factions } from "../types";

interface FactionPageProps {
  faction: Factions;
}

const FactionPage: React.FunctionComponent<FactionPageProps> = ({
  faction,
}) => {
  return (
    <Layout>
      <Faction faction={faction} />
    </Layout>
  );
};

interface IFactionPageParams {
  faction: Factions;
}

export async function getStaticProps({
  params,
}: {
  params: IFactionPageParams;
}) {
  return {
    props: {
      faction: params.faction,
    },
  };
}

export async function getStaticPaths() {
  const paths = [...ALL_DISCORDANT_FACTIONS, ...ALL_FACTIONS].map(
    (faction) => ({
      params: { faction },
    })
  );
  return {
    paths,
    fallback: false,
  };
}

export default FactionPage;
