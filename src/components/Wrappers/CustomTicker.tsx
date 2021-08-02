import React, { Component } from 'react';
import Ticker from 'react-ticker';
import { usePageVisible } from '../../utils/hooks';

interface Props {
  children?: React.ReactNode;
  direction?: 'toRight' | 'toLeft';
  mode?: 'chain' | 'await' | 'smooth';
  move?: boolean;
  offset?: number | 'run-in' | string;
  speed?: number;
  height?: number | string;
}

const CustomTicker = (props: Props) => {
  const { children, ...rest } = props;
  const visible = usePageVisible();
  console.log('rerender');

  return (
    <>
      {visible && (
        <Ticker move={visible} {...rest}>
          {() => <>{children}</>}
        </Ticker>
      )}
    </>
  );
};

export { CustomTicker as default, CustomTicker };
