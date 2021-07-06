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
} from '@chakra-ui/react';
import { Formik, Form, Field, FormikFormProps, FormikProps } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActionTypes from '../../app/store/actionTypes';
import { RootState } from '../../app/store/store';
import { findAllSongPathsFromDir } from '../../utils/file';
import settingsSwitchSchema from '../../schema/settingsSwitchSchema.json';
import { setQueue } from '../../app/store/actions/playerActions';
interface Props {}

const SettingsForm = (props: Props) => {
  const dispatch = useDispatch();
  const { settings } = useSelector((state: RootState) => ({
    settings: state.settings,
  }));

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
            {/* <Field name="enableControls">
              {({ field, form }) => (
                <FormControl
                  isInvalid={
                    form.errors.enableControls && form.touched.enableControls
                  }
                >
                  {console.log(field)}
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="email-alerts" mb="0">
                      Enable Controls
                    </FormLabel>
                    <Switch
                      onChange={() =>
                        form.setFieldValue('enableControls', !field.value)
                      }
                      isChecked={field.value}
                      value={field.value}
                      id="email-alerts"
                    />
                  </FormControl>
                </FormControl>
              )}
            </Field> */}

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
        </Form>
      )}
    </Formik>
  );
};

export default SettingsForm;
