import React, { memo, useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled, { css } from 'styled-components';

// import Swiper JS
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import MenuSubTitle from '@/components/MenuSubTitle';

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
  background-image: url( ${(props) => props.$bgImage} );
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
      }

      &:last-of-type {
        a {
          border: 0;
        }
      }

      &:hover {
        a {
          background-color: #ffe600;
        }
      }

      &.subMenuActive {
        a {
          background-color: #ffe600;
          color: #000;
        }
      }
    }
  }
`;

const SwiperContainer = styled.div`
  margin-bottom: 80px;

  img {
    display: block;
    margin: 0 auto;
  }
  
  p {
    text-align: center;
  }

  .swiper-slide {
    img {
      display: block;
      width: 70%;
    }
  }

  .swiper-button-prev, .swiper-button-next {
    color: #c1c0c0;
  }
`

const SubWrap = styled.div`
  .menu_list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    
     > li {
      position: relative;
      padding: 20px;
      width: 100%;
      border-left: 1px solid #dcdcdc;
      border-bottom: 1px solid #dcdcdc;
      border-top: 1px solid transparent;
      border-right: 1px solid transparent;
      cursor: pointer;

      &:nth-of-type(-n+4) {
        border-top: 1px solid #dcdcdc;
      }

      &:nth-of-type(4n), 
      &:last-of-type {
        border-right: 1px solid #dcdcdc;
      }

      &:hover {
        border: 1px solid navy
      }

      > img {
        display: block;
        max-width: 100%;
      }
      > p {
        text-align: center;
      }
    }
  }
`;

const MenuInfo = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 90%;
  height: ${(props) => props.$infoHeight ? props.$infoHeight : '100%'};
  background-color: #ffe600cc;
  opacity: 0;
  visibility: hidden;
  transition: .3s all;

  &.menuActive {
    opacity: 1;
    visibility: visible;
  }

  > .menu_close {
    z-index: 2;
    position: absolute;
    right: 27px;
    top: 32px;
    outline: none;
    background: none;
    border: none;

    img {
      display: block;
      width: 100%;
    }
  }

  h4 {
    font-size: 22px;
    font-weight: 900;

    + p {
      padding: 10px 0;
      color: #071F60;
      font-weight: 700;

      &::after {
        content: '';
        display: block;
        margin-top: 10px;
        width: 30px;
        height: 2px;
        background-color: #071F60;
      }

      + p {
        font-size: 14px;
      }
    }
  }

  .nutrients_wrap {
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    width: 90%;
    font-size: 12px;

    .nutrients_list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      margin: 10px 0;
      border-top: 2px solid #000;
      border-bottom: 2px solid #000;

      li {
        display: flex;
        justify-content: space-between;

        &:nth-of-type(2n) {
          border-left: 1px solid #444
        }

        p {
          padding: 7px 4px;
        }
      }
    }
  }
`

