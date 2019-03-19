import NextArrow from '@material-ui/icons/NavigateNext';
import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import theme from '../config/theme';
import Flex from './Flex';
import GreyPill from './GreyPill';

const Breadcrumbs = ({ links = [] }: Props) => {
  return (
    <Wrapper>
      <Flex style={{ marginLeft: '0px' }} alignItems="center">
        {links.map(({ to, label, readOnly }) => {
          if (readOnly) {
            return (
              <>
                <LinkWrapper key={to}>
                  <span>{label}</span>
                </LinkWrapper>
                <BreadcrumbArrow />
              </>
            );
          }
          return (
            <>
              <LinkWrapper key={to}>
                <Link to={to}>
                  <GreyPill style={{ margin: 0 }}>{label}</GreyPill>
                </Link>
              </LinkWrapper>
              <BreadcrumbArrow />
            </>
          );
        })}
      </Flex>
    </Wrapper>
  );
};

interface Props {
  links: LinkType[];
}

type LinkType = { to?: string; label: string; readOnly?: boolean };

const Wrapper = styled.div`
  margin-bottom: 0.8rem;
`;

const LinkWrapper = styled.div`
  display: flex;
  a,
  span {
    color: ${theme.midLightGrey};
    text-decoration: none;
    font-size: 0.6rem;
    line-height: 0.6rem;
    text-transform: uppercase;
  }
`;

const BreadcrumbArrow = styled(NextArrow)`
  color: ${theme.midLightGrey};
`;

export default Breadcrumbs;
