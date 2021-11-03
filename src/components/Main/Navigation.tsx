import React from 'react';
import { useSelector } from 'react-redux';
import { Flex, ButtonGroup, Spacer, IconButton } from '@chakra-ui/react';
import { RootState } from '../../app/store/store';
import { SettingsDrawer } from '../Drawers';
import InfoDrawer from '../Drawers/InfoDrawer';
import { LibraryDrawer } from '../Library';
import { RiAddFill } from 'react-icons/ri';
import { Tooltip } from '@chakra-ui/react';
import { ipcRenderer } from 'electron';

const Navigation = () => {
  const { enableInfo, current } = useSelector((state: RootState) => ({
    current: state.player.current,
    enableInfo: state.settings.config.enableInfo,
  }));
  return (
    <Flex alignItems="center" zIndex="99">
      {enableInfo && (
        <>
          <ButtonGroup>
            <InfoDrawer />
          </ButtonGroup>
        </>
      )}

      <Spacer />
      {current && (
        <Tooltip label="Add More Music">
          <IconButton
            variant="ghost"
            size="lg"
            isRound
            aria-label="add more music"
            icon={<RiAddFill />}
            onClick={() => ipcRenderer.send('pickSongFromDevice')}
          />
        </Tooltip>
      )}

      <LibraryDrawer />
      <SettingsDrawer />
    </Flex>
  );
};

export { Navigation, Navigation as default };
