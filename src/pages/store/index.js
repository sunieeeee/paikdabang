import React, {memo} from 'react';
import styled, { css } from 'styled-components';
import StoreVisual from '@/components/StoreVisual';

const SearchWrap = styled.div`

`;

const index = memo(() => {
  return (
    <>
      <StoreVisual />
      <SearchWrap>
        <div>
          <span></span>
          <ul>
            <li>
              <select></select>
            </li>
          </ul>
        </div>
      </SearchWrap>
    </>
  );
});

index.displayName = "index";

export default index;