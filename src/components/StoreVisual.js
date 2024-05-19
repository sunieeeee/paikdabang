import React, {memo, useEffect} from 'react';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import SubVisual from '@/components/SubVisual';

import {useSelector, useDispatch} from 'react-redux';
import {getList} from '@/slices/StoreVisualSlice';


const StoreHeader = memo(() => {
  const router = useRouter();
  const { category } = router.query;
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.StoreVisualSlice);

  useEffect(() => {
    dispatch(getList({ category }));
    
  }, [dispatch,category]);
  
  return (
    <>
      {data && data.map((v, i) => {
        return (
          <SubVisual key={v.id} $bgImage={v.bgImage}>
            <div className='subvisual_info'>
              <h1>{v.title}</h1>
              <p>{v.txt}</p>
            </div>
          </SubVisual>
        )    
      })}
    </>
  );
});

StoreHeader.displayName = "StoreHeader";

export default StoreHeader;