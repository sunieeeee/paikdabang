import React, {memo} from 'react';
import styled, { css } from 'styled-components';

const SubTitle = styled.h2`
  padding-top: ${(props) => props.$paddingTop};
  padding-bottom: ${(props) => props.$paddingBottom};
  font-size: 34px;
  text-align: center;
  color: #071F60;
  font-weight: 700;

  &::after {
    content: '';
    display: block;
    margin: 20px auto 0;
    width: 50px;
    height: 3px;
    background-color: #071F60;
  }
`

const MenuSubTitle = memo(({children, $paddingTop, $paddingBottom}) => {

  return (
    <SubTitle $paddingTop={$paddingTop} $paddingBottom={$paddingBottom}>{children}</SubTitle>
  );
});

MenuSubTitle.displayName = "MenuSubTitle";

export default MenuSubTitle;