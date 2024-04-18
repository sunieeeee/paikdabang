import React, {memo} from "react";
import styled from "styled-components";

import MenuLink from "@/components/MenuLink";

import Image from 'next/image'
import logo from "@/assets/img/header/logo.png"
import facebook from "@/assets/img/header/facebook-ico.png"
import insta from "@/assets/img/header/insta-ico.png"

const HeaderContainer = styled.header`
position: relative;
    color: #333;

    .inner {
        display: flex;
        justify-content: space-between;
        border: 1px solid blue;
    }

    .box {
        border: 1px solid red
    }

    .box:first-of-type {
        display: flex;
        align-items: flex-end;
    }

    .box:last-of-type {
        .box_top {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: 100%;

            li {
                display: flex;
                align-items: center;
                a {
                    
                    color: #555;
                    display: block;

                    img {
                        display: block;
                        width: 100%;
                        object-fit: contain;
                    }
                    
                    
                }

                
                &:not(:first-of-type) a {
                    width: 30px;
                }

                &::after {
                    content: '';
                    display: inline-block;
                    vertical-align: middle;
                    margin: 14px;
                    width: 1px;
                    height: 10px;
                    background-color: #555;
                }
            }
            ul {
                display: flex;

                li {
                    
                }
            }
        }

        nav > ul {
            display: flex;
            flex-wrap: wrap;
            gap: 40px;
            
            li {
                position: relative;
                &:hover {
                    & > ul {
                        display: block;
                    }
                }

                & > ul {
                    position: absolute;
                    left: 0;
                    top: 100%;
                    display: block;
                    /* width: 100%; */
                    background-color: lightblue;
                    display: none;

                    li {
                        
                    }
                }
            }
            a {
                display: block;
                /* width: 100%; */
                border: 1px solid red;
            }
        }
    }
`;

const Header = memo(() => {
    return (
        <HeaderContainer>
            <div className="inner">
                <div className="box">
                    <h1>
                        <Image src={logo} alt="로고 이미지" />
                    </h1>
                </div>
                <div className="box">
                    <div className="box_top">
                        <ul>
                            <li>
                                <a href="https://www.theborn.co.kr/">더본코리아</a>
                            </li>
                            <li>
                                <a href="">
                                    <Image src={facebook} alt="페이스북 이미지" />
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <Image src={insta} alt="인스타그램 이미지" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    <nav>
                        <ul>
                            <li>
                                <MenuLink href="/">빽다방</MenuLink>
                                
                                <ul>
                                    <li>CEO 인사말</li>
                                    <li>빽다방 소개</li>
                                    <li>멤버십 / 앱 소개</li>
                                    <li>커피 이야기</li>
                                    <li>교육 이야기</li>
                                </ul>
                            </li>  
                            <li>
                                <MenuLink href="/world?num1=300&num2=400">메뉴</MenuLink>
                                <ul>
                                    <li>CEO 인사말</li>
                                    <li>빽다방 소개</li>
                                    <li>멤버십 / 앱 소개</li>
                                    <li>커피 이야기</li>
                                    <li>교육 이야기</li>
                                </ul>
                            </li>
                            <li>
                                <MenuLink href="/about/introduce">소식</MenuLink>
                                <ul>
                                    <li>CEO 인사말</li>
                                    <li>빽다방 소개</li>
                                    <li>멤버십 / 앱 소개</li>
                                    <li>커피 이야기</li>
                                    <li>교육 이야기</li>
                                </ul>
                            </li>
                            <li>
                                <MenuLink href="/about/introduce">커뮤니티</MenuLink>
                                <ul>
                                    <li>CEO 인사말</li>
                                    <li>빽다방 소개</li>
                                    <li>멤버십 / 앱 소개</li>
                                    <li>커피 이야기</li>
                                    <li>교육 이야기</li>
                                </ul>
                            </li>
                            <li>
                                <MenuLink href="/about/introduce">매장안내</MenuLink>
                                <ul>
                                    <li>CEO 인사말</li>
                                    <li>빽다방 소개</li>
                                    <li>멤버십 / 앱 소개</li>
                                    <li>커피 이야기</li>
                                    <li>교육 이야기</li>
                                </ul>
                            </li>
                            <li>
                                <MenuLink href="/about/introduce">창업안내</MenuLink>
                                <ul>
                                    <li>CEO 인사말</li>
                                    <li>빽다방 소개</li>
                                    <li>멤버십 / 앱 소개</li>
                                    <li>커피 이야기</li>
                                    <li>교육 이야기</li>
                                </ul>
                            </li>
                            <li>
                                <MenuLink href="/about/introduce">고객의 소리</MenuLink>
                                <ul>
                                    <li>CEO 인사말</li>
                                    <li>빽다방 소개</li>
                                    <li>멤버십 / 앱 소개</li>
                                    <li>커피 이야기</li>
                                    <li>교육 이야기</li>
                                </ul>
                            </li>
                        </ul>
                        
                        
                        
                        
                        
                        
                        
                        
                        {/* 1) /src/pages/portfolio.js 파일을 접속 */}
                        {/* 2) /src/pages/portfolio/index.js 파일을 접속 */}
                        {/* 두 가지 경우 중에서 (1)번이 우선된다. */}
                        {/* <MenuLink href="/portfolio">포트폴리오</MenuLink> */}
                    </nav>
                    <div className="nav_background"></div>
                </div>
            </div>
        </HeaderContainer>
    );
});

Header.displayName= "Header";

export default Header;