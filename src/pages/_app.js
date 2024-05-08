/**
 * <body> 태그 영역 안에서 모든 페이지에 공통으로 적용될 레이아웃을 구성하는 파일
 * props로 Component와 pageProps를 받아서 렌더링한다.
 */
import React, {memo} from "react";

import Meta from "@/components/Meta";
import GlobalStyle from "@/assets/style/GlobalStyle";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBtn from "@/components/TopBtn";

/** 리덕스 구성을 위한 참조 */
import {Provider} from 'react-redux';
import store from '@/store';

const App = memo(({ Component, pageProps }) => {
    return (
        <Provider store={store}>
            <Meta />
            <GlobalStyle />
            <Header />

            {/* 내가 작성한 리액트 컴포넌트를 출력한다.(index.js, hello.js 등...) */}
            <Component {...pageProps} />

            <Footer />
            <TopBtn />
        </Provider>
    );
});

App.displayName ="App";

export default App;