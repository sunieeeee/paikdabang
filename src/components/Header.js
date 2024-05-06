import React, { memo, useCallback, useState, useEffect } from "react";
import axios from "axios";
import Image from 'next/image';
import styled, { css } from 'styled-components';

import MenuLink from "@/components/MenuLink";
import mq from "@/assets/style/MediaQuery.js"

import logo from "@/assets/img/header/logo.png";
import facebook from "@/assets/img/header/facebook-ico.png";
import insta from "@/assets/img/header/insta-ico.png";

const HeaderContainer = styled.header`
z-index: 1;
position: sticky;
top: 0;
background-color: #fff;
color: #333;

& > div {
    position: relative;
}

.inner {
    display: flex;
    justify-content: space-between;
    /* border: 1px solid blue; */
}

.box:first-of-type {
    display: flex;
    align-items: flex-end;

    h1 {
        padding-bottom: 20px;

        ${mq.maxWidth('xl')`
            width: 50%;

            & img {
                display: block;
                width: 100%;
                object-fit: contain;
            }
        `}
    }
}

.box:last-of-type {
    width: 79%;

    .box_top {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-bottom: 20px;
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
            &:first-of-type {
                font-size: 12px;

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
            
            &:not(:first-of-type) {
                margin-right: 10px;

                a {
                    width: 20px;
                }
            }
            
        }
        ul {
            display: flex;

            li {
                
            }
        }

        ${mq.maxWidth('xl')`
            display: none;
        `}

    }

    

    nav {
        .menu_icon {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            display: none;
            flex-direction: column;
            gap: 8px;
            cursor: pointer;
            
            & > div {
                width: 32px;
                height: 3px;
                background-color: #333;
                border-radius: 10px;

                
            }
            &::before,
            &::after {
                content: '';
                display: block;
                width: 32px;
                height: 3px;
                background-color: #333;
                border-radius: 10px;
            }

            ${mq.maxWidth('xl')`
                display: flex;
            `}
        }

        .nav_background {
            z-index: 1;
            position: absolute;
            left: 0%;
            top: 100%;
            width: 100vw;
            height: 0;
            background: url('/assets/img/header/menu-bg.jpg') repeat top left;
            background-color: #f8f8f8;
            transition: .2s all;

            ${mq.maxWidth('xl')`
                display: none;
            `}
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
                            top: -22px;
                            width: 30px;
                            height: 30px;
                            background-color: #fff;
                            transform: rotate(45deg);
                        }

                        a {
                            color: #202020;

                            &:hover {
                                font-weight: bold;
                            }
                        }
                        
                    }

                    ${mq.maxWidth('xl')`
                        display: none;

                        li::before {
                            display: none;
                        }
                    `}
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

            ${mq.maxWidth('xl')`
                position: absolute;
                top: 100%;
                right: 0;
                display: block;
                width: 65%;
                height: 100vh;
                background-color: #fafafa;

                > li {
                    padding: 0;
                    width: 100%;
                    border-bottom: 1px solid #e5e5e5;
                     > a {
                        display: block;
                        padding: 3%;
                        height: 100%;
                        text-align: left;
                        font-size: 18px;
                    }
                    > ul.sub_menu {
                        position: static;
                        padding: 0 2%;
                        background-color: #fff;
                        
                        li {
                            padding: 1.5% 0;
                            border-bottom: 1px solid #e5e5e5;
                            
                            &:last-of-type {
                                border-bottom: 0;
                            }
                        }
                    }
                }

                
            `}
        }
    }
    
}
`;

const Header = memo(() => {
    const navBg = React.useRef();

    const onBgOn = useCallback(() => {
        navBg.current.classList.add('bgOn');
    }, []);

    const onBgOut = useCallback(() => {
        navBg.current.classList.remove('bgOn');
    }, []);

    const [header, setHeader] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('/data.json');
                setHeader(response.data.header);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        })();
    }, []);

    return (
        <HeaderContainer>
            <div>
                <div className="inner">
                    <div className="box">
                        <h1>
                            <a href="/">
                                <Image src={logo} alt="로고 이미지" />
                            </a>
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
                            <div className="menu_icon">
                                <div></div>
                            </div>
                            <div ref={navBg} className="nav_background"></div>
                            <ul>
                                {header.map((v, i) => (
                                    <li key={i} onMouseEnter={v.submenu && onBgOn} onMouseLeave={onBgOut}>
                                        <MenuLink href={v.url}>{v.title}</MenuLink>
                                        <ul className="sub_menu">
                                            {v.submenu && v.submenu.map((v, i) => (
                                                <li key={i}>
                                                    <a href={v.url}>{v.title}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <div className="nav_background"></div>
                    </div>
                </div>
            </div>
        </HeaderContainer>
    );
});

Header.displayName = "Header";

export default Header;
