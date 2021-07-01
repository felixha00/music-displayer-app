import * as mm from 'music-metadata';

// (async () => {
//     try {
//       const metadata = await mm.parseFile(
//         '../assets/σ- for the DELTA (Akira Complex Remix).mp3'
//       );
//       const { common, format } = metadata;
//       const songData = {
//         common,
//         format,
//       };
//     } catch (error) {
//       console.error(error.message);
//     }
//   })();

export const parseBase64 = (format: string, data: string) => {
  return `data:${format};base64,${data}`;
};

export const formatMetadata = (metadata: mm.IAudioMetadata) => {
  const { common, format } = metadata;
  const { picture } = common;
  let b64img: string;
  if (picture) {
    // b64img = `data:${common.picture[0].format};base64, ${Buffer.from(
    //   common.picture[0].data
    // ).toString('base64')}`;
    // console.log(b64img);
    b64img = parseBase64(picture[0].format, picture[0].data.toString('base64'));
  } else {
    b64img = '';
  }

  const songData = {
    title: common.title,
    album: common.album,
    artist: common.artist,
    length: format.duration,
    image: b64img,
  };

  return songData;
};

export const getMetadata = async (songPath: string): Promise<any> => {
  // const defaultMetadata = getDefaultMetadata();

  // const basicMetadata: Track = {
  //   ...defaultMetadata,
  //   path: trackPath,
  // };
  try {
    const metadata = await mm.parseFile(
      'assets/Porter Robinson - Sewer Idol Project - 09 Get Your Wish (Sewerslvt Remix).mp3',
      {}
    );

    const parsedSongData = formatMetadata(metadata);
    return parsedSongData;

    // Let's try to define something with what we got so far...
    // const parsedData = parseMusicMetadata(data, trackPath);

    // const metadata: Track = {
    //   ...defaultMetadata,
    //   ...parsedData,
    //   path: trackPath,
    // };

    // metadata.loweredMetas = getLoweredMeta(metadata);

    // Let's try another wat to retrieve a track duration
    // if (metadata.duration < 0.5) {
    //   try {
    //     metadata.duration = await getAudioDuration(trackPath);
    //   } catch (err) {
    //     console.warn(
    //       `An error occured while getting ${trackPath} duration: ${err}`
    //     );
    //   }
    // }

    // return metadata;
  } catch (err) {
    console.warn(`An error occured while reading ${songPath} id3 tags: ${err}`);

    return {};
  }
};
export default {};
