import {
  AspectRatio,
  Badge,
  Box,
  CircularProgress,
  HStack,
  Image,
  Spacer,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { usePalette } from 'react-palette';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';

const NextSongBadge = () => {
  const { next } = useSelector((state: RootState) => ({
    next: state.player.next,
  }));

  const { data, loading, error } = usePalette(next?.image);

  return (
    <Box w="100%">
      <HStack justifyContent="flex-end">
        <Badge size="md" color={!next ? 'white' : data.lightVibrant}>
          Next -&gt;
        </Badge>
        <Spacer />

        {next ? (
          <Box display="flex" alignItems="center">
            <AspectRatio width="25px" ratio={1}>
              <Image borderRadius="9999px" src={next.image} />
            </AspectRatio>
            <Text textAlign="right" fontSize="xs" ml={2}>
              <span style={{ fontWeight: 'bold' }}>{next?.title}</span> by{' '}
              {next?.artist}, on{' '}
              <span
                style={{ color: `${data.lightVibrant}`, fontWeight: 'bold' }}
              >
                {next?.album}
              </span>
            </Text>
          </Box>
        ) : (
          <CircularProgress isIndeterminate size={4} color="white" />
        )}
      </HStack>
    </Box>
  );
};

export default NextSongBadge;
