import React, { memo, useCallback, useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from 'next/image';
import styled, { css } from 'styled-components';
import Link from 'next/link';

//상태값을 로드하기 위한 hook과 action함수를 dispatch할 hook참조
import {useSelector, useDispatch} from 'react-redux';
//Slice에 정의된 함수 참조
// - 동기처리인 경우에는 리듀서 내의 액션함수 참조
// - 비동기처리인 경우에는 Slice내의 미들웨어 함수 참조
import {getList} from '@/slices/HeaderSlice';

import MenuLink from "@/components/MenuLink";
import mq from "@/assets/style/MediaQuery.js";

import logo from "@/assets/img/header/logo.png";
import facebook from "@/assets/img/header/facebook-ico.png";
import insta from "@/assets/img/header/insta-ico.png";


const HeaderContainer = styled.header`
z-index: 2;
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
            transition: .3s padding-bottom;
            padding-bottom: 0;
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
                            ${mq.minWidth('xl')`
                                &:hover {
                                    font-weight: bold;
                                }
                            `}
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
                            padding: 20px;
                            border-bottom: 1px solid #e5e5e5;
                            
                            &:last-of-type {
                                border-bottom: 0;
                            }
                        }
                    }

                    > ul.sub_menu.sub_menu_active {
                        height: auto;
                     
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
    const subMenu = useRef([]);

    const [viewPort, setUseViewPort] = useState();

    useEffect(() => {
        const handleResize = () => {
            setUseViewPort(window.innerWidth);
            // console.log(viewPort);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, [viewPort]);

    const onBgOn = useCallback(() => {
        window.innerWidth >= 1200 && navBg.current.classList.add('bgOn');
    }, []);

    const onBgOut = useCallback(() => {
        window.innerWidth >= 1200 && navBg.current.classList.remove('bgOn');
    }, []);

    const navOpenMo = useCallback(() => {
        window.innerWidth < 1200 && menuIcon.current.classList.toggle('menu_active');
        window.innerWidth < 1200 && navList.current.classList.toggle('menu_active');
    }, []);

    const navListOpenMo = useCallback((e) => {
        subMenu.current.forEach((v, i) => {
            v.classList.remove('sub_menu_active');
        });
      
        const index = parseInt(e.currentTarget.dataset.index);
        if (!isNaN(index) && subMenu.current[index]) {
            subMenu.current[index].classList.add('sub_menu_active');
        }
    }, []);

    //dispatch 함수 생성
    const dispatch = useDispatch();
    //hook을 통해 slice가 관리하는 상태값 가져오기
    const {data, loading, error} = useSelector((state) => state.HeaderSlice);

    //컴포넌트가 마운트되면 데이터 조회를 위한 액션함수를 디스패치 함
    useEffect(() => {
        dispatch(getList());
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
                                {data && data.map((v, i) => (
                                    <li key={i} data-index={i} onMouseEnter={v.submenu && onBgOn} onMouseLeave={onBgOut} onClick={navListOpenMo}>
                                        <MenuLink href={v.url}>{v.title}</MenuLink>
                                        <ul ref={el=> subMenu.current[i] = el} className="sub_menu">
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
