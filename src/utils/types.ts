export interface Action {
  // TODO action specific types
  type: string;
  payload?: any;
}

export interface ISong {
  title: string;
  artist: string;
  album: string;
  image?: string;
  length: number;
}
