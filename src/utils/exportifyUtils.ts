import * as fs from 'graceful-fs';
import * as path from 'path';
import main from '../playlists/main-playlist.json';
import _ from 'lodash';
import {
  parseHugeFileList,
  findAllSongPathsFromDir,
  readAllInDir,
  getAllMetadataFromSongPaths,
} from './file';

export const parseCSVtoJSON = () => {
  fs.createReadStream('src/csv/spotifyplaylist2.csv')
    .pipe(csv.parse({ headers: true, delimiter: '\t' }))
    .on('error', (error) => console.error(error))
    .on('data', (row) => console.log(row))
    .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));
};

export default {};

export const matchJSONtoPath = () => {};

export const JSONtoPlaylist = async () => {
  let reduced = main.map((song) => {
    return {
      trackName: song['Track Name'],
      albumName: song['Album Name'],
    };
  });

  // let metadatas = await findAllSongPathsFromDir('D:\\Songs')
  //   .then((songPaths) => {
  //     return console.log(songPaths);
  //     // return getAllMetadataFromSongPaths(songPaths);
  //   })
  //   .then((songMetadatas) => {
  //     return songMetadatas;
  //   })
  //   .catch((err) => {});

  // console.log(metadatas);
  // let n = [];

  // console.log(metadatas.length);
  // reduced.forEach((song) => {
  //   const match = _.find(metadatas, function (data) {
  //     return data.title === song.trackName;
  //   });

  //   if (match !== undefined) {
  //     n.push(match);
  //   }
  // });

  // console.log(n, metadatas);
};
