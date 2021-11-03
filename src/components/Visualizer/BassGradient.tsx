import { Box } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';

interface Props {
  id: string;
}

const BassGradient = (props: Props) => {
  const { vibrant } = useSelector((state: RootState) => ({
    vibrant: state.player.palette.vibrant,
  }));
  const { id } = props;
  return (
    <>
      <Box
        id={id}
        className="flex-absolute-box"
        opacity="0.75"
        key="bass"
        h="30%"
        textAlign="left"
        bottom="0"
        left="0"
        right="0"
        top="auto"
        zIndex="-2"
        willChange="opacity"
        bgGradient={`linear(to-t, ${vibrant}, transparent)`}
      />
      <Box
        className="bass-gradient-dots flex-absolute-box"
        opacity="0.75"
        h="50%"
        textAlign="left"
        bottom="0"
        left="0"
        right="0"
        top="auto"
        zIndex="-2"
      />
    </>
  );
};

export default BassGradient;
