import React, { memo, useCallback, useState, useEffect } from "react";
import axios from "axios";
import Image from 'next/image';

import { HeaderContainer } from "@/assets/style/Header";
import MenuLink from "@/components/MenuLink";

import logo from "@/assets/img/header/logo.png";
import facebook from "@/assets/img/header/facebook-ico.png";
import insta from "@/assets/img/header/insta-ico.png";

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
            <div className="inner">
                <div className="box">
                    <h1>
                        {/* logo */}
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
        </HeaderContainer>
    );
});

Header.displayName = "Header";

export default Header;
