import { chakra, IconButton, Tooltip as CTooltip } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}
export const Tooltip = (props: Props) => {
  return <CTooltip>{props.children}</CTooltip>;
};

// export const RoundIconBtn = chakra(IconButton, {
//   baseStyle: {
// }
// })
