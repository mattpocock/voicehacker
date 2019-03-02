import React from 'react';
import Flex from '../Flex';
import { TableWrapper } from '../Table';
import RecordingTableRow from './RecordingTableRow';

const RecordingTable = ({ data, schema }: Props) => {
  return (
    <TableWrapper>
      {data.map((rowObject) => (
        <RecordingTableRow
          key={rowObject.id}
          publicURL={rowObject.src.publicURL}
        >
          <Flex alignItems="center">{schema.renderCell(rowObject)}</Flex>
        </RecordingTableRow>
      ))}
    </TableWrapper>
  );
};

interface Props {
  data: { id: string; src: { publicURL: string } }[];
  schema: {
    renderCell: (rowObject: any) => any;
  };
}

export default RecordingTable;
