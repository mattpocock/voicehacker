import React from 'react';
import Input from './Input';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import theme from '../config/theme';

const SearchInput = (props: any) => {
  return (
    <div style={{ position: 'relative' }}>
      <StyledInput {...props} />
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
    </div>
  );
};

const StyledInput = styled(Input)`
  padding-right: 2.2rem;
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0.5rem;
  svg {
    font-size: 1.5rem;
    color: ${theme.midLightGrey};
  }
`;

export default SearchInput;
