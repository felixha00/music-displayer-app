import { extendTheme, ThemeConfig, withDefaultSize } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

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
    colors: {
      theme: {
        50: '#141214',
      },
    },
    components: {
      Drawer: {
        // setup light/dark mode component defaults
        baseStyle: (props) => ({
          dialog: {
            bg: mode('gray.100', '#141214')(props),
          },
        }),
      },
      Modal: {
        // setup light/dark mode component defaults
        baseStyle: (props) => ({
          dialog: {
            bg: mode('gray.100', '#141214')(props),
          },
        }),
        defaultProps: {
          isCentered: true,
        },
      },
      Menu: {
        baseStyle: (props) => ({
          bg: mode('gray.100', 'black')(props),
        }),
      },

      Text: {
        baseStyle: {
          fontSize: 'sm',
        },
      },
      Heading: {},
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
      TabPanel: {
        baseStyle: {
          padding: 0,
        },
        defaultProps: {
          p: 0,
        },
      },
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    styles: {
      global: (props) => ({
        body: {
          color: mode('gray.800', 'whiteAlpha.900')(props),
          bg: mode('gray.100', '#141214')(props),
        },
      }),
    },
    colors: {
      custom: {},
    },
    config,
  }
);
export default theme;
