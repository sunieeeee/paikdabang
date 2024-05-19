import React, { memo, useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled, { css } from 'styled-components'

import StoreVisual from '@/components/StoreVisual';
import searchIcon from '@/assets/img/store/search-ico.png'
import plusIcon from '@/assets/img/store/more-off.png';

import {useSelector, useDispatch} from 'react-redux';
import {getList} from '@/slices/StoreSearchSlice'


const SearchWrap = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 65px 0 20px;
  padding: 20px;
  border: 1px solid #eee;

  > div {
    display: flex;
    align-items: center;
    gap: 30px;
    
    &.left_box {
      justify-content: flex-start;
      width: 40%
    }
    
    &.right_box {
      justify-content: space-between;
      width: 60%;
    }

    .search_box {
      display: flex;
      gap: 10px;

      li {
        padding: 0 10px;
        width: 140px;
        height: 40px;
        border: 1px solid #eee;
        
        select {
          border: 0;
          width: 100%;
          height: 100%;
        } 
      }
    }
    
    .search_input {
      width: 84%;
      height: 40px;
      border: 1px solid #eee;

      input {
        width: 100%;
        border: 0;
      }
      
      button {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 10px;
        border: 0;
        background-color: transparent;

        img {
          display: block;
          width: 50%;
          object-fit: contain;

        }
      }
    }
  }
`;

const TotalWrap = styled.p`
  padding: 65px 0;
  font-size: 20px;
  text-align: center;
  color: #909090;

  span {
    color: #071F60;
  }
`;

const StoreList = styled.table`
  width: 100%;

  thead {
    border-top: solid 2px #0e347e;
    border-bottom: 1px solid #0e347e;

    tr {
      th {
        padding: 20px 0;
        color: #0e347e;
        font-weight: 400;
        text-align: center;
      }
    }
  }

  tbody {
    tr {
      border-bottom: solid 1px #c8c8c8;

      td {
        padding: 28px 0;
        text-align: center;
         cursor: pointer;
      }
    }
  }
`;

const StoreDetails = styled.div`

`;

const index = memo(() => {
    //dispatch 함수 생성
    const dispatch = useDispatch();
    //hook을 통해 slice가 관리하는 상태값 가져오기
    const {data, loading, error} = useSelector((state) => state.StoreSearchSlice);

    //컴포넌트가 마운트되면 데이터 조회를 위한 액션함수를 디스패치 함
    useEffect(() => {
        dispatch(getList());
    }, []);

    console.log(data);

  return (
    <>
      <StoreVisual />
      <div className='inner'>
        <SearchWrap>
          <div className='left_box'>
            <span>지역검색</span>
            <ul className='search_box'>
              <li>
                <select></select>
              </li>
              <li>
                <select></select>
              </li>
            </ul>
          </div>
          <div className='right_box'>
            <label>매장명 검색</label>
            <div className='search_box search_input'>
              <input type="text" />
              <button type='submit'>
                <Image src={searchIcon}/>
              </button>
            </div>
          </div>
        </SearchWrap>

        <TotalWrap>총 <span>{data && data.length}</span>개의 매장이 있습니다.</TotalWrap>

        <StoreList>
          <thead>
            <tr>
              <th>지역</th>
              <th>매장명</th>
              <th>주소</th>
              <th>전화번호</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
              {data && data.map((v, i) => {
                return(
                  <>
                    <tr key={v.id}>
                      <td>{v.region}</td>
                      <td>{v.store_name}</td>
                      <td>{v.address}</td>
                      <td>{v.tel}</td>
                      <td><Image src={plusIcon} alt='' /></td>
                    </tr>
                    <tr>
                      <td colSpan={5}>
                        <StoreDetails >
                          <div>
                            <img src={v.store_img && v.store_img} alt='' />
                          </div>
                          <dl>
                            <dt>위치</dt>
                            <dd>{v.address}</dd>
                            <dt>영업시간</dt>
                            <dd>{v.weekday_hours}<br/>{v.weekend_hours}</dd>
                            <dt>주차</dt>
                            <dd>{v.parking}</dd>
                            <dt>전화번호</dt>
                            <dd>{v.tel}</dd>
                            <dt>좌석</dt>
                            <dd>{v.seat}</dd>
                          </dl>
                        </StoreDetails>
                      </td>
                    </tr>
                  </>
                )
              })}  
          </tbody>
        </StoreList>
      </div>
    </>
  );
});

index.displayName = "index";

export default index;