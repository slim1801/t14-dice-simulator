import styled, { css } from "styled-components";
import { PropsWithChildren } from "react";
import NumUnits from "./NumUnits";
import RoundButton from "./RoundButton";
import Combat from "./Combat";

interface UnitRowProps {
  rolls?: number;
  combat?: number;
  limit?: number;
  numUnits: number;
  setNumUnits: (num: number) => void;
}

const RoundButtonContainer = styled.div`
  margin-left: 12px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
  position: relative;
`;

const UnitRow: React.FunctionComponent<PropsWithChildren<UnitRowProps>> = ({
  children,
  rolls,
  combat,
  numUnits,
  setNumUnits,
  limit,
}) => {
  return (
    <Row>
      {children}
      <div style={{ flex: 1 }}></div>
      <Combat combat={combat} />
      <NumUnits rollsPerUnit={rolls} numUnits={numUnits} />
      <RoundButtonContainer>
        <RoundButton
          radius={20}
          disabled={numUnits === 0}
          onClick={() => setNumUnits(numUnits - 1)}
        >
          -
        </RoundButton>
      </RoundButtonContainer>
      <RoundButtonContainer>
        <RoundButton
          radius={20}
          disabled={limit !== undefined && numUnits === limit}
          onClick={() => setNumUnits(numUnits + 1)}
        >
          +
        </RoundButton>
      </RoundButtonContainer>
    </Row>
  );
};

export default UnitRow;
