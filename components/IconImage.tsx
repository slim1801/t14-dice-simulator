import Image from "next/image";
import styled from "styled-components";
import { FACTION_COLORS } from "../constants/factions";
import { Factions, Units } from "../types";

interface IconImageProps {
  faction: Factions | "Neutral";
  unit: Units;
}

interface IconImageComponentProps {
  faction: Factions | "Neutral";
}

const IconImageComponent = styled(Image)<IconImageComponentProps>`
  filter: ${(props) => FACTION_COLORS[props.faction]};
`;

const IconImage: React.FunctionComponent<IconImageProps> = ({
  faction,
  unit,
}) => {
  let resolvedUnit = unit;
  if (unit === "Memoria") {
    resolvedUnit = "Flagship";
  }
  if (unit === "Experimental Battlestation" || unit === "Ul The Progenitor") {
    resolvedUnit = "Space_Dock";
  }
  return (
    <IconImageComponent
      alt={unit}
      faction={faction}
      src={`/images/units/${resolvedUnit}.png`}
      layout="fill"
      objectFit="contain"
    />
  );
};

export default IconImage;
