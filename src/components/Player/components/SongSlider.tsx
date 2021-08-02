import React, { useState } from 'react';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
interface Props {
  time: number;
  onChangeStart: (n: number) => void;
  onChange: (n: number) => void;
  onChangeEnd: (n: number) => void;
}

const SongSlider = (props: Props) => {
  const { onChange, onChangeEnd, onChangeStart, time } = props;
  const [thumbHover, setThumbHover] = useState(false);
  const [startChange, setStartChange] = useState(false);
  const handleOnChangeStart = (n: number) => {
    onChangeStart(n);
    setStartChange(true);
  };
  const handleOnChange = (n: number) => {
    onChange(n);
  };
  const handleOnChangeEnd = (n: number) => {
    onChangeEnd(n);
    setStartChange(false);
  };

  return (
    <Slider
      onMouseEnter={() => setThumbHover(true)}
      onMouseLeave={() => setThumbHover(false)}
      onChangeStart={handleOnChangeStart}
      onChange={handleOnChange}
      onChangeEnd={handleOnChangeEnd}
      colorScheme="gray"
      aria-label="slider-ex-1"
      value={startChange ? undefined : time}
      focusThumbOnChange={false}
    >
      <SliderTrack>
        <SliderFilledTrack bg="white" />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  );
};

export default SongSlider;
