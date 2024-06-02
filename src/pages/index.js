import React, { memo, useState, useEffect } from "react";
import styled, { css } from "styled-components";

import mq from "@/assets/style/MediaQuery.js";
import SlideWrap from "@/pages/main/SlideWrap";
import BannerWrap from "@/pages/main/BannerWrap";
import SnsWrap from "./main/SnsWrap";

const MainContainer = styled.main`
  margin: 0 auto;
  width: 1920px;
  overflow: hidden !important;

  ${mq.maxWidth("xl")`
    width: 100%;
  `}
`;

const index = memo(() => {
  return (
    <MainContainer>
      <SlideWrap />
      <BannerWrap />
      <SnsWrap />
    </MainContainer>
  );
});

index.displayName = "index";

export default index;