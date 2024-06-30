import React, { memo, useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import mq from "@/assets/style/MediaQuery.js";
import StoreVisual from '@/components/StoreVisual';
import searchIcon from '@/assets/img/store/search-ico.png';
import plusIcon from '@/assets/img/store/more-off.png';
import minusIcon from '@/assets/img/store/more-on.png';

import { useSelector, useDispatch } from 'react-redux';
import { getList } from '@/slices/StoreSearchSlice';

const SearchWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 65px 0 20px;
  padding: 20px;
  border: 1px solid #eee;

  ${mq.maxWidth("xl")`
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin: 65px auto 20px;
    width: 92%;
  `}

  > div {
    display: flex;
    align-items: center;
    gap: 30px;

    ${mq.maxWidth("xl")`
      gap: 0;
      width: 100% !important;
    `}

    ${mq.maxWidth("md")`
      flex-direction: column;
    `}

    &.left_box {
      justify-content: flex-start;
      width: 40%;
    }

    &.right_box {
      justify-content: space-between;
      width: 60%;

      ${mq.maxWidth("xl")`
        justify-content: flex-start;
      `}
    }

    .search_label {
      ${mq.maxWidth("xl")`
        width: 15%;
      `}

      ${mq.maxWidth("md")`
        margin-bottom: 8px;  
        width: 100%;
      `}
    }

    .search_box {
      display: flex;
      gap: 10px;

      ${mq.maxWidth("xl")`
        width: 85%;
      `}

      ${mq.maxWidth("md")`
        width: 100% !important;
      `}

      li {
        padding: 0 10px;
        width: 140px;
        height: 40px;
        border: 1px solid #eee;

        ${mq.maxWidth("md")`
          width: 100% !important;
        `}

        select {
          border: 0;
          width: 100%;
          height: 100%;
          font-size: 14px;
          appearance: none;
          outline: none;
        }
      }
    }

    .search_input {
      width: 84%;
      height: 40px;
      border: 1px solid #eee;

      input {
        padding-left: 10px;
        width: 100%;
        border: 0;
        font-size: 14px;
        outline: none;
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

  ${mq.maxWidth("xl")`
    margin: 0 auto;
    width: 92%;
  `}

  thead {
    border-top: solid 2px #0e347e;
    border-bottom: 1px solid #0e347e;

    tr {
      th {
        padding: 20px 0;
        color: #0e347e;
        font-weight: 400;
        text-align: center;

        ${mq.maxWidth("md")`
          &:not(.region_th, .store_name_th, .icon_th) {
            display: none;
          }
        `}
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

      &.store_list {
        ${mq.maxWidth("md")`
          td:not(.region, .store_name, .more_icon) {
            display: none;
          }
        `}
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

      ${mq.maxWidth("md")`
        flex-direction: column;
      `}

      .store_img {
        width: 40%;
        background-color: #fff;

        ${mq.maxWidth("md")`
          width: 100%;
        `}

        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;

          ${mq.maxWidth("md")`
            max-width: 100%;
            width: auto;
          `}
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

        ${mq.maxWidth("md")`
          padding: 20px 0 0;
          width: 100%;
          grid-template-columns: 20% 80%;
        `}

        ${mq.maxWidth("xsm")`
          padding: 20px 0 0;
          width: 100%;
          grid-template-columns: 30% 70%;
        `}

        dt,
        dd {
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
    const isDetailOn = e.currentTarget.classList.contains('detailOn');
    const isOn = e.currentTarget.nextElementSibling.classList.contains('on');

    storeList.current.forEach((v, i) => {
      v && v.classList.remove('detailOn');
    });

    storeDetails.current.forEach((v, i) => {
      v && v.classList.remove('on');
    });

    if (!isDetailOn && !isOn) {
      e.currentTarget.classList.add('detailOn');
      e.currentTarget.nextElementSibling.classList.add('on');
    }
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
      <div className="inner">
        <SearchWrap>
          <div className="left_box">
            <span className="search_label">지역검색</span>
            <ul className="search_box">
              <li>
                <select onChange={onRegionSearch}>
                  <option value="전체">전체</option>
                  <option value="서울특별시">서울특별시</option>
                  <option value="경기도">경기도</option>
                  <option value="인천광역시">인천광역시</option>
                </select>
              </li>
              <li>
                <select onChange={onCitySearch}>
                  <option value="전체">전체</option>
                  <option value="강남구">강남구</option>
                  <option value="강동구">강동구</option>
                  <option value="강서구">강서구</option>
                  <option value="관악구">관악구</option>
                  <option value="고양시">고양시</option>
                  <option value="부천시">부천시</option>
                  <option value="계양구">계양구</option>
                  <option value="남구">남구</option>
                </select>
              </li>
            </ul>
          </div>
          <div className="right_box">
            <label className="search_label">매장명 검색</label>
            <div className="search_box search_input">
              <input type="text" onChange={onInputSearch} />
              <button type="button">
                <Image src={searchIcon} alt="Search" />
              </button>
            </div>
          </div>
        </SearchWrap>

        <TotalWrap>
          총 <span>{data ? data.length : 0}</span>개의 매장이 있습니다.
        </TotalWrap>

        <StoreList>
          <thead>
            <tr>
              <th className="region_th">지역</th>
              <th className="store_name_th">매장명</th>
              <th>주소</th>
              <th>전화번호</th>
              <th className='icon_th'></th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((v, i) => (
                <>
                  <tr
                    className="store_list"
                    key={v.id}
                    onClick={StoreOn}
                    ref={(el) => (storeList.current[i] = el)}
                  >
                    <td className="region">{v.region}</td>
                    <td className="store_name">{v.store_name}</td>
                    <td>{v.address}</td>
                    <td>{v.tel}</td>
                    <td className='more_icon'>
                      <Image className="plusIcon" src={plusIcon} alt="" />
                      <Image className="minusIcon" src={minusIcon} alt="" />
                    </td>
                  </tr>
                  <StoreDetailsTr ref={(el) => (storeDetails.current[i] = el)}>
                    <td colSpan={5}>
                      <div className="store_inner">
                        <div className="store_img">
                          <img src={v.store_img && v.store_img} alt="" />
                        </div>
                        <dl className="store_info">
                          <dt>위치</dt>
                          <dd>{v.address}</dd>
                          <dt>영업시간</dt>
                          <dd>
                            {v.weekday_hours}
                            <br />
                            {v.weekend_hours}
                          </dd>
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