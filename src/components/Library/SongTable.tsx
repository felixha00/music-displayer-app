import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, HStack } from '@chakra-ui/react';
import { useTable, useSortBy } from 'react-table';
import { ISong } from '../../utils/types';
import { RiArrowUpSFill, RiArrowDownSFill } from 'react-icons/ri';
import { sToMMSS } from '../../utils/time';
import './queue-table.scss';
import { setSong } from '../../app/store/actions/playerActions';

interface Props {
  songData: Array<ISong>;
}

const SongTable = (props: Props) => {
  const { songData } = props;

  const columns = React.useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
        style: { whiteSpace: 'unset' }, //Add this line to the column definition
      },
      {
        Header: 'Artist',
        accessor: 'artist',
      },
      {
        Header: 'Album',
        accessor: 'album',
      },

      { Header: 'Length', accessor: 'length', isNum: true },
    ],
    []
  );

  const handleSongSelect = (songPath: string) => {
    setSong(songPath);
  };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: songData }, useSortBy);

  return (
    <Table fontSize="sm" {...getTableProps()} className="song-table">
      <Thead>
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
              >
                {column.render('Header')}
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <RiArrowDownSFill aria-label="sorted descending" />
                  ) : (
                    <RiArrowUpSFill aria-label="sorted ascending" />
                  )
                ) : null}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr
              {...row.getRowProps()}
              _hover={{ bg: 'whiteAlpha.100', cursor: 'pointer' }}
              onClick={() => handleSongSelect(row.original.songPath)}
            >
              {row.cells.map((cell) => (
                <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                  {cell.column.id === 'length'
                    ? sToMMSS(cell.value)
                    : cell.value}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default SongTable;
