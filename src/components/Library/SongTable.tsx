import React, { useCallback, useMemo, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  VStack,
  Flex,
  Badge,
  IconButton,
  Text,
  Spacer,
} from '@chakra-ui/react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useAsyncDebounce,
  HeaderGroup,
  useFlexLayout,
  Row,
} from 'react-table';
import { RiArrowUpSFill, RiArrowDownSFill } from 'react-icons/ri';

import './song-table.scss';
import { RiSearchLine } from 'react-icons/ri';
import { FixedSizeList } from 'react-window';
import { AutoSizer } from 'react-virtualized';
import {
  insertIntoFrontOfQueue,
  setQueue,
  setSong,
} from '../../app/store/actions/playerActions';
import { sToMMSS } from '../../utils/time';
import { ISong } from '../../utils/types';
import { ContextMenuTrigger } from 'react-contextmenu';
import GenerateCtxMenu, {
  CustomMenuItemProps,
} from '../ContextMenus/GenerateCtxMenu';
import {
  songInPlaylistCtxMenu,
  baseSongCtxMenu,
  CtxMenuTypes,
} from '../ContextMenus/ctxMenuSchemas';
import AddToPlaylistModal from '../Playlist/AddToPlaylistModal';
import { useModal } from '../../utils/hooks';
import GenerateMenu, { MenuItemT } from '../GenerateMenu';
import ContextMenu from '../ContextMenu';
import { removeFromPlaylist } from '../../utils/playlists';
import moment from 'moment';
var momentDurationFormatSetup = require('moment-duration-format');
import _ from 'lodash';

momentDurationFormatSetup(moment);

type SongTableTypes = 'playlist' | 'library';
interface Props {
  songData: Array<ISong>;
  onFilteredRowChange?: (filteredRows: Array<string>) => void;
  onRowClicked?: (row: Row) => void;
  songTableType: SongTableTypes;
  menuItems?: Array<MenuItemT>;
}

const defaultProps = {
  menuItems: [],
};

interface GlobalFilterProps {
  preGlobalFilteredRows: Array<any>;
}

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}): GlobalFilterProps => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((val) => {
    setGlobalFilter(val || undefined);
  }, 200);

  return (
    <InputGroup>
      <InputLeftElement children={<RiSearchLine />} />
      <Input
        variant="filled"
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Search from ${count} songs...`}
      />
    </InputGroup>
  );
};

const SongTable = (props: Props) => {
  const { songData, songTableType, menuItems } = props;
  const [ctxMenuDatas, setCtxMenuDatas] = React.useState();
  const [show, setShow] = useModal();
  const [rightClickedSong, setRightClickedSong] = React.useState();
  // function handleClick(e, data) {
  //   console.log(data.foo);
  // }

  useEffect(() => {
    setShow(true);
  }, [rightClickedSong]);
  const handleSongSelect = (songPath: string) => {
    setSong(songPath);
  };

  const handleAddToQueue = (songPath: string, priority = true) => {
    insertIntoFrontOfQueue([songPath], priority);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Artist',
        accessor: 'artist',
      },
      {
        Header: 'Album',
        accessor: 'album',
      },

      {
        Header: 'Length',
        accessor: 'length',
        isNum: true,
        disableGlobalFilter: true,
      },
    ],
    []
  );

  const filterIcon = useCallback((column: HeaderGroup<ISong>) => {
    if (column.isSorted) {
      if (column.isSortedDesc) {
        return (
          <RiArrowDownSFill
            style={{ display: 'inline' }}
            aria-label="sorted descending"
          />
        );
      }
      return (
        <RiArrowUpSFill
          style={{ display: 'inline' }}
          aria-label="sorted ascending"
        />
      );
    }
    return null;
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    visibleColumns,
  } = useTable(
    { columns, data: songData },
    useGlobalFilter,
    useSortBy,
    useFlexLayout
  );

  const totalTime = useMemo(
    () =>
      _.reduce(
        rows,
        (sum, curr) => {
          return sum + curr.original.length;
        },
        0
      ),
    [rows]
  );
  const generateSongPlaylistMenu = (data: string) => {
    setCtxMenuDatas(data.props);
  };

  const handleCtxMenuItemClick = (type: string, data: string) => {
    console.log(type);
    switch (type) {
      case CtxMenuTypes.addToQueue:
        handleAddToQueue(data, true);
        break;
      case CtxMenuTypes.removeFromPlaylist:
        console.log(data);
        break;
      case CtxMenuTypes.addToPlaylist:
        console.log(data);
        setRightClickedSong(data);
        break;
      default:
        break;
    }
  };

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <>
          <ContextMenuTrigger
            props={row.original.songPath}
            collect={generateSongPlaylistMenu}
            id="song"
          >
            {/* <ContextMenu> */}
            <Tr
              {...row.getRowProps({ style })}
              _hover={{ bg: 'whiteAlpha.100', cursor: 'pointer' }}
              onClick={() => handleSongSelect(row.original.songPath)}
            >
              {row.cells.map((cell) => (
                <Td
                  {...cell.getCellProps()}
                  isNumeric={cell.column.isNumeric}
                  p={2}
                  key={cell.getCellProps().key}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="pre"
                >
                  {cell.column.id === 'length'
                    ? sToMMSS(cell.value)
                    : cell.value}
                </Td>
              ))}
            </Tr>
            {/* </ContextMenu> */}
          </ContextMenuTrigger>
        </>
      );
    },
    [prepareRow, rows]
  );
  return (
    <>
      <Table fontSize="sm" {...getTableProps()} className="song-table">
        <Thead>
          <tr>
            <th>
              <Flex flexDir="row" w="100%" alignItems="center">
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={state.globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
                <Spacer />
                {menuItems?.length > 0 && (
                  <GenerateMenu items={menuItems} showIcon />
                )}

                <Text ml={4} fontWeight="normal">
                  {moment
                    .duration(totalTime, 'seconds')
                    .format('h[h]mm[m]ss[s]')}
                </Text>
              </Flex>
            </th>
          </tr>
          {headerGroups.map((headerGroup) => (
            <Tr
              {...headerGroup.getHeaderGroupProps()}
              key={headerGroup.getHeaderGroupProps().key}
            >
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                  key={column.getSortByToggleProps().key}
                  pl={2}
                >
                  <span>
                    {column.render('Header')}

                    {filterIcon(column)}
                  </span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody
          style={{ flex: '1 1 auto', height: '100%' }}
          {...getTableBodyProps()}
        >
          <AutoSizer>
            {({ height, width }: { height: number; width: number }) => (
              <FixedSizeList
                className="List"
                height={height}
                width={width}
                itemCount={rows.length}
                itemSize={35}
              >
                {RenderRow}
              </FixedSizeList>
            )}
          </AutoSizer>
        </Tbody>
      </Table>
      <GenerateCtxMenu
        onItemClick={handleCtxMenuItemClick}
        id="song"
        menuItems={
          songTableType === 'library' ? baseSongCtxMenu : songInPlaylistCtxMenu
        }
        data={ctxMenuDatas}
      />
    </>
  );
};

SongTable.defaultProps = defaultProps;
export default SongTable;
