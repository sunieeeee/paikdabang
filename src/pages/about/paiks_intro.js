import React, {memo} from "react";

const paiks_intro = memo(() => {
    return (
        <div>
            <h1>paiks_intro</h1>
            <p>여기는 paiks_intro.js입니다.</p>
        </div>
    );
});

paiks_intro.displayName= "paiks_intro";

paiks_intro.getInitialProps = async (context) => {
    return {
        mode: context.req ? "backend" : "front",
        ...context.query,
    };
};

export default paiks_intro;