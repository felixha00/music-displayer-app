import { Box } from '@chakra-ui/react';
import React from 'react';
import MoonLoader from 'react-spinners/MoonLoader';

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
      <MoonLoader color={'#ffffff'} />
    </Box>
  );
};

export default Loading;
