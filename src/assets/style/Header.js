import Header from '@/components/Header';
import styled, { css } from 'styled-components';

const HeaderContainer = styled.header`
position: relative;
color: #333;

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

    h1 {
        padding-bottom: 20px;
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
    }

    

    nav {
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

export {HeaderContainer};