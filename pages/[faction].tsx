import Faction from "../components/Faction";
import { Layout } from "../components/Layout";
import { ALL_FACTIONS, Factions } from "../constants/factions";

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
  const paths = ALL_FACTIONS.map((faction) => ({ params: { faction } }));
  return {
    paths,
    fallback: false,
  };
}

export default FactionPage;
