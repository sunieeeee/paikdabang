import React, {memo} from 'react';

import Link from 'next/link';

const index = memo(() => {
  return (
    <ul>
      <li>
        <Link href='/menu/menu_new'>신메뉴</Link>
      </li>
      <li>
        <Link href='/menu/menu_coffee'>커피</Link>
      </li>
      <li>
        <Link href='/menu/menu_drink'>음료</Link>
      </li>
    </ul>
  );
});

index.displayName= "index";

export default index;