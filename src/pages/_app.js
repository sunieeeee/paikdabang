import React, {memo} from "react";

import GlobalStyle from "@/assets/style/GlobalStyle";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/** 리덕스 구성을 위한 참조 */
import {Provider} from 'react-redux';
import store from '@/store';

const App = memo(({ Component, pageProps }) => {
    return (
        <Provider store={store}>
            <GlobalStyle />
            <Header />

            <Component {...pageProps} />

            <Footer />
        </Provider>
    );
});

App.displayName ="App";

export default App;