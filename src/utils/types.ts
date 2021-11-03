export interface Action {
  // TODO action specific types
  type: string;
  payload?: any;
}

export type ISongExtras = {
  bitrate: number | undefined;
  container: string | undefined;
  sampleRate: number | undefined;
};

export interface ISong {
  id: string | undefined;
  title: string | undefined;
  artist: string | undefined;
  album: string | undefined;
  image: string | undefined;
  length: number | undefined;
  bpm: number | undefined;
  year: number | undefined;
  genre: string[] | undefined;
  songPath: string;
  track: number | null;
  extraInfo: ISongExtras | undefined;
}

export type LoadingTypes = 'player' | 'app' | 'song';
