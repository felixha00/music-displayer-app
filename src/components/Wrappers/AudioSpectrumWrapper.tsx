import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import { useBass } from '../../utils/hooks';
import AudioSpectrum from '../Visualizer/AudioSpectrum';

interface Props {
  playerRef: React.MutableRefObject<any>;
  onSpectrumData: (data: number) => void;
  disableRenderFrame: boolean;
}

const AudioSpectrumWrapper = (props: Props) => {
  const { playerRef, onSpectrumData } = props;
  const { palette } = useSelector((state: RootState) => ({
    palette: state.player.palette,
  }));

  const handleSpectrumData = (uint8Arr: Uint8Array) => {
    onSpectrumData(uint8Arr[2]);
  };
  return (
    <>
      <AudioSpectrum
        onMusicPlayback={handleSpectrumData}
        className="audio-spectrum"
        id="audio-canvas"
        key={palette.lightVibrant}
        height={125}
        width={252}
        audioEle={playerRef}
        capColor="transparent"
        capHeight={2}
        meterWidth={2}
        meterCount={1024}
        meterColor={palette.lightVibrant || 'white'}
        gap={8}
      />
    </>
  );
};

export default AudioSpectrumWrapper;
