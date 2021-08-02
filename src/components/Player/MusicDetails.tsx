import React from 'react';
import { Grid, Heading, HStack, Text, Icon } from '@chakra-ui/react';
import {
  RiHeadphoneLine,
  RiUserVoiceLine,
  RiAlbumLine,
  RiTimerLine,
  RiTimerFlashLine,
  RiCalendarEventFill,
  RiPlayListAddLine,
  RiBarChartFill,
  RiOrderPlayFill,
} from 'react-icons/ri';
import {
  AnimatePresence,
  AnimateSharedLayout,
  useAnimation,
} from 'framer-motion';
import { MotionHeading, MotionText } from '../Wrappers/FramerComponents';
import { sToMMSS } from '../../utils/time';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import { IconType } from 'react-icons';

const musicDetailSchema = [
  { text: 'title', icon: RiHeadphoneLine },
  { text: 'artist', icon: RiUserVoiceLine },
  { text: 'album', icon: RiAlbumLine },
  { text: 'length', icon: RiTimerLine },
  { text: 'bpm', icon: RiTimerFlashLine },
  { text: 'year', icon: RiCalendarEventFill },
  { text: 'genre', icon: RiBarChartFill },
  { text: 'track', icon: RiOrderPlayFill },
];
interface MusicDetailCellPropT {
  text: string;
  icon: IconType | undefined;
  textColor: string | undefined;
}
const MusicDetailCell = (props: MusicDetailCellPropT) => {
  const { text, icon, textColor } = props;
  return (
    <HStack alignItems="center" spacing={1}>
      {icon && <Icon as={icon} color={textColor || 'white'} />}
      <Text className="player-details-type">{text}</Text>
    </HStack>
  );
};

interface Props {}

const MusicDetails = (props: Props) => {
  const { player } = useSelector((state: RootState) => ({
    player: state.player,
  }));

  return (
    <Grid className="player-details-grid" templateColumns="100px 1fr" w="100%">
      {musicDetailSchema.map((detail, i) => {
        const { text, icon } = detail;
        let dataText = '';

        if (!player.current[text]) return <></>;

        switch (text) {
          case 'length':
            dataText = sToMMSS(+player.current[text]);
            break;
          default:
            dataText = player.current[text];
            break;
        }
        return (
          <>
            <MusicDetailCell
              textColor={player.palette.lightVibrant}
              key={text}
              text={text}
              icon={icon}
            />
            {text === 'title' ? (
              <MotionHeading
                mx={-4}
                px={4}
                overflow="hidden"
                whiteSpace="break-spaces"
                paddingTop={8}
                paddingBottom={4}
                fontSize="7xl"
                lineHeight="1"
                bgGradient={`linear(to-b, white, ${
                  player.palette.lightVibrant || 'white'
                })`}
                bgClip="text"
                placeSelf="flex-start"
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.5 }}
                initial={{ opacity: 0 }}
                id="song-title-text"
              >
                {dataText}
              </MotionHeading>
            ) : (
              <MotionText
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 * i, delay: 1 }}
                initial={{ opacity: 0 }}
                key={dataText}
                color={text === '' ? player.palette.vibrant : ''}
                fontSize="2xl"
              >
                {dataText}
              </MotionText>
            )}
          </>
        );
      })}
    </Grid>
  );
};

export default MusicDetails;
