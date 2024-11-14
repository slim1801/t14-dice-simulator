import styled from "styled-components";

interface NumUnitsProps {
  numUnits: number;
  rollsPerUnit?: number;
}

const NumUnitsComponent = styled.div`
  height: 100%;
  width: 30px;
  font-size: 12px;
  display: flex;
  align-items: center;
`;

const NumUnits: React.FunctionComponent<NumUnitsProps> = ({
  numUnits,
  rollsPerUnit,
}) => {
  return (
    <NumUnitsComponent>
      {rollsPerUnit !== undefined && `(${rollsPerUnit})`}x{numUnits}
    </NumUnitsComponent>
  );
};

export default NumUnits;
