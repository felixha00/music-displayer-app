import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BassGradient from './BassGradient';
import CustomTicker from '../Wrappers/CustomTicker';
import { SettingsConfig } from '../../app/store/reducers/settingsReducer';

interface Props {
  config: SettingsConfig;
  audioId: string;
}
class AudioSpectrum extends Component<Props> {
  bassGradient: HTMLDivElement;

  songTitleText: HTMLHeadingElement | null = null;

  splashText: HTMLHeadElement | null = null;

  albumBg: HTMLDivElement;

  animationId: number | undefined = undefined;

  audioContext: AudioContext | null = null;

  constructor(props) {
    super(props);

    this.audioContext = null;
    this.audioEle = null;
    this.audioCanvas = null;
    this.bassGradient = null;
    this.albumBg = null;
    this.playStatus = null;
    this.canvasId = this.props.id || this.getRandomId(50);
    this.mediaEleSource = null;
    this.analyser = null;
    this.splashText = null;
  }
  getRandomId(len) {
    let str = '1234567890-qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    let strLen = str.length;
    let res = '';
    for (let i = 0; i < len; i++) {
      let randomIndex = Math.floor(Math.random() * strLen);
      res += str[randomIndex];
    }
    return res;
  }

  componentDidMount() {
    this.prepareElements();
    this.initAudioEvents();
  }

  onComponentWillUnmount() {
    // this.albumBg = null;
    // if (this.animationId) {
    //   cancelAnimationFrame(this.animationId);
    // }
    // this.audioContext?.disconnect();
  }

  initAudioEvents = () => {
    let audioEle = this.audioEle;
    if (audioEle) {
      audioEle.onpause = (e) => {
        this.playStatus = 'PAUSED';
      };
      audioEle.onplay = (e) => {
        this.playStatus = 'PLAYING';
        this.prepareAPIs();
        let analyser = this.setupAudioNode(this.audioEle);
        this.drawSpectrum(analyser);
      };
    }
  };

  drawSpectrum = (analyser) => {
    let percentageScale;
    let cwidth = this.audioCanvas.width;
    let cheight = this.audioCanvas.height - this.props.capHeight;
    let capYPositionArray = []; // store the vertical position of hte caps for the preivous frame
    let ctx = this.audioCanvas.getContext('2d');

    let gradient = ctx.createLinearGradient(0, 0, 0, 300);

    if (this.props.meterColor.constructor === Array) {
      let stops = this.props.meterColor;
      let len = stops.length;
      for (let i = 0; i < len; i++) {
        gradient.addColorStop(stops[i]['stop'], stops[i].color);
      }
    } else if (typeof this.props.meterColor === 'string') {
      gradient = this.props.meterColor;
    }

    const drawMeter = () => {
      const array = new Uint8Array(analyser.frequencyBinCount); // item value of array: 0 - 255
      analyser.getByteFrequencyData(array);
      if (this.playStatus === 'PAUSED') {
        for (let i = array.length - 1; i >= 0; i--) {
          array[i] = 0;
        }
        let allCapsReachBottom = !capYPositionArray.some((cap) => cap > 0);
        if (allCapsReachBottom) {
          ctx.clearRect(0, 0, cwidth, cheight + this.props.capHeight);
          cancelAnimationFrame(this.animationId); // since the sound is top and animation finished, stop the requestAnimation to prevent potential memory leak,THIS IS VERY IMPORTANT!
          return;
        }
      }
      let step = Math.round(array.length / this.props.meterCount); // sample limited data from the total array
      ctx.clearRect(0, 0, cwidth, cheight + this.props.capHeight);
      for (let i = 0; i < this.props.meterCount; i++) {
        let value = array[i * step];
        //value = value + value / 128;
        if (capYPositionArray.length < Math.round(this.props.meterCount)) {
          capYPositionArray.push(value);
        }
        ctx.fillStyle = this.props.capColor;
        // draw the cap, with transition effect
        if (value < capYPositionArray[i]) {
          // let y = cheight - (--capYPositionArray[i])
          let preValue = --capYPositionArray[i];
          const y = ((270 - preValue) * cheight) / 270;
          ctx.fillRect(
            i * (this.props.meterWidth + this.props.gap),
            y,
            this.props.meterWidth,
            this.props.capHeight
          );
        } else {
          // let y = cheight - value
          const y = ((270 - value) * cheight) / 270;
          ctx.fillRect(
            i * (this.props.meterWidth + this.props.gap),
            y,
            this.props.meterWidth,
            this.props.capHeight
          );
          capYPositionArray[i] = value;
        }
        ctx.fillStyle = gradient; // set the filllStyle to gradient for a better look

        // let y = cheight - value + this.props.capHeight
        const y = ((270 - value) * cheight) / 270 + this.props.capHeight;
        ctx.fillRect(
          i * (this.props.meterWidth + this.props.gap),
          y,
          this.props.meterWidth,
          cheight
        ); // the meter
      }
      const normalizedBass = array[2] / 256;
      percentageScale = 1 + 0.1 * (array[2] / 256);
      // percentageScale = Math.round(percentageScale * 100) / 100;

      if (this.props.config.enableBassGradient) {
        this.bassGradient.style.opacity = `${normalizedBass ** 2}`;
      } else {
        this.bassGradient.style.opacity = `0`;
      }

      if (this.props.config.enableReactiveBgScale) {
        this.albumBg.style.transform = `scale3d(${percentageScale},${percentageScale}, 0.01)`;
      }

      // this.songTitleText.style.transform = `scale3d(${percentageScale * 1.1},${
      //   percentageScale * 1.1
      // }, 0.01)`;
      if (this.songTitleText && this.props.config.enableReactiveTitle) {
        this.songTitleText.style.textShadow = `0 0 15px rgba(255,255,255,${
          normalizedBass ** 6 - 0.3
        })`;
      }

      // this.albumBg.style.opacity = 0.5 + (array[2] / 256) ** 2;
      // this.albumBg.style.filter
      // this.splashText.style.opacity = array[2] / 256;

      setTimeout(() => {
        this.animationId = requestAnimationFrame(drawMeter);
      }, 8);
    };

    this.animationId = requestAnimationFrame(drawMeter);
  };

