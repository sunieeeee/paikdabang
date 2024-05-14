import React, { memo, useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import Link from 'next/link';

import NewsVisual from '@/components/NewsVisual';

import {useSelector, useDispatch} from 'react-redux';
import {getList} from '@/slices/NewsSlice';
import { createKey } from 'next/dist/shared/lib/router/router';


const TableContainer = styled.table`
  border-top: 2px solid #0e347e;
  margin-top: 65px;
  width: 100%;
  border-collapse: collapse;

  th {
    padding: 20px 0;
  }
  
  th, td {
    border-bottom: 1px solid #c8c8c8;
    text-align: center;
  }

  tbody {
    tr {
      td {
        padding: 30px 0;
        color: #666;

        &.title {
          padding: 0;
          text-align: left;
          
          a {
            display: block;
            padding: 30px;
            width: 100%;
            height: 100%;
            color: #666;
          }
        }
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

const menuCategory = memo(() => {
  const router = useRouter();
  const { category } = router.query;
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.NewsSlice);
  
  useEffect(() => {
    dispatch(getList({ category }));
    
  }, [dispatch,category]);

  console.log(router);

  return (
    <>
      <NewsVisual />
      <div className='inner'>
        <TableContainer border='1'>
          <colgroup>
            <col width='90px' />
            <col width='117px' />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>번호</th>
              <th>분류</th>
              <th>제목</th>
              <th>등록일</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((v, i) => {
              return (
                <tr key={v.id}>
                  <td>{v.id}</td>
                  <td>{v.group}</td>
                  <td className='title'><a href={`/news/${category}/${v.id}`}>{v.title}</a></td>
                  <td>{v.regi_date}</td>
                  <td>{v.view_cnt}</td>
                </tr>
              )
            })}
          </tbody>
        </TableContainer>
      </div>
      <Pagination>
        <li><Link href="javascript:void(0)">1</Link></li>
        <li><Link href="javascript:void(0)">2</Link></li>
        <li><Link href="javascript:void(0)">3</Link></li>
        <li><Link href="javascript:void(0)">4</Link></li>
        <li><Link href="javascript:void(0)">5</Link></li>
        <li><Link href="javascript:void(0)">&#9654;</Link></li>
      </Pagination>
    </>
  );
});

menuCategory.displayName = "menuCategory";

export default menuCategory;