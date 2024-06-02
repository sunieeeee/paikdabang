import React, { memo, useCallback, useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import Sns from "@/components/Sns";
import { useSelector, useDispatch } from "react-redux";
import { getList } from "@/slices/SnsWrapSlice";

const SnsSection = styled.div`
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
`;

const SnsWrap = memo(() => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.SnsWrapSlice);

  useEffect(() => {
    dispatch(getList());
  }, []);
  console.log(data);

  return (
    <SnsSection>
      {data &&
        data.map((v, i) => (
          <dl key={"sns_wrap_" + i}>
            <dt>{v.title}</dt>
            {v.txts &&
              v.txts.map((v, i) => <dd key={"sns_wrap_txt_" + i}>{v.txt}</dd>)}
          </dl>
        ))}
      <Sns />
    </SnsSection>
  );
});

SnsWrap.displayName = "SnsWrap";

export default SnsWrap;