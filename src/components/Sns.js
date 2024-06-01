import React, {memo} from 'react';
import styled, { css } from 'styled-components';
import Image from 'next/image';

import facebook from "@/assets/img/header/facebook-ico.png";
import insta from "@/assets/img/header/insta-ico.png";

const SnsContainer = styled.ul`
  padding-top: 30px;
  display: flex;
  justify-content: center;
  gap: 20px;

  li {
    width: 35px;
    height: 35px;

    a {
      display: block;
      width: 100%;
      height: 100%;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    
  }
`

const Sns = memo(() => {
  return (
    <SnsContainer>
      <li>
        <a href="">
          <Image src={facebook} alt="페이스북 이미지" />
        </a>
      </li>
      <li>
        <a href="">
          <Image src={insta} alt="인스타그램 이미지" />
        </a>
      </li>
    </SnsContainer>
  );
});

Sns.displayName ="Sns";

export default Sns;