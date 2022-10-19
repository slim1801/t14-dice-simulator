import Image from "next/image";
import styled from "styled-components";
import { Units } from "../types";

interface IconImageProps {
  unit: Units;
}

const IconImageComponent = styled(Image)`
  filter: grayscale(100%);
`;

const IconImage: React.FunctionComponent<IconImageProps> = ({ unit }) => {
  return (
    <IconImageComponent
      alt={unit}
      src={`/images/units/${unit}.png`}
      layout="fill"
      objectFit="contain"
    />
  );
};

export default IconImage;
