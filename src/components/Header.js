import React, { memo, useCallback, useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from 'next/image';
import styled, { css } from 'styled-components';
import Link from 'next/link';

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

    ${mq.maxWidth('xl')`
        padding: 0 10px;
    `}
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

    ${mq.maxWidth('xl')`
        width: auto;
    `}

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
            right: 10px;
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
                transition: .3s transform;
            }

            ${mq.maxWidth('xl')`
                display: flex;

                &.menu_active > div {
                    display: none;
                }
                &.menu_active::before {
                    transform: translateY(3.875px) rotate(45deg);
                }
                &.menu_active::after {
                    transform: translateY(-6.875px) rotate(-45deg);
                }
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
                position: fixed;
                left: 0; 
                top: 0;
                width: 100%;
                height: 100%;
                background: none;
                background-color: #01010140
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
                ${mq.minWidth('xl')`
                    &:hover {
                        > ul.sub_menu {
                            display: block;
                        }
                    }
                `}
                
            }
            
            a {
                display: block;
                width: 100%;
                /* border: 1px solid red; */
            }

            ${mq.maxWidth('xl')`
                position: absolute;
                top: 100%;
                right: -100%;
                display: block;
                width: 65%;
                height: 100vh;
                background-color: #fafafa;
                transition: .3s right;

                &.menu_active {
                    right: 0;
                }

                > li {
                    padding: 0;
                    width: 100%;
                    border-bottom: 1px solid #e5e5e5;
                     > a {
                        display: block;
                        padding: 20px;
                        height: 100%;
                        text-align: left;
                        font-size: 18px;
                    }
                    > ul.sub_menu {
                        position: static;
                        display: block;
                        height: 0;
                        overflow: hidden;
                        padding: 0 2%;
                        background-color: #fff;
                        transition: .3s all;
                        
                        li {
                            padding: 1.5% 0;
                            border-bottom: 1px solid #e5e5e5;
                            
                            &:last-of-type {
                                border-bottom: 0;
                            }
                        }
                    }

                    > ul.sub_menu.sub_menu_active {
                        height: 100%;
                        overflow: visible;
                    }
                }

                
            `}
        }
    }
    
}
`;

const Header = memo(() => {
    const navBg = useRef();
    const menuIcon = useRef();
    const navList = useRef();
    const subMenu = useRef();

    
    const [viewPort, setUseViewPort] = useState();
    useEffect(() => {
        const handleResize = () => {
            setUseViewPort(window.innerWidth);
            console.log(viewPort);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };

        
      }, [viewPort]);

    const onBgOn = useCallback(() => {
        viewPort > 1200 && navBg.current.classList.add('bgOn');
    }, [viewPort]);

    const onBgOut = useCallback(() => {
        viewPort > 1200 && navBg.current.classList.remove('bgOn');
    }, [viewPort]);

    const navOpenMo = useCallback(() => {
        menuIcon.current.classList.toggle('menu_active');
        navList.current.classList.toggle('menu_active');
    }, []);

    const navListOpenMo = useCallback((e) => {
        console.log('dd')
        console.log(e.currentTarget.querySelector('ul'))
        
   
        subMenu.classList.remove('sub_menu_active');
      
        
        e.currentTarget.querySelector('ul').classList.add('sub_menu_active');
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
                            <Link href="/">
                                <Image src={logo} alt="로고 이미지" />
                            </Link>
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
                            <div ref={menuIcon} className="menu_icon" onClick={navOpenMo}>
                                <div></div>
                            </div>
                            <div ref={navBg} className="nav_background"></div>
                            <ul ref={navList}>
                                {header.map((v, i) => (
                                    <li key={i} onMouseEnter={v.submenu && onBgOn} onMouseLeave={onBgOut} onClick={navListOpenMo}>
                                        <MenuLink href={v.url}>{v.title}</MenuLink>
                                        <ul ref={subMenu} className="sub_menu">
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
