import { createStandaloneToast, ToastPosition } from '@chakra-ui/react';
const toast = createStandaloneToast();

const pos: ToastPosition = 'bottom-right';

export const errorToast = (desc: string) => {
  return toast({
    title: 'Error',
    description: `${desc}`,
    status: 'error',
    duration: 9000,
    isClosable: true,
    position: pos,
  });
};

export const infoToast = (desc: string) => {
  return toast({
    title: 'Info',
    description: `${desc}`,
    status: 'info',
    duration: 3000,
    isClosable: true,
    position: pos,
  });
};

export default {};
