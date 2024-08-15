import React, { memo, useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import mq from "@/assets/style/MediaQuery.js";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import MenuSubTitle from '@/components/MenuSubTitle';
import SubVisual from '@/components/SubVisual';

import {useSelector, useDispatch} from 'react-redux';
import {getList} from '@/slices/MenuSlice';

const SwiperContainer = styled.div`
  width: calc(100% + 20px);
  margin-bottom: 80px;
  padding: 0 50px;
  overflow: hidden;

  ${mq.maxWidth("md")`
    padding: 0;
    width: 100%;
  `}

  .swiper {
    overflow: visible;
  }

  img {
    display: block;
    margin: 0 auto;

    + p {
      text-align: center;
    }
  }

  .swiper-slide {
    img {
      display: block;
      width: 70%;
    }
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: #c1c0c0;
  }

  .swiper-button-prev {
    transform: translateX(-61px);

    ${mq.maxWidth("md")`
      transform: translateX(0);
    `}
  }

  .swiper-button-next {
    transform: translateX(61px);

    ${mq.maxWidth("md")`
      transform: translateX(0);
    `}
  }
`;

const SubWrap = styled.div`
  .menu_list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: 100%;

    ${mq.maxWidth("lg")`
      grid-template-columns: repeat(2, 1fr);
      margin: 0 auto;
      width: 92%;
    `}

    > li {
      position: relative;
      padding: 20px;
      width: 100%;
      border-left: 1px solid #dcdcdc;
      border-bottom: 1px solid #dcdcdc;
      border-top: 1px solid transparent;
      border-right: 1px solid transparent;
      cursor: pointer;

      &:nth-of-type(-n + 4) {
        border-top: 1px solid #dcdcdc;

        ${mq.maxWidth("md")`
            border-top: 0;
        `}
      }

      &:nth-of-type(4n),
      &:last-of-type {
        border-right: 1px solid #dcdcdc;

        ${mq.maxWidth("md")`
            border-right: 0;
        `}
      }

      &:nth-of-type(-n + 2) {
        ${mq.maxWidth("md")`
            border-top: 1px solid #dcdcdc;
        `}
      }

      &:nth-of-type(2n),
      &:last-of-type {
        ${mq.maxWidth("md")`
          border-right: 1px solid #dcdcdc;
        `}
      }

      &:hover {
        border: 1px solid navy;
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
  z-index: 1;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 90%;
  height: ${(props) => (props.$infoHeight ? props.$infoHeight : "100%")};
  background-color: #ffe600cc;
  opacity: 0;
  visibility: hidden;
  transition: 0.3s all;

  .swiper-slide {
    position: relative;
  }

  &.menuActive {
    opacity: 1;
    visibility: visible;

    ${mq.maxWidth("md")`
      position: fixed;
      height: auto;
      width: 92%;
    `}
  }

  > .menu_close {
    z-index: 2;
    position: absolute;
    right: 27px;
    top: 32px;
    outline: none;
    background: none;
    border: none;

    ${mq.maxWidth("md")`
      right: 15px;
      top: 15px;
    `}

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
      color: #071f60;
      font-weight: 700;

      &::after {
        content: "";
        display: block;
        margin-top: 10px;
        width: 30px;
        height: 2px;
        background-color: #071f60;
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

    ${mq.maxWidth("md")`
      position: static;
      transform: translate(0);
      margin-top: 20px;
      width: 100%;
      hegiht:  auto;
    `}

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
          border-left: 1px solid #444;
        }

        p {
          padding: 7px 4px;
        }
      }
    }
  }
`;

const BestIcon = styled.div`
  position: absolute;
  right: 28px;
  top: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 65px;
  border-radius: 100%;
  background: #0e347e;
  color: #ffe600;
  font-weight: 900;
  font-size: 18px;
`;

const menuCategory = memo(() => {
  SwiperCore.use([Navigation, Scrollbar, Autoplay]);

  const router = useRouter();
  const { category } = router.query;
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.MenuSlice);
  console.log('category.js에서의 data : ' + data);
  useEffect(() => {
    dispatch(getList({ category }));
    
  }, [dispatch,category]);

  const menuToggle = useCallback((e) => {
    const menuInfo = e.currentTarget.querySelector('.menu_info');
    const isActive = menuInfo.classList.contains('menuActive');
  
    // 모든 메뉴 정보 요소의 클래스를 초기화
    document.querySelectorAll('.menu_info').forEach((info) => {
      info.classList.remove('menuActive');
    });
  
    // 클릭된 요소에만 메뉴 정보 요소의 클래스를 토글
    if (!isActive) {
      menuInfo.classList.add('menuActive');
    }
  }, []);


  return (
    <>
      {data && (
        <div>
          {!data.menuList ? (
            data.map((v, i) => {
              return (
                v.category === "menu_new" && (
                  <SubVisual key={v.id} $bgImage={v.bgImage}>
                    <div className="subvisual_info">
                      <h1>{v.title}</h1>
                      <p>{v.txt}</p>
                    </div>
                    <ul className="subvisual_menu">
                      {v.tab &&
                        v.tab.map((tab, index) => (
                          <li
                            key={index}
                            className={
                              tab.url === `/menu/${category}`
                                ? "subMenuActive"
                                : ""
                            }
                          >
                            <a href={tab.url}>{tab.title}</a>
                          </li>
                        ))}
                    </ul>
                  </SubVisual>
                )
              );
            })
          ) : (
            <SubVisual key={data.id} $bgImage={data.bgImage}>
              <div className="subvisual_info">
                <h1>{data.title}</h1>
                <p>{data.txt}</p>
              </div>
              <ul className="subvisual_menu">
                {data.tab &&
                  data.tab.map((tab, index) => (
                    <li
                      key={index}
                      className={
                        tab.url === `/menu/${category}` ? "subMenuActive" : ""
                      }
                    >
                      <a href={tab.url}>{tab.title}</a>
                    </li>
                  ))}
              </ul>
            </SubVisual>
          )}

          <div className="inner">
            <MenuSubTitle $paddingTop="90px" $paddingBottom="30px">
              {data && !data.menuList ? "신메뉴" : "추천메뉴"}
            </MenuSubTitle>

            <SwiperContainer>
              <Swiper
                loop={false} // 슬라이드 루프
                spaceBetween={50} // 슬라이스 사이 간격
                slidesPerView={1} // 보여질 슬라이스 수
                navigation={true} // prev, next button
                breakpoints={{
                  768: {
                    slidesPerView: 3,
                  },
                  480: {
                    slidesPerView: 2,
                  },
                }}
              >
                {data && !data.menuList ? (
                  <>
                    {data &&
                      !data.menuList &&
                      data.map((v, i) => {
                        return (
                          v.menuList &&
                          v.menuList
                            .filter((item) => item.new === true)
                            .map((v, i) => (
                              <SwiperSlide key={i} onClick={menuToggle}>
                                <div>
                                  <div>
                                    <img src={v.img} alt="" />
                                    <p>{v.name_ko}</p>
                                  </div>
                                </div>
                                <MenuInfo
                                  className="menu_info"
                                  $infoHeight="100%"
                                >
                                  <button className="menu_close">
                                    <img
                                      src="/assets/img/menu/coffee/menu-close.png"
                                      alt=""
                                    />
                                  </button>
                                  <h4>{v.name_ko}</h4>
                                  <p>{v.name_en}</p>
                                  <p>{v.desc}</p>

                                  {v.standardAmount != null ? (
                                    <div className="nutrients_wrap">
                                      <p>
                                        ※ 1회 제공량 기준: {v.standardAmount}
                                      </p>
                                      <ul className="nutrients_list">
                                        <li>
                                          <p>카페인 (mg)</p>
                                          <p>{v.nutrients.caffein}</p>
                                        </li>
                                        <li>
                                          <p>칼로리 (kcal)</p>
                                          <p>{v.nutrients.calorie}</p>
                                        </li>
                                        <li>
                                          <p>나트륨 (mg)</p>
                                          <p>{v.nutrients.natrium}</p>
                                        </li>
                                        <li>
                                          <p>당류 (g)</p>
                                          <p>{v.nutrients.sugar}</p>
                                        </li>
                                        <li>
                                          <p>포화지방 (g)</p>
                                          <p>{v.nutrients.saturatedFat}</p>
                                        </li>
                                        <li>
                                          <p>단백질 (g)</p>
                                          <p>{v.nutrients.protein}</p>
                                        </li>
                                      </ul>
                                      <p className="notice">
                                        (매장 상황에 따라 판매하지 않을 수
                                        있습니다.)
                                      </p>
                                    </div>
                                  ) : (
                                    <div className="nutrients_wrap">
                                      <p className="notice">
                                        (매장 상황에 따라 판매하지 않을 수
                                        있습니다.)
                                      </p>
                                    </div>
                                  )}
                                </MenuInfo>
                              </SwiperSlide>
                            ))
                        );
                      })}
                  </>
                ) : (
                  <>
                    {data.menuList
                      .filter((v) => v.best === true)
                      .map((v, i) => (
                        <SwiperSlide key={i} onClick={menuToggle}>
                          <div>
                            <div>
                              <img src={v.img} alt="" />
                              <p>{v.name_ko}</p>
                            </div>
                          </div>
                          <MenuInfo className="menu_info" $infoHeight="100%">
                            <button className="menu_close">
                              <img
                                src="/assets/img/menu/coffee/menu-close.png"
                                alt=""
                              />
                            </button>
                            <h4>{v.name_ko}</h4>
                            <p>{v.name_en}</p>
                            <p>{v.desc}</p>

                            {v.standardAmount != null ? (
                              <div className="nutrients_wrap">
                                <p>※ 1회 제공량 기준: {v.standardAmount}</p>
                                <ul className="nutrients_list">
                                  <li>
                                    <p>카페인 (mg)</p>
                                    <p>{v.nutrients.caffein}</p>
                                  </li>
                                  <li>
                                    <p>칼로리 (kcal)</p>
                                    <p>{v.nutrients.calorie}</p>
                                  </li>
                                  <li>
                                    <p>나트륨 (mg)</p>
                                    <p>{v.nutrients.natrium}</p>
                                  </li>
                                  <li>
                                    <p>당류 (g)</p>
                                    <p>{v.nutrients.sugar}</p>
                                  </li>
                                  <li>
                                    <p>포화지방 (g)</p>
                                    <p>{v.nutrients.saturatedFat}</p>
                                  </li>
                                  <li>
                                    <p>단백질 (g)</p>
                                    <p>{v.nutrients.protein}</p>
                                  </li>
                                </ul>
                                <p className="notice">
                                  (매장 상황에 따라 판매하지 않을 수 있습니다.)
                                </p>
                              </div>
                            ) : (
                              <div className="nutrients_wrap">
                                <p className="notice">
                                  (매장 상황에 따라 판매하지 않을 수 있습니다.)
                                </p>
                              </div>
                            )}
                          </MenuInfo>
                          <BestIcon>BEST</BestIcon>
                        </SwiperSlide>
                      ))}
                  </>
                )}
              </Swiper>
            </SwiperContainer>

            <SubWrap>
              <ul className="menu_list">
                {data &&
                  data.menuList &&
                  data.menuList.map((v, i) => (
                    <li key={i} onClick={menuToggle}>
                      <img src={v.img} alt="" />
                      <p>{v.name_ko}</p>

                      <MenuInfo className="menu_info" $infoHeight="90%">
                        <button className="menu_close">
                          <img
                            src="/assets/img/menu/coffee/menu-close.png"
                            alt=""
                          />
                        </button>
                        <h4>{v.name_ko}</h4>
                        <p>{v.name_en}</p>
                        <p>{v.desc}</p>

                        {v.standardAmount != null ? (
                          <div className="nutrients_wrap">
                            <p>※ 1회 제공량 기준: {v.standardAmount}</p>
                            <ul className="nutrients_list">
                              <li>
                                <p>카페인 (mg)</p>
                                <p>{v.nutrients.caffein}</p>
                              </li>
                              <li>
                                <p>칼로리 (kcal)</p>
                                <p>{v.nutrients.calorie}</p>
                              </li>
                              <li>
                                <p>나트륨 (mg)</p>
                                <p>{v.nutrients.natrium}</p>
                              </li>
                              <li>
                                <p>당류 (g)</p>
                                <p>{v.nutrients.sugar}</p>
                              </li>
                              <li>
                                <p>포화지방 (g)</p>
                                <p>{v.nutrients.saturatedFat}</p>
                              </li>
                              <li>
                                <p>단백질 (g)</p>
                                <p>{v.nutrients.protein}</p>
                              </li>
                            </ul>
                            <p className="notice">
                              (매장 상황에 따라 판매하지 않을 수 있습니다.)
                            </p>
                          </div>
                        ) : (
                          <div className="nutrients_wrap">
                            <p className="notice">
                              (매장 상황에 따라 판매하지 않을 수 있습니다.)
                            </p>
                          </div>
                        )}
                      </MenuInfo>
                    </li>
                  ))}
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