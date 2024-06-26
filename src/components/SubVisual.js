import React, {memo} from 'react';
import styled, { css } from 'styled-components';

import mq from "@/assets/style/MediaQuery.js";

const SubVisualWrap = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  background-image: url(${(props) => props.$bgImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  ${mq.maxWidth("lg")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    padding: 20px;
    height: auto;
  `}

  .subvisual_info {
    position: absolute;
    left: 50%;
    top: 28%;
    transform: translateX(-50%);
    width: 100%;

    ${mq.maxWidth("lg")`
      position: static;
      transform: translateX(0);
      margin: 0 auto;
      width: 92%;
    `}

    h1 {
      font-size: 42px;
      font-weight: 300;
      text-align: center;

      &::after {
        content: "";
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

    ${mq.maxWidth("lg")`
      position: static;
      transform: translateX(0);
      margin: 0 auto;
      flex-direction: column;
      width: 92%;
    `}

    li {
      width: 170px;
      height: 38px;

      ${mq.maxWidth("lg")`
        width: 100%;
        border-bottom: 1px solid #bfbfbf;

        &:last-of-type {
          border-bottom: none;
        }
      `}

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: #444;
        background-color: #fff;
        border-right: 1px solid #bfbfbf;
        transition: 0.3s background-color;
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

const SubVisual = memo(({ $bgImage, children }) => {
  
  return (
    <SubVisualWrap $bgImage={$bgImage}>
      {children}
    </SubVisualWrap>
  );
});

SubVisual.displayName = "SubVisual";

export default SubVisual;