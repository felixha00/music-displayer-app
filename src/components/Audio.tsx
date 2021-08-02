import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store/store';
import AudioSpectrum from './Visualizer/AudioSpectrum';

interface Props {}

const Audio = (props: Props) => {
  const { player, settings } = useSelector((state: RootState) => ({
    player: state.player,
    settings: state.settings,
  }));
  const { current } = player || {};

  const playerRef = React.useRef<ReactAudioPlayer>(null);
  return (
    <div>
      <AudioSpectrum />
      <ReactAudioPlayer
        ref={playerRef}
        src={`${current?.songPath.replace(/#/g, '%23')}` || ''}
        volume={vol}
      />
    </div>
  );
};

export default Audio;
