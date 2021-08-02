import { Box, Heading, Stack, Image } from '@chakra-ui/react';
import Marquee from 'react-fast-marquee';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import { getSongString } from '../../utils/fn';
import { WhiteLogo } from '../../assets/ImageImports';

const SongMarquee = () => {
  const { title, artist, album, songPath } = useSelector(
    (state: RootState) => ({
      title: state.player.current?.title,
      artist: state.player.current?.artist,
      album: state.player.current?.album,
      songPath: state.player.current?.songPath,
    })
  );
  const songString = React.useMemo(() => {
    return getSongString(title, artist, album);
  }, [title, artist, album]);

  if (!songPath) {
    return null;
  }
  return (
    <Box bg="whiteAlpha.100" backdropFilter="blur(5px)" key={songString}>
      <Marquee gradient={false}>
        <Stack direction="row" spacing={16}>
          {[...Array(20).keys()].map((num) => (
            <>
              <Heading
                key={num}
                fontWeight="semibold"
                fontFamily="Clash Display"
                textTransform="uppercase"
              >
                {songString}
              </Heading>
              {/* <Image src={WhiteLogo} w="18px" /> */}
            </>
          ))}
        </Stack>
      </Marquee>
    </Box>
  );
};

export { SongMarquee as default, SongMarquee };
