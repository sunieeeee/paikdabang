import React, {memo} from "react";

const introduce = memo(() => {
    return (
        <div>
            <h1>introduce</h1>
            <p>여기는 introduce.js입니다.</p>
        </div>
    );
});

introduce.displayName= "introduce";

introduce.getInitialProps = async (context) => {
    return {
        mode: context.req ? "backend" : "front",
        ...context.query,
    };
};

export default introduce;