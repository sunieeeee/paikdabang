import React, {memo} from "react";

const greeting = memo(() => {
    return (
        <div>
            <h1>greeting</h1>
            <p>여기는 greeting.js입니다.</p>
        </div>
    );
});

greeting.displayName= "greeting";

greeting.getInitialProps = async (context) => {
    return {
        mode: context.req ? "backend" : "front",
        ...context.query,
    };
};

export default greeting;