import React, {memo, useState, useEffect} from "react";

import Meta from "@/components/Meta";

const hello = memo(({mode, num1, num2}) => {

    return (
        <div>
            <Meta title="hello" description="hello 페이지입니다." />
            <h1>hello</h1>
            <p>여기는 hello.js입니다.</p>

            <h2>mode: {mode}</h2>

            <ul>
                <li>num1={num1}</li>
                <li>num2={num2}</li>
            </ul>
        </div>
    );
});

// URL에 포함되는 QueryString 변수는 이 위치에서 판별한다.
hello.getInitialProps = async (context) => {
    console.group("hello.getInitialProps");
    console.log(context.query);
    console.groupEnd();

    return {
        mode: context.req ? "backend" : "front",

        //URL에 포함된 QueryString 변수를 전달한다.
        ...context.query,
    };
};

hello.displayName ="hello";

export default hello;