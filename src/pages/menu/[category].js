import React, { memo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';

// import Swiper JS
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';




//상태값을 로드하기 위한 hook과 action함수를 dispatch할 hook참조
import {useSelector, useDispatch} from 'react-redux';
//Slice에 정의된 함수 참조
// - 동기처리인 경우에는 리듀서 내의 액션함수 참조
// - 비동기처리인 경우에는 Slice내의 미들웨어 함수 참조
import {getList} from '@/slices/MenuSlice';


const SubVisual = styled.div`
  position: relative;

  width: 100%;
  height: 500px;
  background-image: url( ${(props) => (props.bgImage ? props.bgImage : '')} );
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  .subvisual_info {
    position: absolute;
    left: 50%;
    top: 28%;
    transform: translateX(-50%);
    width: 100%;

    h1 {
      font-size: 42px;
      font-weight: 300;
      text-align: center;

      &::after {
        content: '';
        margin: 30px auto 40px;
        display: block;
        width: 40px;
        height: 2px;
        background-color: #444;
      }
    }

    > p {
      font-size: 20px;
      text-align: center;
    }
  }
  
  .subvisual_menu {
    position: absolute; 
    left: 50%;
    bottom: 30px;
    transform: translateX(-50%);
    display: flex;
    border: 1px solid #bfbfbf;

    li {
      width: 170px;
      height: 38px;
      
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: #444;
        background-color: #fff;
        border-right: 1px solid #bfbfbf;
        transition: .3s background-color;

        &:hover {
          background-color: #ffe600;
        }
      }

      &:last-of-type {
        a {
          border: 0;
        }
      }
    }
  }
`;

const SubWrap = styled.div`

`;

const menuCategory = memo(() => {
  SwiperCore.use([Navigation, Scrollbar, Autoplay]);

  const router = useRouter();
  const { category } = router.query;
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.MenuSlice);

  useEffect(() => {
    dispatch(getList({ category }));
  }, [dispatch,category]);
  console.log(data)
  return (
    <>
      {data && (
        <div>
          <SubVisual bgImage={data.bgImage}>
            <div className='subvisual_info'>
              <h1>{data.title}</h1>
              <p>{data.txt}</p>
            </div>
            <ul className='subvisual_menu'>
              {data.tab && data.tab.map((tab, index) => (
                <li  key={index}>
                  <a href={tab.url}>{tab.title}</a>
                </li>
              ))}
            </ul>
          </SubVisual>
          <SubWrap>
            <div className="swiper-container">
              <Swiper
                loop={true} // 슬라이드 루프
                spaceBetween={50} // 슬라이스 사이 간격
                slidesPerView={3} // 보여질 슬라이스 수
                navigation={true} // prev, next button
                // autoplay={{
                //   delay: 2500,
                //   disableOnInteraction: false, // 사용자 상호작용시 슬라이더 일시 정지 비활성
                // }}
              >
                {data.menuList && data.menuList.map((slide, i) => (
                  <SwiperSlide key={i}>          
                    <div>
                      <div>{slide.name_ko}</div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </SubWrap>
        </div>
      )}
    </>
  );
});

menuCategory.displayName = "menuCategory";

export default menuCategory;
