import React from 'react';
import styled from "styled-components";
//import { NavLink } from "react-router-dom";
import Link from "next/link";

/** 메뉴링크 --> NavLink: 현재 머물고 있는 페이지와 관련된 링크에 CSS적용 */
//const MenuLinkContainer = styled(NavLink)`
const MenuLinkContainer = styled(Link)`
    font-size: 20px;
    cursor: pointer;
    text-decoration: none;
    padding-bottom: 2px;
    color: #222;


    &:last-child {
        &:after {
            /* 글자색을 흰색으로 지정하여 화면에서 숨긴다. */
            color: #fff;
        }
    }

    /*
        URL이 현재 메뉴를 가르키는 경우 (콜론이 아닌 점에 주의)
        활성 메뉴에 적용되는 기본 클래스 이름이 'active'이다.
    */
    &.active {
        text-decoration: underline;
        color: #22b8cf;
    }
`;

//const MenuLink = ({to, children}) => <MenuLinkContainer to={to}>{children}</MenuLinkContainer>;
const MenuLink = ({href, children}) => <MenuLinkContainer href={href}>{children}</MenuLinkContainer>;

export default MenuLink;