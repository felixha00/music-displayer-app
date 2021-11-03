import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import catJam from '../assets/catJAM.gif';
import dogeD from '../assets/dogedance.gif';
import catJamR from '../assets/catjamrainbow.gif';
import forsenPls from '../assets/forsenPls.gif';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store/store';
import { WAYTOODANK } from '../assets/ImageImports';
import { MotionBox } from './Wrappers/FramerComponents';

interface Props {
  copies: number;
  height?: string;
  scale?: boolean;
}

const defaultProps = {
  scale: false,
};

const ExtraGIFDisplayer = (props: Props) => {
  const { playing, enableGIFExtra, current } = useSelector(
    (state: RootState) => ({
      playing: state.player.playing,
      enableGIFExtra: state.settings.config.enableGIFExtra,
      current: state.player.current,
    })
  );
  const { copies, scale } = props;

  if (enableGIFExtra && playing && current) {
    return (
      <AnimatePresence>
        <MotionBox
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transform="scaleX(-1)"
          className="flex-absolute-box"
          textAlign="left"
          bottom="0"
          top="auto"
          left="auto"
          right="0"
          height="100vh"
          alignItems="flex-end"
          justifyContent="flex-end"
          flexDir="column"
        >
          {Array.from(Array(copies).keys()).map((i) => {
            return (
              <Image
                key={i}
                src={catJamR}
                height={props.height || '100%'}
                //style={scale ? { height: `${100 / copies}%` } : {}}
              />
            );
          })}
        </MotionBox>
      </AnimatePresence>
    );
  }
  return null;
};

ExtraGIFDisplayer.defaultProps = defaultProps;
export default ExtraGIFDisplayer;
