import React, { memo, useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled, { css } from 'styled-components';

import NewsVisual from '@/components/NewsVisual';

import {useSelector, useDispatch} from 'react-redux';
import {getItem} from '@/slices/NewsSlice';
import { createKey } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';

const PostContent = styled.article`
  margin-top: 65px;

  .post_title {
    display: flex;
    justify-content: space-between;
    padding: 30px 40px;
    border-top: 1px solid #0e347e;
    border-bottom: 1px solid #0e347e;
    
    h2 {
      font-size: 22px;
      font-weight: 500;
      color: #071F60;

      .group {
        color: #919191
      }
    }
    
    ul {
      li {
        display: inline-block;
        font-size: 14px;
        color: #999;

        &:first-of-type::after {
          content: '';
          display: inline-block;
          margin: 0 10px;
          width: 1px;
          height: 13px;
          background-color: #d9d9d9;
        }
      }
    }
  }
  
  .post_content {
    padding: 46px 41px;

    img {
      display: block;
      width: 100%;
      object-fit: contain;
    }
  }
`;

const ListView = styled.div`
  max-width: 250px;
  height: 52px;
  margin: 80px auto 0;
  background-color: #0e347e;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 17px;
    color: #fff;
  }
`

const menuCategory = memo(() => {
  const router = useRouter();
  const { post_news } = router.query;
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.NewsSlice);
  useEffect(() => {
    dispatch(getItem({ post_news }));
    
  }, [dispatch,post_news]);
  
  console.log(data)


  return (
    <>
      <NewsVisual />
      <div className='inner'>
        <PostContent>
          <div className='post_title'>
          {data && data.map(v => <h2 key={v.id}><span className='group'>[{v.group}]</span>{v.title}</h2>)}
            <ul>
              {data && data.map(v => <li key={v.id}>{v.regi_date}</li>)}
              {data && data.map(v => <li key={v.id}>조회수 {v.view_cnt}</li>)}
            </ul>
          </div>
          <div className='post_content'>
          {data && data.map(v => <img key={v.id} src={v.content_img} alt=''/>)}
          </div>
        </PostContent>

        <ListView>
          <Link href='/news/cate_all'>목록</Link>
        </ListView>
      </div>
    </>
  );
});

menuCategory.displayName = "menuCategory";

export default menuCategory;
