import React, { memo, useState, useEffect } from "react";
import axios from "axios";
import styled, { css } from "styled-components";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import mq from "@/assets/style/MediaQuery.js";

const MainBannerSlide = styled.div`
  .swiper {
    height: 100%;

    .swiper-slide {
      width: 100%;

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .swiper-pagination {
    bottom: 30px;

    .swiper-pagination-bullet {
      margin: 0 8px;
      width: 10px;
      height: 10px;
      background-color: #fff;
      opacity: 1;
    }

    .swiper-pagination-bullet-active {
      background-color: #ffe600;
    }
  }
  ${mq.maxWidth("xl")`
		height: 350px;
	`}
`;

const SlideWrap = memo(() => {
  const images = [
    { url: "/assets/img/main/slide/slide1.jpg" },
    { url: "/assets/img/main/slide/slide2.jpg" },
    { url: "/assets/img/main/slide/slide3.jpg" },
    { url: "/assets/img/main/slide/slide4.jpg" },
  ];

  return (
    <MainBannerSlide>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={false}
        pagination={{ clickable: true }}
        slidesPerView={1}
      >
        {images &&
          images.map((v, i) => {
            return (
              <SwiperSlide key={i}>
                <img src={v.url} alt="" />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </MainBannerSlide>
  );
});

SlideWrap.displayName = "SlideWrap";

export default SlideWrap;
