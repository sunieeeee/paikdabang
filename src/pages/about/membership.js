import React, {memo} from "react";

const membership = memo(() => {
    return (
        <div>
            <h1>membership</h1>
            <p>여기는 membership.js입니다.</p>
        </div>
    );
});

membership.displayName= "membership";

membership.getInitialProps = async (context) => {
    return {
        mode: context.req ? "backend" : "front",
        ...context.query,
    };
};

export default membership;