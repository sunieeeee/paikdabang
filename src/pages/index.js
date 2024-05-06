import React, {memo, useState, useEffect} from "react";
import styled, { css } from 'styled-components';
import Image from "next/image";
import ImageSlider from "react-simple-image-slider";

import btnPlus from "@/assets/img/main/view_icon.png"
import btnOn from "@/assets/img/main/btn1-on.png"

const MainContainer = styled.main`
    margin: 0 auto;
    width: 1920px;
    border: 2px solid red;
    overflow: hidden !important;

    .banner_wrap {
        display: flex;
        height: 320px;

        .banner_box {
            width: 100%;
            border: 1px solid red;
            background-repeat: no-repeat;
            background-size: cover;

            .banner_info {
                padding: 30px 50px;
                width: 600px;
                
                &.right_align {
                    padding: 30px 0;
                    margin: 0 0 0 auto;
                }

                dl {
                    border: 1px solid blue;
                    
                    dt {
                        width: 20%;
                        font-size: 60px;
                        font-weight: 900;
                        font-family: var(--font-montserrat);
                    }
                }
            }

            .btn {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 50px; 
                height: 50px;
                background-color: #fff;
                border-radius: 100%;
                

                &:hover {
                    .btnOff {
                        height: 0;
                        width: 0;
                        transform: scale(1.3) rotate(180deg);
                    }
                    .btnOn {
                        width: 100%;
                        height: 100%;
                        transform: scale(1) rotate(0deg);
                    }
                }

                .btnOff {
                    display: block;
                    transform: scale(1) rotate(0deg);transition: .3s transform;
                }

                .btnOn {
                    display: block;
                    width: 0;
                    height: 0;
                    transform: scale(0) rotate(-360deg);transition: .3s transform;
                }
            }
        }

        // 첫 번째 .banner_box
        &:nth-of-type(1) .banner_box:nth-of-type(1) {
            background-image: url('/assets/img/main/main_sec1.jpg');
            background-position: 60%;
            
            dl {
                dt {
                    color: #071f60
                }
                
                dd {
                    color: #293f83;
                }
            }
        }

        // 두 번째 .banner_box
        &:nth-of-type(1) .banner_box:nth-of-type(2) {
            background-image: url('/assets/img/main/main_sec2.jpg');
            background-position: right 10% center;
            background-size: 40%;
            background-color: var(--color-blue);

            dl {
                dt {
                    color: #fff;
                }
                
                dd {
                    color: #c4cbde;
                }
            }
            
        }

        // 세 번째 .banner_box
        &:nth-of-type(2) .banner_box:nth-of-type(1) {
            background-image: url('/assets/img/main/main_sec3.jpg');

            dl {
                dt {
                    color: #6b4d30;
                }
                
                dd {
                    color: #000;
                }
            }
        }

        // 네 번째 .banner_box
        &:nth-of-type(2) .banner_box:nth-of-type(2) {
            background-image: url('/assets/img/main/main_sec4.jpg');

            dl {
                dt {
                    color: #071f60
                }
                
                dd {
                    color: #293f83;
                }
            }
        }
    }
    
    
`


const index = memo(() => {
    const images = [
    {url: "/assets/img/main/slide/slide1.jpg"},
    {url: "/assets/img/main/slide/slide2.jpg"},
    {url: "/assets/img/main/slide/slide3.jpg"},
    {url: "/assets/img/main/slide/slide4.jpg"}
    ]    

    return (
        <MainContainer>
            <ImageSlider 
                width={1920}
                height={600}
                images={images}
                showBullets={true}
                // showNavs={true}
                autoPlay={true}
                autoPlayDelay={2.0}
                loop={true}
                style={{margin: '0 auto'}}
            />

            <div>
                <div className="banner_wrap">
                    <div className="banner_box">
                        <a href=""></a>
                        
                        <div className="banner_info right_align">
                            <dl>
                                <dt>FRESH COFFE</dt>
                                <dd>신선한 뉴크롬 원두를 사용하여 추출한 커피메뉴</dd>
                            </dl>
                            <div className="btn">
                                <Image className="btnOff" src={btnPlus} alt="" />
                                <Image className="btnOn" src={btnOn} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="banner_box">
                        <a href=""></a>
                        
                        <div className="banner_info">
                            <dl>
                                <dt>FRESH COFFE</dt>
                                <dd>신선한 뉴크롬 원두를 사용하여 추출한 커피메뉴</dd>
                            </dl>
                            <div className="btn">
                                <Image className="btnOff" src={btnPlus} alt="" />
                                <Image className="btnOn" src={btnOn} alt="" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="banner_wrap">
                    <div className="banner_box">
                        <a href=""></a>
                        
                        <div className="banner_info right_align">
                            <dl>
                                <dt>FRESH COFFE</dt>
                                <dd>신선한 뉴크롬 원두를 사용하여 추출한 커피메뉴</dd>
                            </dl>
                            <div className="btn">
                                <Image className="btnOff" src={btnPlus} alt="" />
                                <Image className="btnOn" src={btnOn} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="banner_box">
                        <a href=""></a>
                        
                        <div className="banner_info">
                            <dl>
                                <dt>FRESH COFFE</dt>
                                <dd>신선한 뉴크롬 원두를 사용하여 추출한 커피메뉴</dd>
                            </dl>
                            <div className="btn">
                                <Image className="btnOff" src={btnPlus} alt="" />
                                <Image className="btnOn" src={btnOn} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
    );
});

index.displayName ="index";

export default index;