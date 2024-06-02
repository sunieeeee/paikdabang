import React, { memo, useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styled, { css } from "styled-components";
import Link from "next/link";

import mq from "@/assets/style/MediaQuery.js";
import NewsVisual from "@/components/NewsVisual";

import { useSelector, useDispatch } from "react-redux";
import { getList } from "@/slices/NewsSlice";

const TableContainer = styled.table`
  border-top: 2px solid #0e347e;
  margin-top: 65px;
  width: 100%;
  border-collapse: collapse;

  ${mq.maxWidth("lg")`
    display: block;
    margin: 65px auto 0;
    width: 92%;
  `}

  tr {
    ${mq.maxWidth("lg")`
      display: flex;
      width: 100%;
    `}
  }

  th {
    padding: 20px 0;

    ${mq.maxWidth("lg")`
      &.group_th {
        width: 20%;
      }

      &.title_th {
        width: 80%;
      }
    `}
  }

  th,
  td {
    border-bottom: 1px solid #c8c8c8;
    text-align: center;

    ${mq.maxWidth("lg")`
      display: block;

      &:not(:nth-of-type(2),:nth-of-type(3)) {
        display: none;
      }
    `}
  }

  thead {
    ${mq.maxWidth("lg")`
      display: block;
    `}
  }

  tbody {
    ${mq.maxWidth("lg")`
      display: block;
    `}

    tr {
      td {
        padding: 30px 0;
        min-width: 60px;
        color: #666;

        &.num {
          width: 91px;
        }

        &.group {
          width: 117px;

          ${mq.maxWidth("lg")`
          width: 20%;
        `}
        }

        &.regi_date {
          width: 110px;
        }

        &.view {
          width: 110px;
        }

        &.title {
          padding: 0;
          text-align: left;

          ${mq.maxWidth("lg")`
            width: 80%;
          `}

          a {
            display: block;
            padding: 30px;
            width: 100%;
            height: 100%;
            color: #666;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
          }
        }

        ${mq.maxWidth("lg")`
          &:not(.group,.title) {
            display: none;
          }
        `}
      }

      &:hover {
        background-color: #0e347e;

        td {
          color: #fff;
          a {
            color: #fff;
          }
        }
      }
    }
  }
`;

const Pagination = styled.ul`
  display: flex;
  justify-content: center;
  margin: 75px auto 0;

  li {
    a {
      padding: 0 15px;
      color: #c8c8c8;
      font-weight: 300;

      &:hover {
        color: #0e347e;
        font-weight: 700;
      }
    }
  }
`;

const index = memo(() => {
  const router = useRouter();
  const { category } = router.query;
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.NewsSlice);

  useEffect(() => {
    dispatch(getList({ category }));
  }, [dispatch, category]);

  console.log(router);

  return (
    <>
      <NewsVisual />
      <div className="inner">
        <TableContainer border="1">
          <thead>
            <tr>
              <th>번호</th>
              <th className="group_th">분류</th>
              <th className="title_th">제목</th>
              <th>등록일</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((v, i) => {
                return (
                  <tr key={v.id}>
                    <td className="num">{data.length - i}</td>
                    <td className="group">{v.group}</td>
                    <td className="title">
                      <a href={`/news/${category}/${v.id}`}>{v.title}</a>
                    </td>
                    <td className="regi_date">{v.regi_date}</td>
                    <td className="view">{v.view_cnt}</td>
                  </tr>
                );
              })}
          </tbody>
        </TableContainer>
      </div>
      <Pagination>
        <li>
          <Link href="javascript:void(0)">1</Link>
        </li>
        <li>
          <Link href="javascript:void(0)">2</Link>
        </li>
        <li>
          <Link href="javascript:void(0)">3</Link>
        </li>
        <li>
          <Link href="javascript:void(0)">4</Link>
        </li>
        <li>
          <Link href="javascript:void(0)">5</Link>
        </li>
        <li>
          <Link href="javascript:void(0)">&#9654;</Link>
        </li>
      </Pagination>
    </>
  );
});

index.displayName = "index";

export default index;