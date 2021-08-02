import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import { Text } from '@chakra-ui/react';
const extrasList = ['track'];

interface Props {}

const CurrentSongExtras = (props: Props) => {
  const { current } = useSelector((state: RootState) => ({
    current: state.player.current,
  }));
  return (
    <>
      {extrasList.map((extra) => {
        return (
          <>
            <Text>
              {current[extra].no} of {current[extra].no}
            </Text>
          </>
        );
      })}
    </>
  );
};

export default CurrentSongExtras;
