import React, { useState } from 'react';
import Header from './Header';
import styled from 'styled-components';
import Flex from './Flex';
import Padding from './Padding';
import GreyButton from './GreyButton';
import Button from './Button';
import theme from '../config/theme';
import Menu from './Menu';

const TopHeader = () => {
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <SiteTitle white>VoiceHacker</SiteTitle>
        <TopMenuButton onClick={() => setMenuIsVisible(!menuIsVisible)}>
          Menu
        </TopMenuButton>
      </Flex>
      <Padding padding="1.2rem" />
      <Menu
        closeMenu={() => setMenuIsVisible(false)}
        isVisible={menuIsVisible}
      />
    </>
  );
};

export default TopHeader;

const SiteTitle = styled(Header)`
  font-size: 1.2rem;
`;

const TopMenuButton = styled(Button)`
  padding: 0.4rem 1rem;
  background-color: ${theme.white};
  color: ${theme.mainColorDark};
  font-size: 0.8rem;
`;
