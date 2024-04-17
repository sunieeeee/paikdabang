import React, {memo} from "react";

import Meta from "@/components/Meta";

const world = memo(({mode, num1, num2}) => {
    return (
        <div>
            <Meta title="world" description="world 페이지입니다." />
            <h1>world</h1>
            <p>여기는 world.js입니다.</p>

            <h2>mode: {mode}</h2>

            <ul>
                <li>num1={num1}</li>
                <li>num2={num2}</li>
            </ul>
        </div>
    );
});

world.getInitialProps = async (context) => {
    return {
        mode: context.req ? "backend" : "front",
        ...context.query,
    };
};

export default world;