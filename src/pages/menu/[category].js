import React, {memo, useState, useEffect} from 'react';
import axios from 'axios';
//파라미터를 받기 위한 패키지 참조
import {useRouter} from 'next/router';

//redux
// import {useSelector, useDispatch} from 'react-redux';
// import {getList} from '@/slices/MenuSlice';

import data from '@/api/subvisual_menu.json';

const menuCategory = memo(() => {
  const router = useRouter();
  const {category} = router.query;
  console.log(category)

  // //dispatch 함수 생성
  // const dispatch = useDispatch();
  // //hook을 통해 slice가 관리하는 상태값 가져오기
  // const {data, loading, error} = useSelector((state) => state.MenuSlice);
  // console.log(data)
  // //컴포넌트가 마운트되면 데이터 조회를 위한 액션함수를 디스패치 함
  // useEffect(() => {
  //   if(category) {
  //     dispatch(getList({category: category}));
  //   }
  // }, [category]);


  
  return (
    <div>
   
      <div>
        {data[category]  && data[category].map((v, i) => {
          <p key={i}>{v.txt}</p>
        })}
      </div>
    </div>
  );
});

menuCategory.displayName= "menuCategory";

export default menuCategory;