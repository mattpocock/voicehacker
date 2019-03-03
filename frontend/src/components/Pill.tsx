import React from 'react';
import styled from 'styled-components';
import theme from '../config/theme';

const Pill = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>;
};

interface Props {
  children: any;
  style?: any;
}

export default Pill;

const Wrapper = styled.div`
  background-color: ${theme.secondColorLight};
  color: ${theme.secondColorDarkText};
  display: inline-block;
  padding: 0.2rem 0.5rem;
  font-size: 0.7rem;
  letter-spacing: 0.1px;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: bold;
  margin-right: 0.5rem;
`;
