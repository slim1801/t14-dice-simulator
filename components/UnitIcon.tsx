import Image from "next/image";
import styled, { css } from "styled-components";
import { Factions, Units } from "../types";
import { StylelessButton } from "./StylelessButton";
import IconImage from "./IconImage";

interface UnitIconProps {
  faction: Factions | "Neutral";
  unit: Units;
  upgraded?: boolean;
  hideUpgrade?: boolean;
  onUpgraded?: (upgraded: boolean) => void;
  width: number;
}

const IconContainer = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
`;

interface IconWrapperProps {
  width: number;
}

const IconWrapper = styled.div<IconWrapperProps>`
  margin-left: 40px;
  width: ${(props) => props.width}px;
  height: 100%;
  position: relative;
`;

interface UpgradeButtonProps {
  upgraded?: boolean;
}

const UpgradeButton = styled(StylelessButton)<UpgradeButtonProps>`
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  color: grey;
  border: 1px solid white;
  font-size: 11px;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  left: 0;

  ${(props) =>
    props.upgraded &&
    css`
      background-color: white;
      color: black;
    `}
`;

const UnitIcon: React.FunctionComponent<UnitIconProps> = ({
  faction,
  unit,
  upgraded,
  hideUpgrade,
  onUpgraded,
  width,
}) => {
  return (
    <IconContainer>
      <IconWrapper width={width}>
        <IconImage faction={faction} unit={unit} />
      </IconWrapper>
      {!hideUpgrade && (
        <UpgradeButton
          onClick={() => onUpgraded?.(!upgraded)}
          upgraded={upgraded}
        >
          ^Up
        </UpgradeButton>
      )}
    </IconContainer>
  );
};

export default UnitIcon;
