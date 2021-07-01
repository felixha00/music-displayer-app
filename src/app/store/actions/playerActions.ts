import os from 'os';
import electron from 'electron';
import { getMetadata } from '../../../utils/file';

const { ipcRenderer } = electron;

export const readSong = async () => {
  const metadata = await getMetadata('/');
  return metadata;
};

export default {};
