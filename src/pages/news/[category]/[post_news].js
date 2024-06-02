import React, { memo, useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled, { css } from 'styled-components';

import mq from "@/assets/style/MediaQuery.js";
import NewsVisual from '@/components/NewsVisual';

import {useSelector, useDispatch} from 'react-redux';
import {getItem} from '@/slices/NewsSlice';
import Link from 'next/link';

const PostContent = styled.article`
  margin-top: 65px;

  .post_title {
    display: flex;
    justify-content: space-between;
    padding: 30px 40px;
    border-top: 1px solid #0e347e;
    border-bottom: 1px solid #0e347e;

    ${mq.maxWidth("lg")`
      flex-direction: column;
      gap: 15px;
      margin: 0 auto;
      padding: 15px 0;
      width: 92%;
    `}

    h2 {
      font-size: 22px;
      font-weight: 500;
      color: #071f60;

      .group {
        color: #919191;
      }
    }

    ul {
      li {
        display: inline-block;
        font-size: 14px;
        color: #999;

        &:first-of-type::after {
          content: "";
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

    ${mq.maxWidth("lg")`
      margin: 0 auto;
      padding: 25px 10px;
      width: 92%;
    `}

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

  ${mq.maxWidth("lg")`
    margin: 40px auto 0;
    width: 92%;
  `}

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 17px;
    color: #fff;
  }
`;

const post_news = memo(() => {
  const router = useRouter();
  const { post_news } = router.query;
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.NewsSlice);
  useEffect(() => {
    dispatch(getItem({ post_news }));
    
  }, [dispatch,post_news]);


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

post_news.displayName = "post_news";

export default post_news;