import React, {memo, useState, useEffect} from "react";
import styled, { css } from 'styled-components';
import Image from "next/image";
import ImageSlider from "react-simple-image-slider";

const CustomImageSlider = styled(ImageSlider)`
    button {
        background: red !important;
    }
`;


const index = memo(() => {
    const images = [
    {url: "/assets/img/main/slide/slide1.jpg"},
    {url: "/assets/img/main/slide/slide2.jpg"},
    {url: "/assets/img/main/slide/slide3.jpg"},
    {url: "/assets/img/main/slide/slide4.jpg"}
    ]    

    return (
        <main>
            <ImageSlider 
                width="100%"
                height={480}
                images={images}
                showBullets={true}
                // showNavs={true}
                autoPlay={true}
                autoPlayDelay={2.0}
                loop={true}
                style={{margin: 'auto'}}
            />

            <div>
                <div>
                    {/* <Image src={} alt="" /> */}
                </div>
                <div>
                    {/* <Image src={} alt="" /> */}
                </div>
            </div>
        </main>
    );
});

index.displayName ="index";

export default index;