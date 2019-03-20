import React from 'react';
import styled from 'styled-components';
import theme from '../config/theme';
import Flex from './Flex';
import { Link } from 'gatsby';
import { buttonStyles } from './Button';
import SearchIcon from '@material-ui/icons/Search';
import AccentIcon from '@material-ui/icons/LibraryBooks';

const nav = [
  {
    to: '/',
    label: 'Accents',
    icon: <AccentIcon />,
  },
  {
    to: '/search',
    label: 'Dictionary',
    icon: <SearchIcon />,
  },
];

const BottomNav = () => {
  return (
    <Wrapper>
      <Flex>
        {nav.map(({ to, label, icon }) => (
          <LinkWrapper style={{ flexGrow: 1 }} key={to}>
            <Link to={to}>
              {icon}
              <span>{label}</span>
            </Link>
          </LinkWrapper>
        ))}
      </Flex>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background-color: ${theme.white};
  z-index: 5;
  position: fixed;
  bottom: 0;
  left: 0;
`;

const LinkWrapper = styled.div`
  a {
    ${buttonStyles};
    border: none;
    border-radius: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: none;
    padding: 0.8rem;
    color: ${theme.midGrey};
    font-weight: 300;
    font-size: 0.8rem;
    text-decoration: none;
    text-align: center;
    border-top: 1px solid ${theme.greyTint};
    border-right: 1px solid ${theme.greyTint};
    svg {
      margin-right: 8px;
      color: ${theme.midLightGrey};
    }
  }
  :last-child {
    a {
      border-right: none;
    }
  }
`;

export default BottomNav;
