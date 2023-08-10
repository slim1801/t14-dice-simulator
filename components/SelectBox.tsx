import { ChangeEventHandler, useEffect, useState } from "react";
import styled from "styled-components";

interface SelectBoxProps {
  value?: string;
  options?: { label: string; value: string }[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

const SelectBoxComponent = styled.select`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  color: grey;
  border: 1px solid grey;
  font-size: 12px;
  background: none;
`;

const SelectBox: React.FunctionComponent<SelectBoxProps> = ({
  value = "",
  options,
  onChange,
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <SelectBoxComponent
      value={localValue}
      onChange={(e) => {
        setLocalValue(e.target.value);
        onChange?.(e);
      }}
    >
      <option value=""> -- select faction tech -- </option>
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </SelectBoxComponent>
  );
};

export default SelectBox;
