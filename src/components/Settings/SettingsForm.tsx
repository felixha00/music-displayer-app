import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Flex,
  VStack,
  Switch,
  Spacer,
  Divider,
  Text,
  Box,
  Badge,
} from '@chakra-ui/react';
import { Formik, Form, Field, FormikFormProps, FormikProps } from 'formik';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActionTypes from '../../app/store/actionTypes';
import { RootState } from '../../app/store/store';
import { findAllSongPathsFromDir } from '../../utils/file';
import settingsSwitchSchema from '../../schema/settingsSwitchSchema.json';
import { setQueue } from '../../app/store/actions/playerActions';
import { remote } from 'electron';
import ConvertPlaylistModal from '../Playlist/ConvertPlaylistModal';
import NewPlaylistModal from '../Playlist/NewPlaylistModal';
interface Props {}

const SettingsForm = (props: Props) => {
  const playlistInRef = useRef();
  const dispatch = useDispatch();
  const [playlist, setPlaylist] = useState<File>();
  const { settings } = useSelector((state: RootState) => ({
    settings: state.settings,
  }));

  const handlePlaylistClick = () => {
    playlistInRef.current.click();
  };

  const handlePlaylistUpload = (e) => {
    const playlistFile: File = e.currentTarget.files[0];
    console.log(playlistFile);
    setPlaylist(playlistFile);
  };
  const onSettingsChange = (e) => {
    // switch (e.target['name']) {
    //   case 'enableControls':
    //     dispatch({ type: ActionTypes.SETTINGS_TOGGLE_CONTROLS, payload: e.target['name'] });
    //     break;

    //   default:
    //     break;
    // }
    dispatch({
      type: ActionTypes.SETTINGS_TOGGLE_CONTROLS,
      payload: e.target['name'],
    });
  };
  return (
    <>
      <Formik
        initialValues={{ ...settings.config }}
        onSubmit={async (values, actions) => {
          setTimeout(async () => {
            actions.setSubmitting(true);
            dispatch({ type: ActionTypes.SETTINGS_SET, payload: values });
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props) => (
          <Form style={{ width: '100%' }}>
            <VStack alignItems="flex-start">
              <Field name="musicDir">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.musicDir && form.touched.musicDir}
                  >
                    <FormLabel htmlFor="musicDir">Music Directory</FormLabel>
                    <Input
                      {...field}
                      isDisabled={form.isSubmitting}
                      variant="filled"
                      id="musicDir"
                      placeholder="Music Directory"
                    />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    <Button w="100%" mt={2} colorScheme="blue">
                      Browse
                    </Button>
                  </FormControl>
                )}
              </Field>
            </VStack>
          </Form>
        )}
      </Formik>

      <FormControl>
        <input
          type="file"
          id="playlistPath"
          ref={playlistInRef}
          style={{ display: 'none' }}
          onChange={handlePlaylistUpload}
        />

        <FormLabel>Playlist Path</FormLabel>
        <Box p={2} bgColor="blackAlpha.500">
          <Badge fontSize="xs">{playlist?.name}</Badge>
          <Text fontSize="xs">{playlist?.path}</Text>
        </Box>
        <Button
          mt={2}
          onClick={handlePlaylistClick}
          w="100%"
          colorScheme="blue"
        >
          Browse
        </Button>
      </FormControl>

      <VStack w="100%">
        {Object.keys(settingsSwitchSchema).map((key) => {
          return (
            <FormControl key={key} display="flex" alignItems="center">
              <FormLabel mb="0">{settingsSwitchSchema[key]}</FormLabel>
              <Spacer />
              <Switch
                name={key}
                onChange={onSettingsChange}
                isChecked={settings.config[key]}
                value={settings.config[key]}
              />
            </FormControl>
          );
        })}
      </VStack>

      <ConvertPlaylistModal />
      <NewPlaylistModal />
    </>
  );
};

export default SettingsForm;
