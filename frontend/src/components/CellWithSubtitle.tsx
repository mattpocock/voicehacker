import React from 'react';

import Flex from './Flex';
import CellHeading from './CellHeading';
import CellHeadingSubtitle from './CellHeadingSubtitle';
import NextIcon from './NextIcon';
import Padding from './Padding';

const CellWithSubtitle = ({ title = '', subtitle = '', pills }: Props) => {
  return (
    <Flex alignItems="center" gutter="1rem" style={{ width: '100%' }}>
      <div style={{ flexGrow: 1 }}>
        <CellHeading style={{ marginBottom: '0.25rem' }}>{title}</CellHeading>
        {pills ? (
          <>
            <Padding padding="0.25rem" />
            <div>{pills}</div>
          </>
        ) : (
          <CellHeadingSubtitle>{subtitle}</CellHeadingSubtitle>
        )}
      </div>
      <div>
        <NextIcon />
      </div>
    </Flex>
  );
};

interface Props {
  title: string;
  subtitle?: string;
  pills?: any[];
}

export default CellWithSubtitle;
