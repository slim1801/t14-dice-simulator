import styled from "styled-components";
import { Factions } from "../types";

interface FactionBackgroundImageProps {
  faction: Factions;
}

export const FactionBackgroundImage = styled.div<FactionBackgroundImageProps>`
  overflow: hidden;

  &:before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.2;
    z-index: -1;
    background-image: url(${(props) =>
      `/images/factions/${props.faction}.webp`});
    background-repeat: no-repeat;
    background-position: 50% 20%;
    background-size: cover;
  }
`;
