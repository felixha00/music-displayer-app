import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Flex,
  VStack,
  Switch,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActionTypes from '../../app/store/actionTypes';
import { RootState } from '../../app/store/store';
import { readFilesInDirectory } from '../../utils/file';

interface Props {
  onSave: () => void;
}

const SettingsForm = (props: Props) => {
  const dispatch = useDispatch();
  const { settings } = useSelector((state: RootState) => ({
    settings: state.settings,
  }));

  return (
    <Formik
      initialValues={{ ...settings.config }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          console.log(values);
          dispatch({ type: ActionTypes.SETTINGS_SET, payload: values });
          actions.setSubmitting(false);
          readFilesInDirectory(values.musicDir);
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
                    variant="filled"
                    id="musicDir"
                    placeholder="Music Directory"
                  />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="enableControls">
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
            </Field>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default SettingsForm;
