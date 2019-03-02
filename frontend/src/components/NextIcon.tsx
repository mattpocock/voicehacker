import React from 'react';
import NextArrow from '@material-ui/icons/NavigateNext';
import theme from '../config/theme';

const NextIcon = ({ style = {} }) => {
  return (
    <NextArrow style={{ fill: theme.midGrey, fontSize: '2rem', ...style }} />
  );
};

export default NextIcon;
