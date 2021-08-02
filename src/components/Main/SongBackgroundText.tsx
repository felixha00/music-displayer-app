import { Box } from '@chakra-ui/layout';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import { MotionHeading } from '../Wrappers/FramerComponents';

const SongBackgroundText = () => {
  const { title, artist, album, palette } = useSelector((state: RootState) => ({
    title: state.player.current?.title,
    artist: state.player.current?.artist,
    album: state.player.current?.album,
    palette: state.player.palette,
  }));

  const backgroundString = React.useMemo(() => {
    let str: string | undefined = title + artist + album;
    if (str) {
      str = str.replace(/\s/g, '');
      return str + str + str || '';
    }

    // return str.replace(/\s+/g, '');
  }, [title, artist, album]);

  //   if (loadingSelector('app')) {
  //     return <Loading loading={loadingSelector('app')} />;
  //   }
  return (
    <Box
      className="flex-absolute-box"
      opacity={1}
      w="55%"
      textAlign="left"
      bottom="auto"
      left="-50px"
      top="-25px"
    >
      <MotionHeading
        className="player-splash-text"
        id="player-splash-text"
        fontSize="200"
        fontFamily="Clash Display"
        bgGradient={`linear(to-r, ${palette.lightVibrant}, transparent)`}
        bgClip="text"
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -600 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        key={backgroundString}
      >
        {backgroundString}
      </MotionHeading>
    </Box>
  );
};

export default SongBackgroundText;
