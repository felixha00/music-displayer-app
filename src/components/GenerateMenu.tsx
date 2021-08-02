import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Button,
  IconButton,
} from '@chakra-ui/react';

import { RiMore2Fill } from 'react-icons/ri';

interface Props {
  showIcon: boolean;
  items: Array<MenuItemT>;
}

export interface MenuItemT {
  div?: boolean;
  text: string;
  onClick: () => void;
}

const GenerateMenu = (props: Props) => {
  const { items } = props;
  return (
    <Menu>
      <MenuButton as={IconButton} icon={<RiMore2Fill />} />
      <MenuList bg="black" isLazy p={0}>
        {items.map((item) => {
          return !item.div ? (
            <MenuItem
              // _hover={{ pl: 4 }}
              key={item.text}
              onClick={item.onClick}
            >
              {item.text}
            </MenuItem>
          ) : (
            <MenuDivider m={0} />
          );
        })}
        {/* <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem> */}
      </MenuList>
    </Menu>
  );
};

export default GenerateMenu;
