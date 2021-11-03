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
  Progress,
  Text,
  Stack,
} from '@chakra-ui/react';
import React, { useEffect, useCallback, useState } from 'react';
import {
  RiPauseMiniFill,
  RiPlayMiniFill,
  RiSkipBackMiniFill,
  RiSkipForwardMiniFill,
  RiVolumeUpFill,
  RiShuffleFill,
  RiRepeatFill,
  RiRepeatOneFill,
} from 'react-icons/ri';
import { useSelector } from 'react-redux';
import ReactAudioPlayer from 'react-audio-player';
import {
  setVol,
  shuffleQueue,
  togglePlay,
} from '../../app/store/actions/playerActions';
import { RootState } from '../../app/store/store';
import './playback-control.scss';
import { sToMMSS } from '../../utils/time';
import SongSlider from './components/SongSlider';
import { useKey } from 'react-use';
interface Props {
  // playerRef: React.MutableRefObject<any>;
  onNext: () => void;
  onPrev: () => void;
  onVolChange: (vol: number) => void;
}

const controlButtonProps = {
  size: 'md',
  isRound: true,
  variant: 'ghost',
};

const PlaybackControl = (props: Props) => {
  // const { playerRef } = props;
  const playerRef = React.useRef<ReactAudioPlayer>(null);
  const { player, settings } = useSelector((state: RootState) => ({
    player: state.player,
    settings: state.settings,
  }));
  const {
    config: { enableControls },
  } = settings;
  const { vol } = player;

  const [time, setTime] = React.useState(0);
  const [playbackRdy, setPlaybackRdy] = React.useState(false);
  const [playVol, setPlayVol] = useState(vol);
  const [songSliderChanging, setSongSliderChanging] = useState(false);

  const activeControlBtnProps = React.useMemo(
    () => ({
      bg: 'white',
      color: player.palette.vibrant,
    }),
    [player.palette]
  );

  const audioEl = React.useMemo(() => {
    if (player.current) {
      return playerRef?.current?.audioEl.current;
    }
    return null;
  }, [playerRef, player]);

  useEffect(() => {
    if (playerRef.current !== undefined) {
      if (player.playing) {
        const playPromise = audioEl?.play() || undefined;
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Automatic playback started!
              // Show playing UI.
              return true;
            })
            .catch((error) => {
              // Auto-play was prevented
              // Show paused UI.
            });
        }
      } else {
        audioEl?.pause();
      }
    }
  }, [player.playing, audioEl]);

  useEffect(() => {
    if (Math.ceil(time) >= player.current?.length) {
      props.onNext();
    }
  }, [time, props.onNext, player.current?.length]);

  const handlePlayPause = useCallback(() => {
    if (audioEl !== undefined) {
      togglePlay();
    }
  }, [audioEl]);

  const handleShuffle = useCallback(() => {
    shuffleQueue();
  }, []);

  const handleNext = useCallback(() => {
    setTime(0);

    props.onNext();
  }, [props.onNext]);

  const handlePrev = () => {
    if (playerRef.current !== undefined) {
      if (audioEl?.currentTime > 3) {
        if (audioEl) {
          audioEl.currentTime = 0;
        }
      } else if (player.songStack) {
        props.onPrev();
      }
    }
  };

  const handleVolChange = (n: number) => {
    setPlayVol(n / 100);
  };

  const handleVolChangeEnd = (n: number) => {
    setVol(n / 100);
  };

  const handleAudioListen = (t: number) => {
    if (playbackRdy && player.playing && !songSliderChanging) {
      setTime(t);
    }
  };

  const handleAudioRdy = () => {
    setPlaybackRdy(true);
  };

  const setTime0 = () => {
    setTime(0);
  };

  const handleAudioEnd = () => {
    props.onNext();
  };

  // SongSlider fns
  const handleSongSliderChange = (n: number) => {
    setTime((n * player.current.length) / 100);
  };

  const handleSongSliderChangeEnd = (n: number) => {
    if (audioEl) {
      const curTime = (n * player.current.length) / 100;
      setTime(curTime);
      audioEl.currentTime = curTime;
      setSongSliderChanging(false);
    }
  };
  // useKey('e', player.modal ? undefined : handleNext);
  const handleSongSliderChangeStart = () => {
    setSongSliderChanging(true);
  };

  if (!player.current.songPath) {
    return null;
  }
  return (
    <>
      <SongSlider
        time={(time / (player.current?.length || 0)) * 100}
        onChangeStart={handleSongSliderChangeStart}
        onChange={handleSongSliderChange}
        onChangeEnd={handleSongSliderChangeEnd}
      />
      <Text fontSize="sm">{sToMMSS(time)}</Text>
      <ReactAudioPlayer
        key={player.current?.songPath}
        listenInterval={1000}
        id="audio-player"
        volume={playVol}
        src={`${player.current?.songPath.replace(/#/g, '%23')}` || ''}
        autoPlay={playbackRdy && player.playing}
        ref={playerRef}
        onListen={handleAudioListen}
        onCanPlayThrough={handleAudioRdy}
        onAbort={setTime0}
        onEnded={handleAudioEnd}
      />

      {enableControls && (
        <ButtonGroup w="100%" alignItems="center">
          <IconButton
            aria-label="previous"
            variant="ghost"
            isRound
            as={RiSkipBackMiniFill}
            onClick={handlePrev}
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
          <Stack direction="row" spacing={0}>
            <IconButton
              icon={<RiRepeatFill />}
              onClick={handleShuffle}
              aria-label="repeat"
              {...controlButtonProps}
            />
            <IconButton
              icon={<RiShuffleFill />}
              onClick={handleShuffle}
              aria-label="next"
              {...controlButtonProps}
            />
            <Menu placement="left-start" matchWidth>
              <MenuButton
                className="vol-btn"
                as={IconButton}
                aria-label="next"
                {...controlButtonProps}
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
                  {audioEl && (
                    <Slider
                      aria-label="slider-ex-3"
                      defaultValue={audioEl.volume * 100}
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
                  )}
                </MenuList>
              </Portal>
            </Menu>
          </Stack>
        </ButtonGroup>
      )}
    </>
  );
};

export default PlaybackControl;
