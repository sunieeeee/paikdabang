import React, { memo, useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Image from "next/image";

import mq from "@/assets/style/MediaQuery.js";
import flogo from "@/assets/img/footer/flogo.png";

const FooterContainer = styled.footer`
  margin-top: 80px;
  border-top: 3px solid #ffe600;
  font-size: 14px;
  color: #262626;

  ${mq.maxWidth("xl")`
    margin: 80px auto 0;
    font-size: 16px;
  `}

  h2 {
    width: 180px;
    margin: 0 auto;

    img {
      width: 100%;
      object-fit: contain;
    }
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 10px auto;
    width: 558px;

    ${mq.maxWidth("xl")`
      flex-direction: column;
      width: 92%;
      text-align: center;
    `}

    li {
      ${mq.maxWidth("xl")`
        line-height: 1.7;
      `}

      &::after {
        content: "";
        display: inline-block;
        vertical-align: middle;
        margin: 14px;
        width: 1px;
        height: 10px;
        background-color: #555;

        ${mq.maxWidth("xl")`
          display: none;
        `}
      }

      &:nth-of-type(3)::after,
      &:nth-of-type(5)::after,
      &:nth-of-type(8)::after {
        background-color: transparent;
      }
    }
  }

  .copyright {
    width: fit-content;
    margin: 30px auto;

    ${mq.maxWidth("xl")`
      margin: 30px auto;
      width: 92%;
    `}
  }
`;

const Footer = memo(() => {

  const [data, setData] = useState({
    header: [],
    companyinfo: [],
    copyright: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/data.json");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  return (
    <FooterContainer>
      <div className="inner">
        <h2>
          <Image src={flogo} alt="더본 로고 이미지" />
        </h2>
        <ul>
          {data.companyinfo.map((v, i) => {
            return <li key={v.id}>{v.title}</li>;
          })}
        </ul>

        <div className="copyright">
          {data.copyright.map((v, i) => {
            return (
              <p key={v.id}>
                {v.title}
              </p>
            );
          })}
        </div>
      </div>
    </FooterContainer>
  );
});

Footer.displayName = "Footer";

export default Footer;