const menuCategory = memo(() => {
  SwiperCore.use([Navigation, Scrollbar, Autoplay]);

  const router = useRouter();
  const { category } = router.query;
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.MenuSlice);
  console.log(`/menu/${category}`)
  useEffect(() => {
    dispatch(getList({ category }));
    
  }, [dispatch,category]);
  
  const menuItem = useRef([]);

  const menuToggle = useCallback((e) => {
    
    if (e.currentTarget.querySelector('.menu_info').classList.contains('menuActive')) {
      e.currentTarget.querySelector('.menu_info').classList.remove('menuActive');
    } else {
      menuItem.current.forEach((v, i) => {
        v.querySelector('.menu_info').classList.remove('menuActive');
      });

      e.currentTarget.querySelector('.menu_info').classList.add('menuActive');
    }
  }, []);


  return (
    <>
      {data && (
        <div>
          {!data.menuList ? (
            data.map((v, i) => {
              
              return(
                v.category == "menu_new" && (
                <SubVisual key={i} $bgImage={v.bgImage}>
                  <div className='subvisual_info'>
                    <h1>{v.title}</h1>
                    <p>{v.txt}</p>
                  </div>
                  <ul className='subvisual_menu'>
                    {v.tab && v.tab.map((tab, index) => (
                      <li  key={index} className={tab.url === `/menu/${category}` ? 'subMenuActive' : ''}>
                        <a href={tab.url}>{tab.title}</a>
                      </li>
                    ))}
                  </ul>
                </SubVisual>)
              )
            })
          ) : (
            <SubVisual $bgImage={data.bgImage}>
              <div className='subvisual_info'>
                <h1>{data.title}</h1>
                <p>{data.txt}</p>
              </div>
              <ul className='subvisual_menu'>
                {data.tab && data.tab.map((tab, index) => (
                  <li key={index} className={tab.url === `/menu/${category}` ? 'subMenuActive' : ''}>
                    <a href={tab.url}>{tab.title}</a>
                  </li>
                ))}
              </ul>
            </SubVisual>
          )}
          
          <div className='inner'>

            <MenuSubTitle $paddingTop="90px" $paddingBottom="30px">추천메뉴</MenuSubTitle>

            <SwiperContainer>
              <Swiper
                loop={false} // 슬라이드 루프
                spaceBetween={50} // 슬라이스 사이 간격
                slidesPerView={3} // 보여질 슬라이스 수
                navigation={true} // prev, next button
              >
                {data && !data.menuList ? (
                  <>
                    {data && !data.menuList && data.map((v, i) => {
                      return v.menuList && v.menuList
                        .filter((item) => item.new === true)
                        .map((v, i) => (
                          <SwiperSlide key={i} onClick={menuToggle} ref={el => menuItem.current[i] = el}>          
                            <div>
                              <div>
                                <img src={v.img} alt='' />
                                <p>{v.name_ko}</p>
                              </div>
                            </div>
                            <MenuInfo className='menu_info' $infoHeight='100%'>
                                <button className='menu_close'>
                                  <img src='/assets/img/menu/coffee/menu-close.png' alt='' />
                                </button>
                                <h4>{v.name_ko}</h4>
                                <p>{v.name_en}</p>
                                <p>{v.desc}</p>

                                {v.standardAmount != null ? (
                                  <div className='nutrients_wrap'>
                                    <p>※ 1회 제공량 기준: {v.standardAmount}</p>
                                    <ul className='nutrients_list'>
                                      <li>
                                        <p>카페인 (mg)</p>
                                        <p>{v.nutrients.caffein}</p>
                                      </li>
                                      {/* 이하 생략 */}
                                    </ul>
                                    <p className='notice'>(매장 상황에 따라 판매하지 않을 수 있습니다.)</p>
                                  </div>
                                ) : (
                                  <div className='nutrients_wrap'>
                                    <p className='notice'>(매장 상황에 따라 판매하지 않을 수 있습니다.)</p>
                                  </div>
                                )}
                              </MenuInfo>
                          </SwiperSlide>
                        ));
                    })}
                  </>
                  ) : (
                    <>
                      {data.menuList.filter((v) => v.best === true).map((v, i) => (
                        <SwiperSlide key={i} onClick={menuToggle} ref={el => menuItem.current[i] = el}>          
                          <div>
                            <div>
                              <img src={v.img} alt='' />
                              <p>{v.name_ko}</p>
                            </div>
                          </div>
                          <MenuInfo className='menu_info' $infoHeight='100%'>
                                <button className='menu_close'>
                                  <img src='/assets/img/menu/coffee/menu-close.png' alt='' />
                                </button>
                                <h4>{v.name_ko}</h4>
                                <p>{v.name_en}</p>
                                <p>{v.desc}</p>

                                {v.standardAmount != null ? (
                                  <div className='nutrients_wrap'>
                                    <p>※ 1회 제공량 기준: {v.standardAmount}</p>
                                    <ul className='nutrients_list'>
                                      <li>
                                        <p>카페인 (mg)</p>
                                        <p>{v.nutrients.caffein}</p>
                                      </li>
                                      {/* 이하 생략 */}
                                    </ul>
                                    <p className='notice'>(매장 상황에 따라 판매하지 않을 수 있습니다.)</p>
                                  </div>
                                ) : (
                                  <div className='nutrients_wrap'>
                                    <p className='notice'>(매장 상황에 따라 판매하지 않을 수 있습니다.)</p>
                                  </div>
                                )}
                              </MenuInfo>
                        </SwiperSlide>
                      ))}
                    </>
                  )}
              </Swiper>
            </SwiperContainer>

            <SubWrap>
                <ul className='menu_list'>
                {data && !data.menuList ? (
                  <>
                    {data && !data.menuList && data.map((v, i) => {
                      return v.menuList && v.menuList
                        .filter((item) => item.new === true)
                        .map((v, i) => (
                          <li key={i} onClick={menuToggle} ref={el => menuItem.current[i] = el}>
                          <img src={v.img} alt='' />
                          <p>{v.name_ko}</p>

                          <MenuInfo className='menu_info' $infoHeight='90%'>
                            <button className='menu_close'>
                              <img src='/assets/img/menu/coffee/menu-close.png' alt='' />
                            </button>
                            <h4>{v.name_ko}</h4>
                            <p>{v.name_en}</p>
                            <p>{v.desc}</p>

                            {v.standardAmount != null ? (
                              <div className='nutrients_wrap'>
                                <p>※ 1회 제공량 기준: {v.standardAmount}</p>
                                <ul className='nutrients_list'>
                                  <li>
                                    <p>카페인 (mg)</p>
                                    <p>{v.nutrients.caffein}</p>
                                  </li>
                                  {/* 이하 생략 */}
                                </ul>
                                <p className='notice'>(매장 상황에 따라 판매하지 않을 수 있습니다.)</p>
                              </div>
                            ) : (
                              <div className='nutrients_wrap'>
                                <p className='notice'>(매장 상황에 따라 판매하지 않을 수 있습니다.)</p>
                              </div>
                            )}
                          </MenuInfo>
                        </li>
                        ));
                    })}
                  </>
                  ) : (
                    <>
                      {data.menuList.map((v, i) => (
                        <li key={i} onClick={menuToggle} ref={el => menuItem.current[i] = el}>
                          <img src={v.img} alt='' />
                          <p>{v.name_ko}</p>

                          <MenuInfo className='menu_info' $infoHeight='90%'>
                            <button className='menu_close'>
                              <img src='/assets/img/menu/coffee/menu-close.png' alt='' />
                            </button>
                            <h4>{v.name_ko}</h4>
                            <p>{v.name_en}</p>
                            <p>{v.desc}</p>

                            {v.standardAmount != null ? (
                              <div className='nutrients_wrap'>
                                <p>※ 1회 제공량 기준: {v.standardAmount}</p>
                                <ul className='nutrients_list'>
                                  <li>
                                    <p>카페인 (mg)</p>
                                    <p>{v.nutrients.caffein}</p>
                                  </li>
                                  {/* 이하 생략 */}
                                </ul>
                                <p className='notice'>(매장 상황에 따라 판매하지 않을 수 있습니다.)</p>
                              </div>
                            ) : (
                              <div className='nutrients_wrap'>
                                <p className='notice'>(매장 상황에 따라 판매하지 않을 수 있습니다.)</p>
                              </div>
                            )}
                          </MenuInfo>
                        </li>
                      ))}
                    </>
                  )}
                </ul>
            </SubWrap>
          </div>

        </div>
      )}
    </>
  );
});

menuCategory.displayName = "menuCategory";

export default menuCategory;
