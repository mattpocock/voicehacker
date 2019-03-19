import React from 'react';
import Header from './Header';
import styled from 'styled-components';
import Flex from './Flex';
import Padding from './Padding';

const TopHeader = () => {
  return (
    <>
      <Flex>
        <SiteTitle white>VoiceHacker</SiteTitle>
      </Flex>
      <Padding padding="1.2rem" />
    </>
  );
};

export default TopHeader;

const SiteTitle = styled(Header)`
  font-size: 1.2rem;
`;