  setupAudioNode = (audioEle) => {
    if (!this.analyser) {
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.smoothingTimeConstant = 0.6;
      this.analyser.fftSize = 2048;
    }

    if (!this.mediaEleSource) {
      this.mediaEleSource = this.audioContext.createMediaElementSource(
        audioEle
      );
      this.mediaEleSource.connect(this.analyser);
      this.mediaEleSource.connect(this.audioContext.destination);
    }

    return this.analyser;
  };

  prepareElements = () => {
    let { audioId, audioEle } = this.props;
    if (!audioId && !audioEle) {
      console.log('target audio not found!');
      return;
    } else if (audioId) {
      this.audioEle = document.getElementById(audioId);
    } else {
      this.audioEle = audioEle;
    }

    this.audioCanvas = document.getElementById(this.canvasId);
    this.bassGradient = document.getElementById('bass-gradient');
    this.albumBg = document.getElementById('album-art-bg') as HTMLDivElement;
    this.splashText = document.getElementById('player-splash-text');
    this.songTitleText = document.getElementById(
      'song-title-text'
    ) as HTMLHeadingElement;
  };

  prepareAPIs = () => {
    // fix browser vender for AudioContext and requestAnimationFrame
    window.AudioContext =
      window.AudioContext ||
      window.webkitAudioContext ||
      window.mozAudioContext ||
      window.msAudioContext;
    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame;
    window.cancelAnimationFrame =
      window.cancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      window.msCancelAnimationFrame;
    try {
      this.audioContext = new window.AudioContext(); // 1.set audioContext
    } catch (e) {
      // console.error('!Your browser does not support AudioContext')
      console.log(e);
    }
  };

  render() {
    return (
      <>
        <canvas
          id={this.canvasId}
          width={this.props.width}
          height={this.props.height}
        />
        <BassGradient id={'bass-gradient'} />
      </>
    );
  }
}

// AudioSpectrum.propTypes = {
//   id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   width: PropTypes.number,
//   height: PropTypes.number,
//   audioId: PropTypes.string,
//   audioEle: PropTypes.object,
//   capColor: PropTypes.string,
//   capHeight: PropTypes.number,
//   meterWidth: PropTypes.number,
//   meterCount: PropTypes.number,
//   meterColor: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.arrayOf(
//       PropTypes.shape({
//         stop: PropTypes.number,
//         color: PropTypes.string,
//       })
//     ),
//   ]),
//   gap: PropTypes.number,
// };
AudioSpectrum.defaultProps = {
  width: 300,
  height: 200,
  capColor: '#FFF',
  capHeight: 2,
  meterWidth: 2,
  meterCount: 40 * (2 + 2),
  meterColor: [
    { stop: 0, color: '#f00' },
    { stop: 0.5, color: '#0CD7FD' },
    { stop: 1, color: 'red' },
  ],
  gap: 10, // gap between meters
};
export default AudioSpectrum;
