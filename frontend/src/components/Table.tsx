import React from 'react';
import styled from 'styled-components';
import theme from '../config/theme';
import Flex from './Flex';

const Table = ({ data, schema }: Props) => {
  return (
    <TableWrapper>
      {data.map((rowObject) => (
        <TableRow key={rowObject.id} onClick={() => schema.onClick(rowObject)}>
          <Flex alignItems="center">{schema.renderCell(rowObject)}</Flex>
        </TableRow>
      ))}
    </TableWrapper>
  );
};

interface Props {
  data: { id: string }[];
  schema: {
    renderCell: (rowObject: any) => any;
    onClick: (rowObject: any) => void;
  };
}

export default Table;

export const TableRow = styled.button`
  padding: 2rem 1rem;
  margin: 0rem -1rem;
  display: block;
  border: none;
  background-color: inherit;
  box-sizing: border-box;
  width: calc(100% + 2rem);
`;

export const TableWrapper = styled.div`
  & > button {
    &:nth-child(even) {
      background-color: ${theme.mainColorTint};
    }
  }
`;
