import * as fs from 'graceful-fs';
import * as mm from 'music-metadata';
import path from 'path';
import _ from 'lodash';
import store from '../app/store/store';
import { ISong } from './types';
import glob from 'glob';
import { promisify } from 'util';
import imageCompression from 'browser-image-compression';
import { infoToast } from '../components/Toasts/generateToasts';

export const parseBase64 = (format: string, data: string) => {
  return `data:${format};base64,${data}`;
};

export const formatMetadata = async (
  metadata: mm.IAudioMetadata,
  songPath: string
): Promise<ISong> => {
  const { common, format } = metadata;
  const { picture, track } = common;
  let b64img: string;
  if (picture) {
    b64img = parseBase64(picture[0].format, picture[0].data.toString('base64'));
    const file: File = await imageCompression.getFilefromDataUrl(
      b64img,
      'test'
    );
    const compressed = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    });
    b64img = await imageCompression.getDataUrlFromFile(compressed);
  } else {
    // let img = fs.readFileSync('../assets/default-playlist-img.png', 'base64');
    // console.log(img);
    // b64img = img;
    b64img =
      'https://www.gothiccountry.se/images/pictures2/no_album_art__no_cover.jpg';
  }

  const songData = {
    title: common.title || path.basename(songPath, path.extname(songPath)),
    album: common.album,
    artist: common.artist,
    length: format.duration,
    image: b64img,
    bpm: common.bpm,
    year: common.year,
    songPath,
    genre: common.genre,
    track: common.track.no,
    extraInfo: {
      bitrate: format.bitrate,
      container: format.container,
      sampleRate: format.sampleRate,
    },
  };

  return songData;
};

export const formatMetadataNoCover = (
  metadata: mm.IAudioMetadata,
  songPath: string
): ISong => {
  const { common, format } = metadata;

  const songData = {
    title: common.title,
    album: common.album,
    artist: common.artist,
    length: format.duration,
    image: undefined,
    bpm: common.bpm,
    year: common.year,
    track: common.track.no,
    songPath,
  };

  return songData;
};

export const formatMetadataForPlaylist = (
  metadata: mm.IAudioMetadata,
  songPath: string
) => {
  const { common, format } = metadata;

  const songData = {
    title: common.title,
    album: common.album,
    length: format.duration,
    artist: common.artist,
    songPath,
  };

  return songData;
};

/**
 * Gets
 * @param songPath
 * @param skipCovers
 * @returns
 */
export const getMetadata = async (
  songPath: string,
  skipCovers = false
): Promise<any> => {
  console.log(songPath);
  // const defaultMetadata = getDefaultMetadata();

  // const basicMetadata: Track = {
  //   ...defaultMetadata,
  //   path: trackPath,
  // };
  try {
    if (!songPath) {
      throw new Error('Song Path is not defined');
    }
    const metadata = await mm.parseFile(songPath, { skipCovers });
    const parsedSongData = await formatMetadata(metadata, songPath);
    return parsedSongData;
  } catch (err) {
    console.warn(`An error occured while reading ${songPath} id3 tags: ${err}`);

    return {};
  }
};

export const getMetadataNoFormat = async (
  songPath: string,
  skipCovers = false
): Promise<any> => {
  // const defaultMetadata = getDefaultMetadata();

  // const basicMetadata: Track = {
  //   ...defaultMetadata,
  //   path: trackPath,
  // };
  try {
    if (!songPath) {
      throw new Error('Song Path is not defined');
    }
    const metadata = await mm.parseFile(songPath, { skipCovers });
    return metadata;
  } catch (err) {
    console.warn(`An error occured while reading ${songPath} id3 tags: ${err}`);

    return {};
  }
};

/**
 * Reads all files in directory recursively
 * @param startPath
 * @param filter
 * @param found
 * @returns
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

/**
 * Finds all .mp3 in a directory using glob
 * @param startPath Root of path to search from
 * @returns Array of file paths
 */
export const globRead = async (startPath: string) => {
  glob(`${startPath}/**/*.mp3`, {}, (err, files: Array<string>) => {
    console.log(files);
    return files;
  });
};
// glob.sync(`${startPath}/**/*.mp3`, {});

/**
 * Finds all .mp3 in a directory using glob, and writes the parsed metdata into a .json
 * @param startPath Root of path to search from
 * @returns Array of file paths
 */
export const scanDir = (startPath: string, cb: () => void) => {
  // fs.writeFile('dir.json', '', () => {
  glob(`${startPath}/**/*.mp3`, {}, async (err, files: Array<string>) => {
    const stream = fs.createWriteStream('dir.json', { flags: 'a' });

    stream.on('open', async (fd) => {
      stream.write('[');

      for (let i = 0; i < files.length; i += 1) {
        // await will ensure the metadata parsing is completed before we move on to the next file
        const metadata = await mm.parseFile(files[i], { skipCovers: true });
        const formatted = JSON.stringify(
          formatMetadataNoCover(metadata, files[i]),
          null,
          2
        );
        if (i !== files.length - 1) {
          stream.write(`${formatted},`);
        }
      }
      stream.write(']');
      stream.close();
      cb();
    });
  });
  // });
};

export const readLibrary = (fn: (songs: Array<string>) => any) => {
  fs.readFile('dir.json', 'utf8', (err, data) => {
    try {
      if (err) throw err;

      fn(JSON.parse(data));
    } catch (error) {
      fn([]);
    }
  });
};

export const rescanLibrary = (
  startPath: string,
  cb: (nMissing: number, nDeleted: number) => void
) => {
  // infoToast('Rescanning Libary...');
  glob(`${startPath}/**/*.{mp3,flac}`, {}, (err, files: Array<string>) => {
    fs.readFile('dir.json', 'utf8', async (err, data) => {
      const existingLib: Array<ISong> = JSON.parse(data);
      const songPaths = existingLib.map(({ songPath }) => songPath);
      const missing = files.filter((filePath) => !songPaths.includes(filePath));
      const deleted = songPaths.filter((filePath) => !files.includes(filePath));
      for (let i = 0; i < missing.length; i += 1) {
        const metadata = await mm.parseFile(missing[i], { skipCovers: true });
        existingLib.push(formatMetadataNoCover(metadata, missing[i]));
      }
      for (let j = 0; j < deleted.length; j += 1) {
        const ind = songPaths.indexOf(deleted[j]);
        existingLib.splice(ind, 1);
      }
      fs.writeFile('dir.json', JSON.stringify(existingLib), () => {
        cb(missing.length, deleted.length);
      });
    });
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
      readAllandParse(filename, filter, found);
    } else if (filename.indexOf(filter) >= 0) {
      found.push(filename);
    }
  }
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
};

export const parsePlaylist = async () => {
  const matchedSongs: Array<string> = [];

  return new Promise((resolve, reject) => {
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
          matchedSongs.push(match.songPath);
        }
      });
      return resolve(matchedSongs);
      //console.log(_.shuffle(n.slice(1, 50)));
    });
  });
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
export const convertJSONtoPlaylist = () => {};
