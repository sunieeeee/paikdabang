import React, { memo, useCallback, useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import Image from "next/image";

import { useSelector, useDispatch } from "react-redux";
import { getList } from "@/slices/BannerSearchSlice";

import mq from "@/assets/style/MediaQuery.js";
import btnHouse from "@/assets/img/main/store-ico.png";
import btnOn from "@/assets/img/main/btn1-on.png";

const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0 0 20px;
  width: 500px !important;
  height: auto !important;

  ${mq.maxWidth("xl")`
      flex-direction: row;
      margin: 15px auto 0;
      width: 92% !important;
    `}

  .banner_franchise {
    background-image: url("/assets/img/main/main_sec7.png");
    background-position: right bottom;
    background-size: 38%;
    background-repeat: no-repeat;

    ${mq.maxWidth("xl")`
        background-size: 140px auto;
      `}
  }

  .banner_info {
    width: 100%;
    height: 50%;
    border: 2px solid #071f60;

    ${mq.maxWidth("xl")`
        padding: 15px !important;
        height: 240px !important;
      `}

    dl {
      color: #071f60;
      dt {
        font-size: 40px;

        ${mq.maxWidth("xl")`
            font-size: 20px;
          `}
      }

      ${mq.maxWidth("xl")`
            dd {
              font-size: 15px;
            }
        `}
    }

    .store_search {
      height: 50px;
      border: 2px solid #071f60;

      ${mq.maxWidth("xl")`
          height: 40px;
        `}

      input {
        display: block;
        padding: 0 10px;
        width: 100%;
        height: 100%;
        border: 0;
        outline: none;
      }
    }
  }

  .btn_house {
    position: relative;
    width: 50px;
    height: 50px;
    background-color: #fff;
    border-radius: 100%;
    box-shadow: 0 0px 10px 5px #00000011;

    display: flex;
    justify-content: center;
    align-items: center;

    .btnOn {
      display: none;
    }

    .btnOff {
      display: block;
      width: 23px;
      object-fit: contain;
    }

    &:hover {
      .btnOn {
        display: block;
      }

      .btnOff {
        display: none;
      }
    }
  }
`;

const BannerSearch = memo(() => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.BannerSearchSlice
  );

  useEffect(() => {
    dispatch(getList());
  }, []);

  return (
    <SearchSection className="banner_box banner_search">
      {data &&
        data.map((v, i) => (
          <div
            key={i}
            className={
              i === 0
                ? "banner_info banner_franchise"
                : "banner_info banner_store"
            }
          >
            <dl>
              <dt>{v.title}</dt>
              <dd>{v.text}</dd>
            </dl>

            {i === 0 ? (
              <div key={i} className="btn_house">
                <Image className="btnOff" src={btnHouse} alt="" />
                <Image className="btnOn" src={btnOn} alt="" />
              </div>
            ) : (
              <div key={i} className="store_search">
                <input
                  type="text"
                  name="store_search"
                  placeholder="Find a store in your area!"
                />
              </div>
            )}
          </div>
        ))}
    </SearchSection>
  );
});

BannerSearch.displayName = "BannerSearch";

export default BannerSearch;