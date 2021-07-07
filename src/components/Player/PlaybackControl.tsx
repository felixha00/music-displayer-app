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
import {
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
    if (playerRef.current !== undefined) {
      if (playerRef.current.audioEl.current.currentTime > 3) {
        playerRef.current.audioEl.current.currentTime = 0;
      } else if (player.songIndex) {
        props.onPrev();
      }
    }
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
          isDisabled={player.songIndex === 0}
          _hover={{ color: 'white' }}
          color="whiteAlpha.800"
        />
        <IconButton
          aria-label={player.playing ? 'pause' : 'play'}
          isRound
          size="md"
          color="whiteAlpha.800"
          backgroundColor="whiteAlpha.200"
          onClick={handlePlayPause}
          as={player.playing ? RiPauseMiniFill : RiPlayMiniFill}
        />
        <IconButton
          aria-label="next"
          isRound
          variant="unstyled"
          color="whiteAlpha.800"
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
              {}
              <Slider
                aria-label="slider-ex-3"
                defaultValue={
                  playerRef.current &&
                  playerRef.current.audioEl.current.volume * 100
                }
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
