import React, {memo} from 'react';

import Link from 'next/link';

const index = memo(() => {
  return (
    <ul>
      <li>
        <Link href='/portfolio/publishing'>퍼블리싱</Link>
      </li>
      <li>
        <Link href='/portfolio/frontend'>프론트엔드</Link>
      </li>
      <li>
        <Link href='/portfolio/backend'>백엔드</Link>
      </li>
    </ul>
  );
});

export default index;