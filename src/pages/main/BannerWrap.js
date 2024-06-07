import React, { memo, useCallback, useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import Image from "next/image";

import { useSelector, useDispatch } from "react-redux";
import { getList } from "@/slices/BannerWrapSlice";

import mq from "@/assets/style/MediaQuery.js";

import btnPlus from "@/assets/img/main/view_icon.png";
import btnOn from "@/assets/img/main/btn1-on.png";
import BannerSearch from "./BannerSearch";

const BannerSection = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${mq.maxWidth("xl")`
    flex-direction: column;
  `}

  .banner_box {
    width: 100%;
    height: 320px;
    background-repeat: no-repeat;
    background-size: cover;

    ${mq.maxWidth("xl")`
      height: 240px;
    `}

    .banner_info {
      padding: 30px 50px;
      width: 600px;
      height: 100%;

      display: flex;
      flex-direction: column;
      justify-content: space-between;

      ${mq.maxWidth("xl")`
        margin: auto;
        padding: 20px 0;
        width: 92%;
      `}

      &.right_align {
        padding: 30px 0;
        margin: 0 0 0 auto;

        ${mq.maxWidth("xl")`
          margin: auto;
          padding: 20px 0;
        `}
      }

      dl {
        margin-bottom: 40px;

        dt {
          margin-bottom: 30px;
          font-size: 52px;
          font-weight: 900;
          font-family: var(--font-montserrat);

          ${mq.maxWidth("xl")`
            margin-bottom: 15px;
            font-size: 27px;
          `}
        }

        dd {
          font-size: 18px;
          font-weight: 500;
        }
      }
    }

    .btn {
      position: relative;
      width: 50px;
      height: 50px;
      background-color: #fff;
      border-radius: 100%;
      box-shadow: 0 0px 10px 5px #00000011;

      ${mq.maxWidth("xl")`
        margin: auto 0 0 auto;
      `}

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
        transition: 0.3s all;
      }

      .btnOn {
        position: absolute;
        left: 50%;
        top: 50%;
        display: block;
        width: 0;
        height: 0;
        transform: translate(-50%, -50%) scale(0) rotate(-360deg);
        transition: 0.3s all;
      }
    }
  }

  .banner_hover {
    background-size: 100% 100%;
    background-position: center center;
    transition: 0.6s;

    ${mq.maxWidth("xl")`
      height: 200px !important;
      background-size: cover;
      background-position: center top 17%;
    `}

    &:hover {
      background-size: 105% 105%;

      ${mq.maxWidth("xl")`
        background-size: cover;
      `}
    }

    dl {
      dt {
        &::after {
          content: "";
          display: block;
          margin-top: 30px;
          width: 80px;
          height: 3px;
          background-color: #000;

          ${mq.maxWidth("xl")`
            margin-top: 15px;
            width: 40px;
            height: 1.5px;
          `}
        }
      }

      dd {
        ${mq.maxWidth("xl")`
          display: none;
        `}
      }
    }
  }

  // 첫 번째 .banner_box
  & .banner_box:nth-of-type(1) {
    width: 50%;
    background-image: url("/assets/img/main/main_sec1.jpg");
    background-position: 60%;

    dl {
      dt {
        color: #071f60;

        ${mq.maxWidth("xl")`
          font-size: 42px;
        `}
      }

      dd {
        color: #293f83;

        ${mq.maxWidth("xl")`
          display: none;
        `}
      }
    }

    ${mq.maxWidth("xl")`
      width: 100%;
    `}
  }

  // 두 번째 .banner_box
  & .banner_box:nth-of-type(2) {
    width: 50%;
    background-image: url("/assets/img/main/main_sec2.jpg");
    background-position: right 10% center;
    background-size: 40%;
    background-color: var(--color-blue);

    dl {
      dt {
        color: #fff;

        ${mq.maxWidth("xl")`
          font-size: 42px;
        `}
      }

      dd {
        color: #c4cbde;

        ${mq.maxWidth("xl")`
          display: none;
        `}
      }
    }

    ${mq.maxWidth("xl")`
      width: 100%;
    `}
  }

  // 세 번째 .banner_box
  & .banner_box:nth-of-type(3) {
    width: 100%;
    height: 600px;
    background-image: url("/assets/img/main/main_sec3.jpg");

    .banner_info {
      margin: 0 auto;
      width: 1200px;

      ${mq.maxWidth("xl")`
        width: 92%;
      `}
    }

    dl {
      dt {
        color: #6b4d30;

        &::after {
          background-color: #6b4d30;
        }
      }

      dd {
        color: #000;
      }
    }
  }

  // 네 번째 .banner_box
  & .banner_box:nth-of-type(4) {
    width: 50%;
    height: 600px;
    background-image: url("/assets/img/main/main_sec4.jpg");

    dl {
      dt {
        color: #071f60;

        &::after {
          background-color: #071f60;
        }
      }

      dd {
        color: #293f83;
      }
    }

    ${mq.maxWidth("xl")`
      width: 100%;
    `}
  }

  & .banner_box:nth-of-type(5) {
    width: 50%;
    height: 600px;
    background-image: url("/assets/img/main/main_sec5.jpg");

    dl {
      dt {
        color: #f1ae1d;

        &::after {
          background-color: #f1ae1d;
        }
      }

      dd {
        color: #f1ae1d;
      }
    }

    ${mq.maxWidth("xl")`
      width: 100%;
    `}
  }

  & .banner_box:nth-of-type(6) {
    margin-top: 20px;
    width: 50%;
    height: 615px;
    background-image: url("/assets/img/main/main_sec6.jpg");

    .banner_info {
      width: 600px;
    }

    dl {
      dt {
        color: #fff;

        &::after {
          background-color: #fff;
        }
      }

      dd {
        color: #fff;
      }
    }

    ${mq.maxWidth("xl")`
      margin-top: 0;
      width: 100%;

      .banner_info {
        width: 92%;
      }
    `}
  }
`;

const BannerWrap = memo(() => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.BannerWrapSlice
  );

  useEffect(() => {
    dispatch(getList());
  }, []);
console.log(data);
  return (
    <BannerSection>
      {data &&
        data.map((v, i) => (
          <div
            className={
              i !== 0 && i !== 1 ? "banner_box banner_hover" : "banner_box"
            }
            key={"banner_hover_" + i}
          >
            <div
              className={
                i == 0 || i == 2 || i == 3 || i == 5
                  ? "banner_info right_align"
                  : "banner_info"
              }
            >
              <dl>
                <dt>{v.title}</dt>
                <dd>{v.text}</dd>
              </dl>
              <div className="btn">
                <Image className="btnOff" src={btnPlus} alt="" />
                <Image className="btnOn" src={btnOn} alt="" />
              </div>
            </div>
          </div>
        ))}

        <BannerSearch />
    </BannerSection>
  );
});

BannerWrap.displayName = "BannerWrap";

export default BannerWrap;
