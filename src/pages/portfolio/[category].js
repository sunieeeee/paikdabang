/**
 * [Path 파라미터 받기]
 * 
 * URL이 '/portfolio/변수명' 인 경우
 * 1) /portfolio 이라는 이름의 폴더를 생성
 * 2) /portfolio/[변수명].js 로 소스파일을 작성 (파일이름에 대괄호 포함)
 * 
 * 주의!!! --> 
 * /portfolio 이라는 이름의 폴더와
 * /portfolio.js 라는 파일이 함께 존재하면
 * route는 동작하지 않음. (파일이 우선순위)
 */

import React, {memo} from 'react';

//파라미터를 받기 위한 패키지 참조
import {useRouter} from 'next/router';

//데이터 참조
import dataset from '@/dataset';

const portfolioCategory = memo(() => {
  //hook을통해 라우터 사용 시작
  const router = useRouter();

  //사용할 정보 추출
  const {pathname, asPath, query} = router;

  return (
    <div>
      <h1>[category]</h1>
      <ul>
        <li>파일경로: {pathname}</li>
        <li>URL경로: {asPath}</li>
        <li>파라미터: {JSON.stringify(query)}</li>
        <li>URL상의 파라미터 추출: {query.category}</li>
      </ul>

      <hr />

      <ul>
        {dataset[query.category] && dataset[query.category].map((v, i) => {
          return (
            <li key={i}>
              id: {v.id}, name: {v.name}
            </li>
          )
        })}
      </ul>
    </div>
  );
});

portfolioCategory.displayName= "portfolioCategory";

export default portfolioCategory;