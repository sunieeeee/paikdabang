import React, {memo, useCallback, useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";

import MenuLink from "@/components/MenuLink";

import Image from 'next/image'
import logo from "@/assets/img/header/logo.png"
import facebook from "@/assets/img/header/facebook-ico.png"
import insta from "@/assets/img/header/insta-ico.png"

const HeaderContainer = styled.header`
    position: relative;
    color: #333;
    background-color: lightcoral;

    .inner {
        display: flex;
        justify-content: space-between;
        /* border: 1px solid blue; */
    }

    .box {
        /* padding-bottom: 20px; */
        /* border: 1px solid red */
    }

    .box:first-of-type {
        display: flex;
        align-items: flex-end;
    }

    .box:last-of-type {
        width: 79%;

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

                &:first-of-type::after {
                    content: '';
                    display: inline-block;
                    vertical-align: middle;
                    margin: 14px;
                    width: 1px;
                    height: 10px;
                    background-color: #555;
                }
                
                &:not(:first-of-type) a {
                    width: 30px;
                }

                
            }
            ul {
                display: flex;

                li {
                    
                }
            }
        }

        

        nav {
            .nav_background {
                position: absolute;
                left: 0%;
                top: 100%;
                width: 100vw;
                height: 0;
                background: yellow;
                transition: .2s all;
            }

            .nav_background.bgOn {
                height: 220px;
            }

            & > ul {
                display: flex;
                flex-wrap: wrap;

                & > li {
                    position: relative;
                    padding-bottom: 20px;
                    width: 14.285%;
                    text-align: center;
                    
                    > a {
                        font-size: 15px;
                    }

                    & > ul.sub_menu {
                        z-index: 1;
                        position: absolute;
                        left: 45px;
                        top: 100%;
                        display: none;
                        padding-top: 20px;
                        min-width: 180%;
                        /* background-color: lightblue; */
                        overflow: hidden;

                        li {
                            padding: 10px 0;
                            width: 100%;
                            text-align: left;

                            &::before {
                                content: "";
                                position: absolute;
                                left: 10px;
                                top: -10%;
                                width: 30px;
                                height: 30px;
                                background-color: #fff;
                                transform: rotate(45deg);
                            }

                            &:hover {
                                font-weight: bold;
                            }
                        }
                    }
                    
                    &:hover {
                        > ul.sub_menu {
                            display: block;
                        }
                    }
                }
                
                a {
                    display: block;
                    width: 100%;
                    /* border: 1px solid red; */
                }
            }
        }
        
    }
`;

const Header = memo(() => {
    const [menu, setMenu] = useState([]);

    useEffect(()=>{
        (async()=>{
            let json = null;

            try {
                const response = await axios.get('/data.json');
                json = response.data;
                
            } catch (e) {
                console.error(e);
                
                return;
            } finally {
                
                setMenu(() => json);
                console.log(menu)
            }
            
            
            
        })();
        
    }, []);
    // console.log(menu.header)
    const navBg = React.useRef();
    
    const onBgOn = useCallback((e)=> {
        navBg.current.classList.add('bgOn');
    }, []); 

    const onBgOut = useCallback((e)=> {
        navBg.current.classList.remove('bgOn');
    }, []); 




    return (
        <HeaderContainer>
            <div className="inner">
                <div className="box">
                    <h1>
                        logo
                        {/* <Image src={logo} alt="로고 이미지" /> */}
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
                        <div ref={navBg} className="nav_background"></div>
                        <ul>
                        {/* {
                            menu.header.map((v, i) => {
                                return (
                                    <li key={i}>
                                        <MenuLink href={v.url}>{v.title}</MenuLink>

                                        <ul>
                                            {v.submenu.map((v, i)=> (
                                                <li key={i}>{v.title}</li>
                                            ))}
                                        </ul>
                                    </li>
                                )
                            })
                        } */}

                            {/* <li onMouseEnter={onBgOn} onMouseLeave={onBgOut}>
                                <MenuLink href="/">빽다방</MenuLink>
                                
                                <ul className="sub_menu">
                                    <li>CEO 인사말</li>
                                    <li>빽다방 소개</li>
                                    <li>멤버십 / 앱 소개</li>
                                    <li>커피 이야기</li>
                                    <li>교육 이야기</li>
                                </ul>
                            </li>  
                            <li>
                                <MenuLink href="/world?num1=300&num2=400">메뉴</MenuLink>
                                <ul className="sub_menu">
                                    <li>CEO 인사말</li>
                                    <li>빽다방 소개</li>
                                    <li>멤버십 / 앱 소개</li>
                                    <li>커피 이야기</li>
                                    <li>교육 이야기</li>
                                </ul>
                            </li>
                            <li>
                                <MenuLink href="/about/introduce">소식</MenuLink>
                                <ul className="sub_menu">
                                    <li>CEO 인사말</li>
                                    <li>빽다방 소개</li>
                                    <li>멤버십 / 앱 소개</li>
                                    <li>커피 이야기</li>
                                    <li>교육 이야기</li>
                                </ul>
                            </li>
                            <li>
                                <MenuLink href="/about/introduce">커뮤니티</MenuLink>
                                <ul className="sub_menu">
                                    <li>CEO 인사말</li>
                                    <li>빽다방 소개</li>
                                    <li>멤버십 / 앱 소개</li>
                                    <li>커피 이야기</li>
                                    <li>교육 이야기</li>
                                </ul>
                            </li>
                            <li>
                                <MenuLink href="/about/introduce">매장안내</MenuLink>
                                <ul className="sub_menu">
                                    <li>CEO 인사말</li>
                                    <li>빽다방 소개</li>
                                    <li>멤버십 / 앱 소개</li>
                                    <li>커피 이야기</li>
                                    <li>교육 이야기</li>
                                </ul>
                            </li>
                            <li>
                                <MenuLink href="/about/introduce">창업안내</MenuLink>
                                <ul className="sub_menu">
                                    <li>CEO 인사말</li>
                                    <li>빽다방 소개</li>
                                    <li>멤버십 / 앱 소개</li>
                                    <li>커피 이야기</li>
                                    <li>교육 이야기</li>
                                </ul>
                            </li>
                            <li>
                                <MenuLink href="/about/introduce">고객의 소리</MenuLink>
                            </li> */}
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