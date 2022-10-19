import { FunctionComponent } from "react";
import styled from "styled-components";
import Image from "next/image";
import { FACTION_NAMES } from "../constants/factions";
import { Factions } from "../types";
import { FactionBackgroundImage } from "./FactionBackgroundImage";

const ImageContainer = styled(FactionBackgroundImage)`
  border: 3px solid white;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  height: 180px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
`;

const Label = styled.b`
  margin-top: 20px;
`;

interface FactionImageProps {
  faction: Factions;
}

const FactionImage: FunctionComponent<FactionImageProps> = ({ faction }) => {
  return (
    <ImageContainer faction={faction}>
      <Image
        alt={faction}
        src={`/images/symbols/${faction}.png`}
        width={75}
        height={75}
      />
      <Label>{FACTION_NAMES[faction]}</Label>
    </ImageContainer>
  );
};

export default FactionImage;
