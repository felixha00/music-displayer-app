import {
  createStandaloneToast,
  ToastPosition,
  UseToastOptions,
} from '@chakra-ui/react';
import theme from '../../theme/theme';
const toast = createStandaloneToast({ theme: theme });

const pos: ToastPosition = 'bottom';
const toastOpts: UseToastOptions = {
  position: pos,
  //variant: 'subtle',
};

export const errorToast = (desc: string) => {
  return toast({
    ...toastOpts,
    title: 'Error',
    description: `${desc}`,
    status: 'error',
    duration: 9000,
    isClosable: true,
  });
};

export const infoToast = (desc: string) => {
  return toast({
    ...toastOpts,
    //title: 'Info',
    description: `${desc}`,
    status: 'info',
    duration: 3000,
    isClosable: true,
  });
};

export default {};
