import { navigate } from 'gatsby';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import theme from '../config/theme';
import {
  beginPracticeMode,
  endPracticeMode,
} from '../utils/redux/globalReducer';
import { ReduxState } from '../utils/redux/redux';
import Flex from './Flex';
import Pill from './Pill';
import Button from './Button';

const PracticeBar = ({
  accentDisplayName,
  accentName,
  soundDisplayName,
  soundSymbol,
  isVisible,
}: Props) => {
  return (
    <Bar isVisible={isVisible}>
      <Flex justifyContent="space-between">
        <div>
          <PracticeBarHeader>
            {[accentDisplayName, soundDisplayName]
              .filter((val) => val)
              .join(' - ')}
          </PracticeBarHeader>
          <Pill style={{ boxShadow: '0px 0px 5px rgba(0,0,0,0.18)' }}>
            Practice Mode
          </Pill>
        </div>
        <Button
          onClick={() => {
            if (
              soundSymbol &&
              window.location.href.includes(`/${soundSymbol}`)
            ) {
              navigate(`/accents/${accentName}`);
            } else if (window.location.href.includes(accentName)) {
              navigate(`/`);
            } else if (soundSymbol) {
              navigate(`/accents/${accentName}/${soundSymbol}`);
            }
          }}
        >
          Back
        </Button>
      </Flex>
    </Bar>
  );
};

interface Props {
  accentDisplayName: string;
  accentName: string;
  soundDisplayName: string;
  soundSymbol: string;
  isVisible: boolean;
  dispatch: (any: any) => void;
}

const mapStateToProps = (state: ReduxState) => ({
  isVisible: state.global.isInPracticeMode,
  accentName: state.global.practiceAccent,
  accentDisplayName: state.global.accentDisplayName,
  soundSymbol: state.global.practiceSound,
  soundDisplayName: state.global.soundDisplayName,
});

export default connect(mapStateToProps)(PracticeBar);

const Bar = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0.8rem 0.8rem;
  z-index: 5;
  min-height: 3rem;
  background-image: linear-gradient(
    to right,
    ${theme.mainColorDark},
    ${theme.mainColorMid}
  );
  transition: transform 0.6s;
  transform: translateY(${(props) => (props.isVisible ? '0%' : '100%')});
`;

const PracticeBarHeader = styled.h2`
  color: white;
  margin: 0;
  font-size: 1rem;
  margin-bottom: 0.4rem;
`;
