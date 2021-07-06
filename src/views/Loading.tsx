import { Box, CircularProgress } from '@chakra-ui/react';
import React from 'react';

interface Props {
  loading: boolean;
}

const Loading = (props: Props) => {
  const { loading } = props;
  if (!loading) {
    return null;
  }
  return (
    <Box
      bg="black"
      zIndex="3"
      top={0}
      left={0}
      right={0}
      bottom={0}
      position="absolute"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress isIndeterminate capIsRound />
    </Box>
  );
};

export default Loading;
