import React, {memo, useState, useEffect} from "react";
import axios from "axios";
import styled, { css } from 'styled-components';
import Image from "next/image";
import ImageSlider from "react-simple-image-slider";

import btnPlus from "@/assets/img/main/view_icon.png"
import btnOn from "@/assets/img/main/btn1-on.png"

import Mainmenu from '@/components/mainmenu';

const MainContainer = styled.main`
    margin: 0 auto;
    width: 1920px;
    border: 2px solid red;
    overflow: hidden !important;

    .banner_wrap {
        display: flex;
        flex-wrap: wrap;
        
        .banner_box {
            width: 100%;
            height: 320px;
            border: 1px solid red;
            background-repeat: no-repeat;
            background-size: cover;

            .banner_info {
                padding: 30px 50px;
                width: 60%;
                /* width: 600px; */
                border: 1px solid red;

                &.right_align {
                    padding: 30px 0;
                    margin: 0 0 0 auto;
                }

                dl {
                    margin-bottom: 40px;
                    /* border: 1px solid blue; */
                    
                    dt {
                        margin-bottom: 20px;
                        width: 20%;
                        font-size: 60px;
                        font-weight: 900;
                        font-family: var(--font-montserrat);
                    }

                    dd {
                        font-size: 18px;
                        font-weight: 500;
                    }
                }
            }

            .btn {
                /* display: flex;
                justify-content: center;
                align-items: center; */
                position: relative;
                width: 50px; 
                height: 50px;
                background-color: #fff;
                border-radius: 100%;
                

                &:hover {
                    .btnOff {
                        height: 0;
                        width: 0;
                        transform: translate(-50%, -50%) scale(1.3) rotate(180deg);
                    }
                    .btnOn {
                        width: 100%;
                        height: 100%;
                        transform: translate(-50%, -50%) scale(1) rotate(0deg);
                    }
                }

                .btnOff {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    display: block;
                    transform: translate(-50%, -50%) scale(1) rotate(0deg);
                    transition: .3s all;
                }

                .btnOn {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    display: block;
                    width: 0;
                    height: 0;
                    transform: translate(-50%, -50%) scale(0) rotate(-360deg);
                    transition: .3s all;
                }
            }
        }

        // 첫 번째 .banner_box
        & .banner_box:nth-of-type(1) {
            width: 50%;
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
        & .banner_box:nth-of-type(2) {
            width: 50%;
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
        & .banner_box:nth-of-type(3) {
            width: 100%;
            background-image: url('/assets/img/main/main_sec3.jpg');

            .banner_info {
                margin: 0 auto;
            }

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
        & .banner_box:nth-of-type(4) {
            width: 50%;
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

        & .banner_box:nth-of-type(5) {
            width: 50%;
            background-image: url('/assets/img/main/main_sec5.jpg');

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

    const [menuinfo, setMenuinfo] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('/data.json');
                setMenuinfo(response.data.menuinfo);
                console.log(menuinfo)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        })();
    }, []);

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
                    {menuinfo && menuinfo.map((v, i) => (
                        <Mainmenu title={v.title} text={v.text} key={i} />
                        
                        // <div className="banner_box" key={i}>
                        //     {/* <a href="">{v.url}</a> */}
                            
                        //     <div className="banner_info">
                        //         <dl>
                        //             <dt>{v.title}</dt>
                        //             <dd>{v.text}</dd>
                        //         </dl>
                        //         <div className="btn">
                        //             <Image className="btnOff" src={btnPlus} alt="" />
                        //             <Image className="btnOn" src={btnOn} alt="" />
                        //         </div>
                        //     </div>
                        // </div>
                    ))}

                </div>
            </div>
        </MainContainer>
    );
});

index.displayName ="index";

export default index;