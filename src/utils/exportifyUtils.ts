import * as fs from 'graceful-fs';
import * as path from 'path';
import main from '../playlists/main-playlist.json';
import _ from 'lodash';
import {
  parseHugeFileList,
  findAllSongPathsFromDir,
  readAllInDir,
} from './file';

export const parseCSVtoJSON = () => {
  fs.createReadStream('src/csv/spotifyplaylist2.csv')
    .pipe(csv.parse({ headers: true, delimiter: '\t' }))
    .on('error', (error) => console.error(error))
    .on('data', (row) => console.log(row))
    .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));
};

export default {};
