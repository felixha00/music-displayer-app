import {
  ButtonGroup,
  IconButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  Portal,
} from '@chakra-ui/react';
import React from 'react';
import {
  RiPauseMiniFill,
  RiPlayMiniFill,
  RiSkipBackMiniFill,
  RiSkipForwardMiniFill,
  RiVolumeUpFill,
  RiShuffleFill,
} from 'react-icons/ri';
import { useSelector } from 'react-redux';
import playerActions, {
  setVol,
  shuffleQueue,
  togglePlay,
} from '../../app/store/actions/playerActions';
import { RootState } from '../../app/store/store';
import './playback-control.scss';

interface Props {
  playerRef: React.MutableRefObject<any>;
  onNext: () => void;
  onPrev: () => void;
  onVolChange: (vol: number) => void;
}

const PlaybackControl = (props: Props) => {
  const { playerRef } = props;

  const { player } = useSelector((state: RootState) => ({
    player: state.player,
  }));

  if (playerRef.current === undefined) {
    return null;
  }
  const handlePlayPause = () => {
    if (playerRef.current !== undefined) {
      if (player.playing) {
        playerRef.current.audioEl.current.pause();
      } else {
        playerRef.current.audioEl.current.play();
      }
      togglePlay();
    }
  };

  const handleShuffle = () => {
    shuffleQueue();
  };

  const handleNext = () => {
    props.onNext();
  };

  const handlePrev = () => {
    props.onPrev();
  };

  const handleVolChange = (n: number) => {
    props.onVolChange(n / 100);
  };

  const handleVolChangeEnd = (n: number) => {
    setVol(n / 100);
  };

  return (
    <>
      <ButtonGroup w="100%" alignItems="center">
        <IconButton
          aria-label="previous"
          variant="ghost"
          isRound
          as={RiSkipBackMiniFill}
          onClick={handlePrev}
          _hover={{ color: 'white' }}
          color={player.palette.lightVibrant}
        />
        <IconButton
          aria-label={player.playing ? 'pause' : 'play'}
          isRound
          size="md"
          color={player.palette.lightVibrant}
          onClick={handlePlayPause}
          as={player.playing ? RiPauseMiniFill : RiPlayMiniFill}
        />
        <IconButton
          aria-label="next"
          isRound
          variant="unstyled"
          color={player.palette.lightVibrant}
          _hover={{ color: 'white' }}
          as={RiSkipForwardMiniFill}
          onClick={handleNext}
        />
        <Spacer />
        <IconButton
          as={RiShuffleFill}
          onClick={handleShuffle}
          color="whiteAlpha.700"
          _hover={{ color: 'white' }}
          aria-label="next"
          isRound
          variant="unstyled"
          size="14px"
        />
        <Menu placement="left-start" matchWidth>
          <MenuButton
            className="vol-btn"
            as={IconButton}
            aria-label="next"
            isRound
            variant="ghost"
            size="md"
            icon={<RiVolumeUpFill style={{ display: 'inline' }} />}
          />
          <Portal>
            <MenuList
              border="none"
              bg="black"
              maxWidth="fit-content"
              minWidth="fit-content"
              p={2}
              pl={4}
              pr={5}
            >
              <Slider
                aria-label="slider-ex-3"
                defaultValue={playerRef.current.audioEl.current.volume * 100}
                onChange={handleVolChange}
                onChangeEnd={handleVolChangeEnd}
                orientation="horizontal"
                minW="32"
              >
                <SliderTrack>
                  <SliderFilledTrack bg={player.palette.lightVibrant} />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </MenuList>
          </Portal>
        </Menu>
      </ButtonGroup>
    </>
  );
};

export default PlaybackControl;
