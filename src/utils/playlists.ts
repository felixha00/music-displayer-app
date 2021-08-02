import glob from 'glob';
import fs from 'graceful-fs';
import * as mm from 'music-metadata';
import _ from 'lodash';
import {
  formatMetadataNoCover,
  getMetadata,
  formatMetadataForPlaylist,
  getMetadataNoFormat,
} from './file';
import { ISong } from './types';

import util from 'util';
/**
 * Reads specified playlist directory for playlists to be shown
 * @param cb Callback for files
 */
export const readPlaylistDir = (cb: (files: Array<string>) => any) => {
  glob('src/playlists/**/*.json', {}, (err, files) => {
    cb(files);
  });
};

/**
 * Reads playlist from a formatted .json file
 * @param playlistPath Path to the playlist file to be read
 * @param cb Callback fn, returns parsed object
 */
export const readPlaylist = (
  playlistPath: string,
  cb: (songs: Array<ISong>) => void
) => {
  fs.readFile(playlistPath, 'utf8', (err, fileStr) => {
    if (err) {
      cb([]);
    }
    cb(JSON.parse(fileStr));
  });
};

/**
 * Creates a blank .json file to hold playlist information
 * @param {string} playlistName Name of playlist
 * @returns TODO
 */
export const createPlaylist = (playlistName: string, cb?: () => void) => {
  // TODO: Check if playlist already exists
  return fs.writeFile(`src/playlists/${playlistName}.json`, '[]', {}, () => {
    if (typeof cb === 'function') {
      cb();
    }
  });
};

export const convertPathsToPlaylist = (filePaths: Array<string>) => {
  const stream = fs.createWriteStream('src/playlists/main2.json', {
    flags: 'w',
  });
  stream.on('open', async function (fd) {
    stream.write('[');

    for (let i = 0; i < filePaths.length; i += 1) {
      // await will ensure the metadata parsing is completed before we move on to the next file
      const metadata = await mm.parseFile(filePaths[i], { skipCovers: true });
      const formatted = JSON.stringify(
        formatMetadataNoCover(metadata, filePaths[i]),
        null,
        2
      );

      stream.write(`${formatted},`);
    }
    stream.write(']');
    stream.close();
  });
};

export const addToPlaylist = (
  songPath: string,
  playlistPath: string,
  cb?: (err?: Error) => void
) => {
  fs.readFile(playlistPath, 'utf8', (err, fileStr) => {
    if (err) {
      console.error(err);
    }
    getMetadataNoFormat(songPath, true)
      .then((d) => {
        const formatted = formatMetadataForPlaylist(d, songPath);
        const playlist: Array<Record<string, unknown>> = JSON.parse(fileStr);
        if (playlist.includes(formatted)) {
          throw new Error('Song already in playlist');
        }

        playlist.push(formatted);
        fs.writeFile(playlistPath, JSON.stringify(playlist), () => {
          if (typeof cb === 'function') cb();
        });
      })
      .catch((err) => {
        cb(err);
      });
    // const cb = util.callbackify(getMetadata);
    // cb(songPath, (md) => {
    //   console.log(md);
    // });
    // const metadata = getMetadata(songPath).then();
    // console.log(JSON.parse(fileStr));
  });
};

export const removeFromPlaylist = (
  songPath: string,
  playlistPath: string,
  cb: (reserr?: Error) => void
) => {
  fs.readFile(playlistPath, 'utf8', (err, fileStr) => {
    if (err) {
      cb(err);
    }

    _.find(JSON.parse(fileStr));
    // const cb = util.callbackify(getMetadata);
    // cb(songPath, (md) => {
    //   console.log(md);
    // });
    // const metadata = getMetadata(songPath).then();
    // console.log(JSON.parse(fileStr));
  });
};

export const deletePlaylist = (playlistPath: string, cb: () => void) => {
  fs.unlink(playlistPath, () => {
    cb();
  });
};

export default {};
