import React, { Component } from 'react';
import PropTypes from 'prop-types';

interface Props {
  id: string;
  onMusicPlayback: (data: any) => void;
  disableBassExtract?: boolean;
  meterColor: string;
}
interface State {}

class AudioSpectrum extends Component<Props, State> {
  animationId: null;
  audioContext: BaseAudioContext;
  audioEle: HTMLAudioElement;
  audioCanvas: null;
  playStatus: 'PLAYING' | 'PAUSED';
  canvasId: any;
  mediaEleSource: MediaElementAudioSourceNode;
  analyser: AnalyserNode;
  timeout: any;

  constructor(props: Props) {
    super(props);
    const { id } = this.props;
    this.animationId = null;
    this.audioEle = null;
    this.audioCanvas = null;
    this.playStatus = 'PAUSED';
    this.canvasId = id || this.getRandomId(50);
    this.mediaEleSource = null;
    this.analyser = null;
    this.timeout = null;
  }

  componentDidMount() {
    this.prepareElements();
    this.initAudioEvents();
  }

  componentDidUpdate() {}

  onComponentWillUnmount() {
    console.log('willUnmount');
    clearTimeout(this.timeout);
    this.audioContext?.disconnect();
    this.audioContext?.close();
  }

  getRandomId = (len: number) => {
    let str = '1234567890-qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    let strLen = str.length;
    let res = '';
    for (let i = 0; i < len; i += 1) {
      let randomIndex = Math.floor(Math.random() * strLen);
      res += str[randomIndex];
    }
    return res;
  };

  initAudioEvents = () => {
    const { audioEle } = this;

    if (audioEle) {
      audioEle.onpause = (e) => {
        this.playStatus = 'PAUSED';
      };
      audioEle.onplay = (e) => {
        this.playStatus = 'PLAYING';
        this.prepareAPIs();
        const analyser = this.setupAudioNode(this.audioEle);
        this.drawSpectrum(analyser);
      };
    }
  };

  drawSpectrum = (analyser: AnalyserNode) => {
    const { onMusicPlayback, disableBassExtract } = this.props;
    let cwidth = this.audioCanvas.width;
    let cheight = this.audioCanvas.height - this.props.capHeight;
    const capYPositionArray: Array<number> = []; // store the vertical position of hte caps for the preivous frame
    let ctx = this.audioCanvas.getContext('2d');
    // let gradient = ctx.createLinearGradient(0, 0, 0, 300);

    // if (this.props.meterColor.constructor === Array) {
    //   let stops = this.props.meterColor;
    //   let len = stops.length;
    //   for (let i = 0; i < len; i++) {
    //     gradient.addColorStop(stops[i]['stop'], stops[i]['color']);
    //   }
    // } else if (typeof this.props.meterColor === 'string') {
    //   gradient = this.props.meterColor;
    // }

    const drawMeter = () => {
      const array = new Uint8Array(analyser.frequencyBinCount); // item value of array: 0 - 25
      analyser.getByteFrequencyData(array);
      if (this.playStatus === 'PAUSED') {
        cancelAnimationFrame(this.animationId);
        // console.log('paused');
        // for (let i = array.length - 1; i >= 0; i--) {
        //   array[i] = 0;
        // }
        // const allCapsReachBottom = !capYPositionArray.some((cap) => cap > 0);
        // if (allCapsReachBottom) {
        //   //ctx.clearRect(0, 0, cwidth, cheight + this.props.capHeight);
        //   cancelAnimationFrame(this.animationId); // since the sound is top and animation finished, stop the requestAnimation to prevent potential memory leak,THIS IS VERY IMPORTANT!
        //   return;
        // }
      }
      const step = Math.round(array.length / this.props.meterCount); // sample limited data from the total array

      ctx.clearRect(0, 0, cwidth, cheight + this.props.capHeight);
      for (let i = 0; i < this.props.meterCount; i++) {
        let value = array[i * step];
        if (capYPositionArray.length < Math.round(this.props.meterCount)) {
          capYPositionArray.push(value);
        }
        ctx.fillStyle = this.props.capColor;
        // draw the cap, with transition effect
        if (value < capYPositionArray[i]) {
          // let y = cheight - (--capYPositionArray[i])
          let preValue = --capYPositionArray[i];
          let y = ((270 - preValue) * cheight) / 270;
          ctx.fillRect(
            i * (this.props.meterWidth + this.props.gap),
            y,
            this.props.meterWidth,
            this.props.capHeight
          );
        } else {
          // let y = cheight - value
          let y = ((270 - value) * cheight) / 270;
          ctx.fillRect(
            i * (this.props.meterWidth + this.props.gap),
            y,
            this.props.meterWidth,
            this.props.capHeight
          );
          capYPositionArray[i] = value;
        }
        ctx.fillStyle = this.props.meterColor; // set the filllStyle to gradient for a better look

        // let y = cheight - value + this.props.capHeight
        let y = ((270 - value) * cheight) / 270 + this.props.capHeight;
        ctx.fillRect(
          i * (this.props.meterWidth + this.props.gap),
          y,
          this.props.meterWidth,
          cheight
        ); // the meter
      }

      this.animationId = requestAnimationFrame(drawMeter);

      // if (!disableBassExtract) {
      //   setTimeout(() => {
      //     onMusicPlayback(array);
      //   }, 5);
      // }
    };

    this.animationId = requestAnimationFrame(drawMeter);
  };

  // drawSpectrum = (analyser: AnalyserNode) => {
  //   const { onMusicPlayback, disableBassExtract } = this.props;

  //   const drawMeter = () => {
  //     const array = new Uint8Array(analyser.frequencyBinCount); // item value of array: 0 - 25
  //     analyser.getByteFrequencyData(array);

  //     requestAnimationFrame(drawMeter);

  //     // if (!disableBassExtract) {
  //     //   this.timeout = setTimeout(() => {
  //     //     onMusicPlayback(array);
  //     //   }, 5);
  //     // }
  //   };

  //   requestAnimationFrame(drawMeter);
  // };

  setupAudioNode = (audioEle) => {
    if (!this.analyser) {
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.smoothingTimeConstant = 0.6;
      this.analyser.fftSize = 1024;
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
    }
    this.audioEle = audioEle;

    this.audioCanvas = document.getElementById(this.canvasId);
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
      this.audioContext = new AudioContext(); // 1.set audioContext
    } catch (e) {
      // console.error('!Your browser does not support AudioContext')
      console.log(e);
    }
  };

  render() {
    return (
      <canvas
        id={this.canvasId}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}

AudioSpectrum.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.number,
  height: PropTypes.number,
  audioId: PropTypes.string,
  audioEle: PropTypes.object,
  capColor: PropTypes.string,
  capHeight: PropTypes.number,
  meterWidth: PropTypes.number,
  meterCount: PropTypes.number,
  meterColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        stop: PropTypes.number,
        color: PropTypes.string,
      })
    ),
  ]),
  gap: PropTypes.number,
};

AudioSpectrum.defaultProps = {
  disableBassExtract: false,
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
