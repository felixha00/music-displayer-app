import React from 'react';
import { Tr, Td } from '@chakra-ui/react';
import { sToMMSS } from '../../../utils/time';
import { Row } from 'react-table';
import { ISong } from '../../../utils/types';

interface Props {
  row: Row<ISong>;
  onRowClick: (songPath) => void;
}

const SongRow = (props: Props) => {
  const { row } = props;

  const handleRowClick = () => {
    props.onRowClick(row.original.songPath);
  };
  return (
    <Tr
      {...row.getRowProps({ style })}
      _hover={{ bg: 'whiteAlpha.100', cursor: 'pointer' }}
      onClick={handleRowClick}
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
          {cell.column.id === 'length' ? sToMMSS(cell.value) : cell.value}
        </Td>
      ))}
    </Tr>
  );
};

export default SongRow;
