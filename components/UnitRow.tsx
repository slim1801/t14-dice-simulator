import styled, { css } from "styled-components";
import { PropsWithChildren, useState } from "react";
import NumUnits from "./NumUnits";
import RoundButton from "./RoundButton";
import Combat from "./Combat";
import CombatOverride from "./CombatOverride";
import { StylelessButton } from "./StylelessButton";
import { BespokeCombat, Combat as CombatType } from "../types";

interface UnitRowProps {
  rolls?: number;
  combat?: number;
  limit?: number;
  bespokeCombat?: BespokeCombat;
  numUnits: number;
  setNumUnits: (num: number) => void;
  onBespokeCombatApplied?: (value: number) => void;
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

const EditButton = styled(StylelessButton)`
  display: flex;
  border: 1px solid white;
  font-size: 10px;
  padding: 5px;
  margin-left: 10px;
`;

const UnitRow: React.FunctionComponent<PropsWithChildren<UnitRowProps>> = ({
  children,
  rolls,
  combat,
  numUnits,
  bespokeCombat,
  setNumUnits,
  onBespokeCombatApplied,
  limit,
}) => {
  const [isEditModelOpen, setEditModalOpen] = useState(false);

  return (
    <Row>
      {children}
      <div style={{ flex: 1 }}>
        {bespokeCombat && (
          <>
            <EditButton onClick={() => setEditModalOpen(!isEditModelOpen)}>
              Modify
            </EditButton>
            {isEditModelOpen && (
              <CombatOverride
                bespokeCombat={bespokeCombat}
                onClosedButtonClicked={() => setEditModalOpen(false)}
                onApply={(value) => {
                  setEditModalOpen(false);
                  onBespokeCombatApplied?.(value);
                }}
              />
            )}
          </>
        )}
      </div>
      <Combat combat={combat} />
      <NumUnits rollsPerUnit={rolls} numUnits={numUnits} />
      <RoundButtonContainer>
        <RoundButton
          radius={15}
          disabled={numUnits === 0}
          onClick={() => setNumUnits(numUnits - 1)}
        >
          -
        </RoundButton>
      </RoundButtonContainer>
      <RoundButtonContainer>
        <RoundButton
          radius={15}
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
