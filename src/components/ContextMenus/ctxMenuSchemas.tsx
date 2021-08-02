import React from 'react';
import AddToPlaylistModal from '../Playlist/AddToPlaylistModal';
import { CustomMenuItemProps } from './GenerateCtxMenu';
import _ from 'lodash';
export const baseSongCtxMenu: Array<CustomMenuItemProps> = [
  {
    text: 'Add to Queue',
    type: 'addToQueue',
  },
  {
    text: 'Add to Playlist',
    type: 'addToPlaylist',
    elem: <AddToPlaylistModal />,
  },
];

export const songInPlaylistCtxMenu = [
  ...baseSongCtxMenu,
  {
    text: 'Remove from Playlist',
    type: 'removeFromPlaylist',
  },
];

export const songInQueueCtxMenu = [
  {
    text: 'Remove from Queue',
    type: 'removeFromQueue',
  },
  {
    text: 'Add to Playlist',
    type: 'addToPlaylist',
  },
];

// export const albumArtPlaying = [
//   {
//     text: 'View in Folder',
//     type: 'viewInFolder',
//   },
//   ...baseSongCtxMenu,
// ];

export const ctxMenuItems: Record<string, CustomMenuItemProps> = {
  addToQueue: {
    text: 'Add to Queue',
    type: 'addToQueue',
  },
  addToPlaylist: {
    text: 'Add to Playlist',
    type: 'addToPlaylist',
    elem: <AddToPlaylistModal />,
    elemType: 'modal',
  },
  removeFromPlaylist: {
    text: 'Remove from Playlist',
    type: 'removeFromPlaylist',
  },
  removeFromQueue: {
    text: 'Remove from Queue',
    type: 'removeFromQueue',
  },
  viewInFolder: {
    text: 'View in Folder',
    type: 'viewInFolder',
  },
};

export const albumArtPlaying = _.at(ctxMenuItems, [
  'viewInFolder',
  'addToPlaylist',
  'addToQueue',
]);

export enum CtxMenuTypes {
  addToQueue = 'addToQueue',
  addToPlaylist = 'addToPlaylist',
  removeFromPlaylist = 'removeFromPlaylist',
  removeFromQueue = 'removeFromQueue',
  viewInFolder = 'viewInFolder',
}
export default {};
