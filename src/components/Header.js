import React, {memo} from "react";
import styled from "styled-components";

import MenuLink from "@/components/MenuLink";

const HeaderContainer = styled.header`
    background-color: #333;
    color: #fff;
    padding: 10px;
    text-align: center;

    /* a {
        color: #fff;
    } */
`;

const Header = memo(() => {
    return (
        <HeaderContainer>
            <h1>Next.js Demo page</h1>
            <nav>
                <MenuLink href="/">Home</MenuLink>
                <MenuLink href="/hello?num1=100&num2=200">Hello</MenuLink>
                <MenuLink href="/world?num1=300&num2=400">World</MenuLink>
                <MenuLink href="/about/introduce">소개글</MenuLink>
                
                {/* 1) /src/pages/portfolio.js 파일을 접속 */}
                {/* 2) /src/pages/portfolio/index.js 파일을 접속 */}
                {/* 두 가지 경우 중에서 (1)번이 우선된다. */}
                <MenuLink href="/portfolio">포트폴리오</MenuLink>
            </nav>
        </HeaderContainer>
    );
});

Header.displayName= "Header";

export default Header;