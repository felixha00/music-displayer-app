import React from 'react';
import { render } from 'react-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { Titlebar, Color } from 'custom-electron-titlebar';
import App from './App';
import theme from './theme/theme';
import store, { RootState } from './app/store/store';

// const titlebar = new Titlebar({
//   backgroundColor: Color.fromHex('#00000088'),
//   menu: null,
//   overflow: 'hidden',
//   titleHorizontalAlignment: 'left',
// });

let currentValue;

const handleStoreChange = () => {
  // const previousValue = currentValue;
  // currentValue = store.getState().player.queue
  // if (previousValue !== currentValue) {
  //   console.log(
  //     'Some deep nested property changed from',
  //     previousValue,
  //     'to',
  //     currentValue
  //   );
  // }
};

render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <Box h="100vh">
        <App />
      </Box>
    </ChakraProvider>
  </Provider>,
  document.getElementById('root')
);

const unsubscribe = store.subscribe(handleStoreChange);
