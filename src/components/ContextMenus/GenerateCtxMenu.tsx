import React from 'react';
import { MenuItem, ContextMenu, MenuItemProps } from 'react-contextmenu';
import {
  VStack,
  Box,
  MenuButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

const ctxButtonProps = {
  as: MenuItem,
  className: 'rounded',
  _hover: { bg: 'whiteAlpha.300' },
  p: 2,
  w: '100%',
  variant: 'ghost',
  justifyContent: 'flex-start',
};
export interface CustomMenuItemProps extends MenuItemProps {
  text: string;
  type: string;
  elem?: React.ReactNode;
  elemType?: 'modal';
}

interface Props {
  id: string;
  menuItems?: Array<CustomMenuItemProps>;
  onItemClick: (type: string, data: any) => void;
  data: any;
}

const defaultProps = {
  menuItems: [],
};

const GenerateCtxMenu = (props: Props) => {
  const { id, menuItems, onItemClick } = props;

  const handleClick = (e, data) => {
    onItemClick(data.type, props.data);
  };

  return (
    <VStack
      fontSize="sm"
      spacing={0}
      as={ContextMenu}
      id={id}
      alignItems="flex-start"
      className="rounded"
      bg="black"
      p={1}
      cursor="pointer"
    >
      {menuItems.map((menuItem) => {
        if (menuItem.elem) {
          const childrenWithProps = React.Children.map(
            menuItem.elem,
            (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  data: props.data,
                  key: menuItem.type,
                  button: ctxButtonProps,
                });
              }
              return child;
            }
          );
          return childrenWithProps;
        }
        return (
          <>
            <Button
              as={MenuItem}
              className="rounded"
              _hover={{ bg: 'whiteAlpha.300' }}
              p={2}
              w="100%"
              variant="ghost"
              justifyContent="flex-start"
              data={{ type: menuItem.type, ...menuItem.data }}
              onClick={handleClick}
            >
              {menuItem.text}
            </Button>
            {/* {menuItem.elemType === 'modal' && <Modal></Modal>} */}
          </>
        );
      })}
    </VStack>
  );
};
GenerateCtxMenu.defaultProps = defaultProps;

export default GenerateCtxMenu;
