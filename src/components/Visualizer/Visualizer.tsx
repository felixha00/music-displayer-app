import React, { createRef, useEffect, useRef } from 'react';

interface Props {}

const Visualizer = (props: Props) => {
  const audio = new Audio('D:/Songs/S3RL-Addict-DJKurara-Remix-81421751.mp3');

  const context = new AudioContext();
  //const { createAnalyser, createMediaElementSource } = context;
  const analyser = context.createAnalyser();
  const source = context.createMediaElementSource(audio);

  source.connect(analyser);
  analyser.connect(context.destination);
  const frequency_array = new Uint8Array(analyser.frequencyBinCount);
  //console.log(frequency_array);
  useEffect(() => {}, []);

  return <></>;
};

export default Visualizer;
