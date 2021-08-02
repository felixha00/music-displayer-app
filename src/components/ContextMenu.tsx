import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import { Box } from '@chakra-ui/react';
import ReactDOM from 'react-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
// import './styles.css';

interface Props {
  //onClick: (e: React.MouseEventHandler<any>) => void;
  children: React.ReactNode;
}

const ContextMenu = (props: Props) => {
  const { children } = props;
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement>(
    null
  );
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
  });
  const [visible, setVisible] = useState(false);
  const handleClick = (e) => {
    console.log(e.type);
  };
  return (
    <Tippy
      render={(attrs) => (
        <Box bg="black" onClickOutsidfe className="box" {...attrs}>
          My tippy box
        </Box>
      )}
      onClickOutside={() => setVisible(false)}
      visible={visible}
      placement="right-start"
      content={<span>Tooltip</span>}
    >
      <button
        onContextMenu={(e) => {
          e.preventDefault();
          setVisible(true);
        }}
      >
        {children}
      </button>
    </Tippy>
    // <>
    //   <Box
    //     onClick={handleClick}
    //     onContextMenu={handleClick}
    //     ref={setReferenceElement}
    //   >
    //     {children}
    //   </Box>
    //   {ReactDOM.createPortal(
    //     <div
    //       ref={setPopperElement}
    //       style={styles.popper}
    //       {...attributes.popper}
    //     >
    //       Popper
    //     </div>,
    //     document.getElementById('root')
    //   )}
    // </>
  );
};

export default ContextMenu;
