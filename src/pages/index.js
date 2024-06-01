import React, { memo, useState, useEffect } from "react";
import axios from "axios";
import styled, { css } from "styled-components";
import Image from "next/image";

import mq from "@/assets/style/MediaQuery.js";
import Sns from "@/components/Sns";
import SlideWrap from "@/pages/main/SlideWrap";
import BannerWrap from "@/pages/main/BannerWrap";


import { useSelector, useDispatch } from "react-redux";
import { getList } from "@/slices/StoreSearchSlice";

const MainContainer = styled.main`
  margin: 0 auto;
  width: 1920px;
  overflow: hidden !important;

  ${mq.maxWidth("xl")`
    width: 100%;
  `}
`;


const SnsWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 70px;

  dl {
    text-align: center;

    dt {
      margin-bottom: 15px;
      font-size: 24px;
      font-family: "Nanum Myeongjo", serif !important;
      font-weight: var(--font-myeongjo);
      font-weight: 800;
      letter-spacing: 3px;
    }

    dd {
      display: inline-block;
      padding: 0 6px;
      color: #999;
    }

    &::after {
      content: "";
      margin: 30px auto 0 auto;
      display: block;
      width: 50px;
      height: 1px;
      background-color: #071f60;
    }
  }
`

const index = memo(() => {
  const images = [
    { url: "/assets/img/main/slide/slide1.jpg" },
    { url: "/assets/img/main/slide/slide2.jpg" },
    { url: "/assets/img/main/slide/slide3.jpg" },
    { url: "/assets/img/main/slide/slide4.jpg" },
  ];

  const [menuinfo, setMenuinfo] = useState([]);
  const [storesearch, setStoresearch] = useState([]);
  const [hashtag, setHashtag] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/data.json");
        setMenuinfo(response.data.menuinfo);
        setStoresearch(response.data.storesearch);
        setHashtag(response.data.hashtag);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  return (
    <MainContainer>
      <SlideWrap />

      <BannerWrap />
      <SnsWrap>
        {hashtag &&
          hashtag.map((v, i) => (
            <dl key={"sns_wrap_" + i}>
              <dt>{v.title}</dt>
              {v.txts &&
                v.txts.map((v, i) => (
                  <dd key={"sns_wrap_txt_" + i}>{v.txt}</dd>
                ))}
            </dl>
          ))}
        <Sns />
      </SnsWrap>
    </MainContainer>
  );
});

index.displayName = "index";

export default index;