export interface Action {
  // TODO action specific types
  type: string;
  payload?: any;
}

export interface ISong {
  title: string | undefined;
  artist: string | undefined;
  album: string | undefined;
  image: string | undefined;
  length: number | undefined;
  bpm: number | undefined;
  year: number | undefined;
  genre: string | undefined;
  songPath: string;
  track: number | null;
}

export type LoadingTypes = 'player' | 'app' | 'song';
