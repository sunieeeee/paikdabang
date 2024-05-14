import React, { memo, useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import Link from 'next/link';

import CommunityVisual from '@/components/CommunityVisual';

import {useSelector, useDispatch} from 'react-redux';
import {getList} from '@/slices/CommunityVisualSlice';
import { createKey } from 'next/dist/shared/lib/router/router';


const ClassBox = styled.ul`
  
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
  const { data, loading, error } = useSelector(state => state.CommunityVisualSlice);
  console.log(data);
  useEffect(() => {
    dispatch(getList({ category }));
    
  }, [dispatch,category]);

  console.log(router);

  return (
    <>
      <CommunityVisual />
      <div className='inner'>
        <ClassBox>
          
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

menuCategory.displayName = "menuCategory";

export default menuCategory;
