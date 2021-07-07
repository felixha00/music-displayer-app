import { extendTheme, ThemeConfig, withDefaultSize } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme(
  withDefaultSize({
    size: 'sm',
    components: ['Button', 'Input'],
  }),
  {
    components: {
      Text: {
        baseStyle: {
          fontSize: 'sm',
        },
      },
      FormLabel: {
        baseStyle: {
          fontSize: '14px',
        },
      },
      Input: {
        baseStyle: {
          fontSize: '14px',
        },
      },
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    styles: {
      body: {
        background: 'black',
      },
    },
    colors: {
      custom: {},
    },
    config,
  }
);
export default theme;
