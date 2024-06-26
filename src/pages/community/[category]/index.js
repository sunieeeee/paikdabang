import React, { memo, useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import Link from 'next/link';

import mq from "@/assets/style/MediaQuery.js";
import CommunityVisual from '@/components/CommunityVisual';

import {useSelector, useDispatch} from 'react-redux';
import {getList} from '@/slices/CommunitySlice';
import { createKey } from 'next/dist/shared/lib/router/router';


const ClassBox = styled.ul`
  margin-top: 65px;

  ${mq.maxWidth("lg")`
    margin: 65px auto 0;
    width: 92%;
  `}

  li {
    a {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      border: 1px solid #e5e5e5;
      transition: 0.5s;

      ${mq.maxWidth("lg")`
        flex-direction: column;
      `}

      .box:first-of-type {
        img {
          display: block;
        }

        ${mq.maxWidth("lg")`
          width: 100%;

          img {
            max-width: 100%;
            width: auto;
            object-fit: contain;
          }
        `}
      }

      .box:last-of-type {
        padding: 0 40px;

        ${mq.maxWidth("lg")`
          padding: 15px;
          width: 100%;
        `}

        .state {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 70px;
          height: 32px;
          border-radius: 80px;
          background-color: #333;
          color: #666;
        }

        h3 {
          margin: 14px 0;
          font-size: 28px;
          color: #444;
        }

        p {
          font-size: 18px;
          color: #666;
        }
      }

      &:hover {
        border: 1px solid #0e347e;

        .box {
          h3,
          p {
            color: #0e347e;
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
  const { data, loading, error } = useSelector(state => state.CommunitySlice);

  useEffect(() => {
    dispatch(getList({ category }));
    
  }, [dispatch,category]);

  console.log(data)


  return (
    <>
      <CommunityVisual />
      <div className='inner'>
        <ClassBox>
          {data && data.map((v, i) => {
            return (
              <li key={v.id}>
                <Link href={`/community/${category}/${v.id}`}>
                  <div className='box'><img src={v.title_img} /></div>
                  <div className='box'>
                    <span className='state'>{v.state}</span>
                    <h3>{v.title}</h3>
                    <p>{v.date}</p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ClassBox>
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

index.displayName = "index";

export default index;
