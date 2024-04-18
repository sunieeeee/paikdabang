import React, {memo, useState, useEffect} from "react";

import MenuLink from "@/components/MenuLink";

const index = memo(({mode}) => {

    const [currentUrl, setCurrentUrl] = useState('');

    // 이 컴포넌트가 브라우저에 의해 최초로 렌더링 될 때 실행되는 hook 정의
    useEffect(() => {
        // 웹브라우저에 의해 실행될 경우에만 window 객체에 접근 가능하다.
        // (백엔드 모드일 경우에는 window객체가 없음)
        if (window) {
            setCurrentUrl(window.location.href);
        }
    }, []);

    return (
        <div>
            <h1><i className="fa-solid fa-house"></i> index</h1>
            <p>여기는 index.js입니다.</p>
            <p>mode: {mode}</p>
            <p>currentUrl: {currentUrl}</p>
        </div>
    );
});

// pages폴더 내의 모든 컴포넌트 함수는 getInitialProps 라는 하위 함수를 갖는다.
// 이 함수를 통해 각 페이지가 웹 프로그램으로 동작할 수 있는 기능을 넘겨받는다.
index.getInitialProps = async (context) => {
    console.group("index.getInitialProps");
    console.log(context);
    console.groupEnd();

    let mode = "front";

    // 백엔드에서 동작할 경우 context안에 req객체가 포함된다.
    // 이 객체는 일반 Node.js의 HTTPServer객체와 같은 역할을 수행한다.
    // HTTPServer -> 백엔드 구현의 핵심 객체
    if (context.req) {
        mode = "backend";
    }

    // getInitialProps 함수는 반드시 JSON 객체를 반환해야 한다.
    // --> 이 리턴값이 컴포넌트의 props로 전달된다.
    return {
        mode: mode
    };
};

index.displayName ="index";

export default index;