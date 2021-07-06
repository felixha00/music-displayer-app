import * as fs from 'fs';
import * as mm from 'music-metadata';
import path from 'path';
import _ from 'lodash';
import store from '../app/store/store';
import { ISong } from './types';
import main from '../playlists/main-playlist.json';

export const parseBase64 = (format: string, data: string) => {
  return `data:${format};base64,${data}`;
};

export const formatMetadata = (
  metadata: mm.IAudioMetadata,
  songPath: string
): ISong => {
  const { common, format } = metadata;
  const { picture } = common;
  let b64img: string;
  if (picture) {
    b64img = parseBase64(picture[0].format, picture[0].data.toString('base64'));
  } else {
    b64img =
      'https://www.gothiccountry.se/images/pictures2/no_album_art__no_cover.jpg';
  }

  const songData = {
    title: common.title,
    album: common.album,
    artist: common.artist,
    length: format.duration,
    image: b64img,
    bpm: common.bpm,
    year: common.year,
    songPath,
  };

  return songData;
};

export const formatMetadataForPlaylist = (
  metadata: mm.IAudioMetadata,
  songPath: string
) => {
  const { common, format } = metadata;
  const { picture } = common;

  const songData = {
    title: common.title,
    album: common.album,
    songPath,
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
    const metadata = await mm.parseFile(songPath, {});

    const parsedSongData = formatMetadata(metadata, songPath);
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

/*
 * READS ALL FILES IN DIRECTORY RECURSIVELY
 */

export const readAllInDir = (
  startPath: string,
  filter: string,
  found: Array<string>
) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(startPath)) {
      return reject(new Error(`Directory does not exist: '${startPath}'`));
    }
    const files = fs.readdirSync(startPath);

    for (let i = 0; i < files.length; i++) {
      const filename = path.join(startPath, files[i]);
      const stat = fs.lstatSync(filename);

      if (stat.isDirectory()) {
        resolve(readAllInDir(filename, filter, found));
      } else if (filename.indexOf(filter) >= 0) {
        resolve(found.push(filename));
      }
    }
  });
};

export const readAllandParse = async (
  startPath: string,
  filter: string,
  found: Array<string>
) => {
  if (!fs.existsSync(startPath)) {
    return null;
  }
  const files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filename);

    if (stat.isDirectory()) {
      console.log(filename);
      readAllandParse(filename, filter, found);
    } else if (filename.indexOf(filter) >= 0) {
      found.push(filename);
      // await mm
      //   .parseFile(filename)
      //   .then((tags) => {
      //     return formatMetadata(tags, filename);
      //   })
      //   .then((metadata) => {
      //     fs.close()
      //     return found.push(metadata);
      //   })
      //   .catch((err) => {});
      // resolve(
      //   found.push(
      //     mm
      //       .parseFile(filename)
      //       .then((tags) => {
      //         return formatMetadata(tags, filename);
      //       })
      //       .then((metadata) => {
      //         return metadata;
      //       })
      //       .catch((err) => {})
      //   )
      // );
    }
  }
};

const m: Array<ISong> = [];
export const parseFiles = (audioFiles) => {
  const audioFile = audioFiles.shift();

  if (audioFile) {
    return mm.parseFile(audioFile).then((metadata) => {
      // Do great things with the metadata
      //m.push(formatMetadata(metadata, audioFile));
      console.log(formatMetadata(metadata, audioFile));
      return parseFiles(audioFiles); // process rest of the files AFTER we are finished
    });
  }

  return Promise.resolve();
};

export const parseFiles2 = async (audioFiles) => {
  const stream = fs.createWriteStream('append.txt', { flags: 'a' });

  stream.on('open', async function (fd) {
    stream.write('[');

    for (let i = 0; i < audioFiles.length; i += 1) {
      // await will ensure the metadata parsing is completed before we move on to the next file
      const metadata = await mm.parseFile(audioFiles[i]);
      const formatted = formatMetadataForPlaylist(metadata, audioFiles[i]);

      stream.write(`${JSON.stringify(formatted)},`);
      // TODO fix comma at the end
      // Do great things with the metadata
    }
    stream.write(']');
    stream.close();
  });
};

export const function2 = async () => {
  let h = [];
  await readAllandParse(`D:\\Songs`, '.mp3', h)
    .then(() => parseFiles2(h))
    .then(() => {
      return console.log('h');
    })
    .catch(() => {});
  //Promise.resolve();
};

export const parsePlaylist = () => {
  let n = [];
  fs.readFile('append.txt', 'utf8', (err, fileStr) => {
    const playlistData = JSON.parse(fileStr);
    const reduced = main.map((song) => {
      return {
        trackName: song['Track Name'],
        albumName: song['Album Name'],
      };
    });

    reduced.forEach((song) => {
      const match = _.find(playlistData, (data) => {
        return data.title === song.trackName;
      });

      if (match !== undefined) {
        n.push(match.songPath);
      }
    });

    console.log(_.shuffle(n.slice(1, 50)));
  });

  return n;
};

export const findAllSongPathsFromDir = (
  startPath: string,
  sampleSize?: number
): Promise<Array<string>> => {
  const foundFilePaths: Array<string> = [];
  const foundSongsMetadata: Array<ISong> = [];
  return new Promise((resolve, reject) => {
    readAllInDir(startPath, '.mp3', foundFilePaths)
      .then(() => {
        // const promises = [];
        // for (let i = 0; i < foundFilePaths.length; i += 1) {
        //   promises.push(mm.parseFile(foundFilePaths[i]));
        // }

        // Promise.all(promises)
        //   .then((tags) => {
        //     for (let j = 0; j < tags.length; j += 1) {
        //       foundSongsMetadata.push(
        //         formatMetadata(tags[j], foundFilePaths[j])
        //       );
        //     }

        //     return foundSongsMetadata;
        //   }).then((f) => {
        //     console.log(f);
        //     return resolve(_.sampleSize(foundFilePaths, 50));
        //   });
        if (sampleSize) {
          return resolve(_.sampleSize(foundFilePaths, 50));
        }
        return resolve(foundFilePaths);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getAllMetadataFromSongPaths = (songPaths: Array<string>) => {
  const promises = [];
  const foundSongsMetadata: Array<ISong> = [];
  for (let i = 0; i < songPaths.length; i += 1) {
    promises.push(mm.parseFile(songPaths[i]));
  }

  return Promise.all(promises).then((tags) => {
    for (let j = 0; j < tags.length; j += 1) {
      foundSongsMetadata.push(formatMetadata(tags[j], songPaths[j]));
    }
    return foundSongsMetadata;
  });
};

export const convertJSONtoPlaylist = () => {};
export default {};
