import React, { memo, useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from 'styled-components';

import StoreVisual from '@/components/StoreVisual';
import searchIcon from '@/assets/img/store/search-ico.png';
import plusIcon from '@/assets/img/store/more-off.png';
import minusIcon from '@/assets/img/store/more-on.png';

import { useSelector, useDispatch } from 'react-redux';
import { getList } from '@/slices/StoreSearchSlice';

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
      width: 40%;
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

        .plusIcon {
          display: block;
        }

        .minusIcon {
          display: none;
        }
      }

      &.detailOn {
        background-color: #0e347e;

        td {
          color: #fff;

          .plusIcon {
            display: none;
          }

          .minusIcon {
            display: block;
          }
        }
      }
    }
  }
`;

const StoreDetailsTr = styled.tr`
  display: none;

  &.on {
    display: table-row;
  }

  td {
    .store_inner {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0 28px;

      .store_img {
        width: 40%;
        background-color: #fff;

        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .store_info {
        margin: auto 0;
        padding: 0 30px;
        width: 60%;
        height: fit-content;
        display: grid;
        grid-template-columns: 15% 85%;
        row-gap: 20px;

        dt, dd {
          text-align: left;
          font-weight: 400;
        }

        dt {
          color: #0e347e;
        }

        dd {
          color: #707070;
        }
      }
    }
  }
`;

const index = memo(() => {
  const storeList = useRef([]);
  const storeDetails = useRef([]);

  const StoreOn = useCallback((e) => {
    storeList.current.forEach((v, i) => {
      v && v.classList.remove('detailOn');
    });

    storeDetails.current.forEach((v, i) => {
      v && v.classList.remove('on');
    });

    e.currentTarget.classList.add('detailOn');
    e.currentTarget.nextElementSibling.classList.add('on');
  }, []);

  const [regionSearch, setRegionSearch] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [inputSearch, setInputSearch] = useState('');

  const onRegionSearch = useCallback((e) => {
    setRegionSearch(e.currentTarget.value);
  }, []);

  const onCitySearch = useCallback((e) => {
    setCitySearch(e.currentTarget.value);
  }, []);

  const onInputSearch = useCallback((e) => {
    setInputSearch(e.currentTarget.value);
  }, []);

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.StoreSearchSlice);

  useEffect(() => {
    dispatch(getList({
      regionSearch: regionSearch,
      citySearch: citySearch,
      inputSearch: inputSearch,
    }));
  }, [regionSearch, citySearch, inputSearch, dispatch]);

  return (
    <>
      <StoreVisual />
      <div className='inner'>
        <SearchWrap>
          <div className='left_box'>
            <span>지역검색</span>
            <ul className='search_box'>
              <li>
                <select onChange={onRegionSearch}>
                  <option value='전체'>전체</option>
                  <option value='서울특별시'>서울특별시</option>
                  <option value='경기도'>경기도</option>
                  <option value='인천광역시'>인천광역시</option>
                </select>
              </li>
              <li>
                <select onChange={onCitySearch}>
                  <option value='전체'>전체</option>
                  <option value='강남구'>강남구</option>
                  <option value='강동구'>강동구</option>
                  <option value='강서구'>강서구</option>
                  <option value='관악구'>관악구</option>
                  <option value='고양시'>고양시</option>
                  <option value='부천시'>부천시</option>
                </select>
              </li>
            </ul>
          </div>
          <div className='right_box'>
            <label>매장명 검색</label>
            <div className='search_box search_input'>
              <input type="text" onChange={onInputSearch} />
              <button type='button'>
                <Image src={searchIcon} alt='Search' />
              </button>
            </div>
          </div>
        </SearchWrap>

        <TotalWrap>총 <span>{data ? data.length : 0}</span>개의 매장이 있습니다.</TotalWrap>

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
            {data && data.map((v, i) => (
              <>
                <tr className='store_list' key={v.id} onClick={StoreOn} ref={el => storeList.current[i] = el}>
                  <td>{v.region}</td>
                  <td>{v.store_name}</td>
                  <td>{v.address}</td>
                  <td>{v.tel}</td>
                  <td>
                    <Image className='plusIcon' src={plusIcon} alt='' />
                    <Image className='minusIcon' src={minusIcon} alt='' />
                  </td>
                </tr>
                <StoreDetailsTr ref={el => storeDetails.current[i] = el}>
                  <td colSpan={5}>
                    <div className='store_inner'>
                      <div className='store_img'>
                        <img src={v.store_img && v.store_img} alt='' />
                      </div>
                      <dl className='store_info'>
                        <dt>위치</dt>
                        <dd>{v.address}</dd>
                        <dt>영업시간</dt>
                        <dd>{v.weekday_hours}<br />{v.weekend_hours}</dd>
                        <dt>주차</dt>
                        <dd>{v.parking}</dd>
                        <dt>전화번호</dt>
                        <dd>{v.tel}</dd>
                        <dt>좌석</dt>
                        <dd>{v.seat}</dd>
                      </dl>
                    </div>
                  </td>
                </StoreDetailsTr>
              </>
            ))}
          </tbody>
        </StoreList>
      </div>
    </>
  );
});

index.displayName = "index";

export default index;
