import React from 'react';

import Flex from './Flex';
import CellHeading from './CellHeading';
import CellHeadingSubtitle from './CellHeadingSubtitle';
import NextIcon from './NextIcon';

const CellWithSubtitle = ({ title = '', subtitle = '' }) => {
  return (
    <Flex alignItems="center" gutter="1rem" style={{ width: '100%' }}>
      <div style={{ flexGrow: 1 }}>
        <CellHeading style={{ marginBottom: '0.25rem' }}>{title}</CellHeading>
        <CellHeadingSubtitle>{subtitle}</CellHeadingSubtitle>
      </div>
      <div>
        <NextIcon />
      </div>
    </Flex>
  );
};

export default CellWithSubtitle;
