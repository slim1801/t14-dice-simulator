import Image from "next/image";
import styled from "styled-components";
import { FACTION_COLORS } from "../constants/factions";
import { Factions, Units } from "../types";

interface IconImageProps {
  faction: Factions;
  unit: Units;
}

interface IconImageComponentProps {
  faction: Factions;
}

const IconImageComponent = styled(Image)<IconImageComponentProps>`
  filter: ${(props) => FACTION_COLORS[props.faction]};
`;

const IconImage: React.FunctionComponent<IconImageProps> = ({
  faction,
  unit,
}) => {
  return (
    <IconImageComponent
      alt={unit}
      faction={faction}
      src={`/images/units/${unit}.png`}
      layout="fill"
      objectFit="contain"
    />
  );
};

export default IconImage;
