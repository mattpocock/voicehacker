import React from 'react';
import styled from 'styled-components';
import theme from '../config/theme';
import { css } from 'styled-components';

const Pill = ({ children, ...props }: Props) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

interface Props {
  children: any;
  style?: any;
}

export default Pill;

const pillStyle = css`
  display: inline-block;
  padding: 0.2rem 0.5rem;
  font-size: 0.7rem;
  letter-spacing: 0.1px;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: bold;
  margin-right: 0.5rem;
`;

const Wrapper = styled.div`
  ${pillStyle};
  background-color: ${theme.secondColorLight};
  color: ${theme.secondColorDarkText};
`;
